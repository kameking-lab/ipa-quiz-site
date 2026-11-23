# Run after generation and again after use-profiles; this script never mutates.
require 'xcodeproj'
require 'json'
require_relative 'ios-ads-config'

bundle_id = 'jp.kakomon-ai.app'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |item| item.name == 'App' }
raise 'App target missing' unless target
raise 'App build configurations missing' if target.build_configurations.empty?
version = JSON.parse(File.read(File.expand_path('../package.json', __dir__))).fetch('version')
target.build_configurations.each do |configuration|
  settings = configuration.build_settings
  raise "Bundle ID mismatch in #{configuration.name}" unless settings['PRODUCT_BUNDLE_IDENTIFIER'] == bundle_id
  raise "Marketing version mismatch in #{configuration.name}" unless settings['MARKETING_VERSION'] == version
  if ENV.key?('BUILD_NUMBER')
    raise "Build number mismatch in #{configuration.name}" unless settings['CURRENT_PROJECT_VERSION'].to_s == ENV['BUILD_NUMBER']
  end
end
plist = Xcodeproj::Plist.read_from_path('ios/App/App/Info.plist')
raise 'Info.plist Bundle ID mismatch' unless plist['CFBundleIdentifier'] == '$(PRODUCT_BUNDLE_IDENTIFIER)'
raise 'Info.plist marketing version must use Xcode setting' unless plist['CFBundleShortVersionString'] == '$(MARKETING_VERSION)'
raise 'Info.plist build number must use Xcode setting' unless plist['CFBundleVersion'] == '$(CURRENT_PROJECT_VERSION)'
privacy = Xcodeproj::Plist.read_from_path('ios/App/App/PrivacyInfo.xcprivacy')
if plist['KakomonAdsEnabled'] == true
  raise 'WebView-only Ads SDK exemption present' if plist.key?('GADIntegrationManager')
  raise 'ATT usage description missing' if plist['NSUserTrackingUsageDescription'].to_s.empty?
  raise 'Invalid AdMob IDs' unless IosAdsConfig.valid_ids?(plist['GADApplicationIdentifier'].to_s, plist['KakomonAdMobBannerID'].to_s)
  raise 'Ad measurement must wait for initialization' unless plist['GADDelayAppMeasurementInit'] == true
  networks = plist.fetch('SKAdNetworkItems', []).map { |entry| entry['SKAdNetworkIdentifier'] }
  raise 'Invalid SKAdNetwork list' unless networks.include?('cstr6suwn9.skadnetwork') && networks.uniq == networks &&
    networks.all? { |id| id.to_s.match?(/\A[a-z0-9]{10}\.skadnetwork\z/) }
else
  raise 'ATT usage description present with ads disabled' if plist.key?('NSUserTrackingUsageDescription')
  raise 'GAD settings present with ads disabled' if plist.keys.any? { |key| key.start_with?('GAD') }
  raise 'AdMob settings present with ads disabled' if plist.key?('KakomonAdMobBannerID') || plist.key?('SKAdNetworkItems')
  raise 'Privacy tracking enabled with ads disabled' unless privacy['NSPrivacyTracking'] == false
  raise 'Privacy tracking domains present with ads disabled' unless privacy.fetch('NSPrivacyTrackingDomains', []).empty?
  raise 'Collected data tracking enabled with ads disabled' if privacy.fetch('NSPrivacyCollectedDataTypes', []).any? { |data| data['NSPrivacyCollectedDataTypeTracking'] == true }
end
scene_path = 'ios/App/App/SceneDelegate.swift'
if File.exist?(scene_path)
  scene = File.read(scene_path)
  raise 'SceneDelegate bypasses the plugin bridge' if scene.include?('CAPBridgeViewController()') || !scene.include?('rootViewController = QualificationBridgeViewController()')
end
podfile = File.read('ios/App/Podfile')
if plist['KakomonAdsEnabled'] == true
  raise 'Pinned Ads SDK missing' unless podfile.include?("pod 'Google-Mobile-Ads-SDK', '13.11.0'")
  raise 'Pinned UMP dependency missing' unless podfile.include?("pod 'GoogleUserMessagingPlatform', '3.1.0'")
else
  raise 'Ads SDK dependency present with ads disabled' if podfile.match?(/^[ \t]*pod ['"](?:Google-Mobile-Ads-SDK|GoogleUserMessagingPlatform)['"]/)
end
raise 'Pod deployment target missing' unless podfile.include?("config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'")
urls = [{ 'CFBundleURLName' => "#{bundle_id}.auth", 'CFBundleURLSchemes' => ['kakomonai'] }]
raise 'Auth URL scheme mismatch' unless plist['CFBundleURLTypes'] == urls
config = JSON.parse(File.read('ios/App/App/capacitor.config.json'))
raise 'Native Capacitor runtime Bundle ID mismatch' unless config['appId'] == bundle_id
raise 'Local Notifications pod missing from Podfile' unless podfile.match?(/^\s*pod 'CapacitorLocalNotifications'/)
raise 'Local Notifications plugin missing from packageClassList' unless Array(config['packageClassList']).include?('LocalNotificationsPlugin')
# The purchase UI calls the native RevenueCat plugin from the WebView. Without
# the pod and its class in packageClassList, every call answers UNIMPLEMENTED
# and the membership panel can never show a price.
raise 'RevenueCat pod missing from Podfile' unless podfile.match?(/^\s*pod 'RevenuecatPurchasesCapacitor'/)
raise 'RevenueCat plugin missing from packageClassList' unless Array(config['packageClassList']).include?('PurchasesPlugin')

if ARGV.length > 1
  raise 'Usage: ruby scripts/verify-ios.rb [export_options.plist]'
end
if ARGV.first
  options = Xcodeproj::Plist.read_from_path(ARGV.first)
  raise 'App Store export method required' unless ['app-store', 'app-store-connect'].include?(options['method'])
  profiles = options.fetch('provisioningProfiles', {})
  raise 'App Store provisioning profile missing for registered Bundle ID' if profiles[bundle_id].to_s.empty?
  raise 'Unexpected Bundle ID in export profiles' unless profiles.keys == [bundle_id]
  target.build_configurations.each do |configuration|
    settings = configuration.build_settings
    raise "Signing team missing in #{configuration.name}" if settings['DEVELOPMENT_TEAM'].to_s.empty?
    attributes = project.root_object.attributes.fetch('TargetAttributes', {}).fetch(target.uuid, {})
    automatic = attributes['ProvisioningStyle'] == 'Automatic' && settings['CODE_SIGN_STYLE'] != 'Manual'
    unless automatic || !settings['PROVISIONING_PROFILE_SPECIFIER'].to_s.empty?
      raise "Provisioning profile missing in #{configuration.name}"
    end
  end
end
puts "Verified #{bundle_id} in #{target.build_configurations.map(&:name).join(', ')}, Info.plist and native runtime config."
