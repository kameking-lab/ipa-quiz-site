# CocoaPods supplies xcodeproj on CI; Windows verification also needs this gem.
require 'xcodeproj'
require 'json'
bundle_id = 'jp.kakomon-ai.app'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |item| item.name == 'App' }
raise 'App target missing' unless target
build_number = ENV.fetch('BUILD_NUMBER', '1')
raise 'Invalid build number' unless build_number.match?(/\A[1-9]\d*\z/)
target.build_configurations.each do |configuration|
  configuration.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = bundle_id
  configuration.build_settings['MARKETING_VERSION'] = '1.0.0'
  configuration.build_settings['CURRENT_PROJECT_VERSION'] = build_number
  configuration.build_settings['TARGETED_DEVICE_FAMILY'] = '1'
  configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
  configuration.build_settings['SWIFT_VERSION'] = '5.0'
end
group = project.main_group.find_subpath('App', false)
raise 'App group missing' unless group
reference = group.files.find { |file| file.path == 'PrivacyInfo.xcprivacy' } || group.new_file('PrivacyInfo.xcprivacy')
target.resources_build_phase.add_file_reference(reference, true)
native_source = group.files.find { |file| file.path == 'QualificationBridgeViewController.swift' } || group.new_file('QualificationBridgeViewController.swift')
target.source_build_phase.add_file_reference(native_source, true)
tracking_source = group.files.find { |file| file.path == 'TrackingTransparencyPlugin.swift' } || group.new_file('TrackingTransparencyPlugin.swift')
target.source_build_phase.add_file_reference(tracking_source, true)
storyboard_path = 'ios/App/App/Base.lproj/Main.storyboard'
storyboard = File.read(storyboard_path)
unless storyboard.include?('customClass="QualificationBridgeViewController"')
  raise 'Capacitor storyboard controller missing' unless storyboard.include?('customClass="CAPBridgeViewController"')
  storyboard = storyboard.sub('customClass="CAPBridgeViewController" customModule="Capacitor"', 'customClass="QualificationBridgeViewController" customModule="App" customModuleProvider="target"')
  raise 'Unsupported Capacitor storyboard module' unless storyboard.include?('customClass="QualificationBridgeViewController"')
  File.write(storyboard_path, storyboard)
end
project.root_object.attributes['LastUpgradeCheck'] = '2600'
project.root_object.attributes['TargetAttributes'] ||= {}
project.root_object.attributes['TargetAttributes'][target.uuid] ||= {}
project.root_object.attributes['TargetAttributes'][target.uuid]['SystemCapabilities'] ||= {}
project.root_object.attributes['TargetAttributes'][target.uuid]['SystemCapabilities']['com.apple.InAppPurchase'] = { 'enabled' => 1 }
project.save
plist_path = 'ios/App/App/Info.plist'
plist = Xcodeproj::Plist.read_from_path(plist_path)
plist['CFBundleIdentifier'] = '$(PRODUCT_BUNDLE_IDENTIFIER)'
plist['CFBundleDevelopmentRegion'] = 'ja'
plist['CFBundleLocalizations'] = ['ja']
plist['CFBundleDisplayName'] = '過去問AI'
plist['ITSAppUsesNonExemptEncryption'] = false
# WebView-only integration: official exemption from the native-ad App ID check.
# Do not call MobileAds.start or ship Google's sample App ID as a fallback.
plist['GADIntegrationManager'] = 'webview'
app_id = ENV.fetch('MOBILE_GAD_APPLICATION_ID', '').strip
raise 'Invalid MOBILE_GAD_APPLICATION_ID' unless app_id.empty? || app_id.match?(/\Aca-app-pub-\d{16}~\d{10}\z/)
app_id.empty? ? plist.delete('GADApplicationIdentifier') : plist['GADApplicationIdentifier'] = app_id
client = ENV.fetch('MOBILE_ADSENSE_CLIENT', '').strip
slot = ENV.fetch('MOBILE_ADSENSE_SLOT', '').strip
cmp_url = ENV.fetch('MOBILE_ADS_CMP_SCRIPT_URL', '').strip
# Use the exact script URL supplied by Google's Privacy & messaging UI, bound
# to this publisher. No arbitrary URL or executable snippet is accepted.
publisher = client.sub(/\Aca-/, '')
valid_ads = client.match?(/\Aca-pub-\d{16}\z/) && slot.match?(/\A\d{10}\z/) &&
  cmp_url.match?(%r{\Ahttps://fundingchoicesmessages\.google\.com/i/#{Regexp.escape(publisher)}\?ers=1\z})
enabled = ENV['MOBILE_ADS_ENABLED'] == 'true' && ENV['MOBILE_ADS_WEB_CONSENT_READY'] == 'true' && valid_ads
plist['KakomonAdsEnabled'] = enabled
plist['KakomonAdsenseClient'] = enabled ? client : ''
plist['KakomonAdsenseSlot'] = enabled ? slot : ''
plist['KakomonAdsCMPScriptURL'] = enabled ? cmp_url : ''
puts "ADS1: WebView ads #{enabled ? 'configured' : 'disabled (optional settings absent or invalid)'}"
plist['NSUserTrackingUsageDescription'] = '他社のアプリやウェブサイトでの利用情報と、このアプリの利用情報を組み合わせて、興味に合った広告の表示と広告の効果測定に利用します。許可しなくても学習機能を利用できます。'
plist['CFBundleURLTypes'] = [{ 'CFBundleURLName' => "#{bundle_id}.auth", 'CFBundleURLSchemes' => ['kakomonai'] }]
Xcodeproj::Plist.write_to_path(plist, plist_path)
# cap sync copies the CLI-only appId into this bundled JSON on every run.
# Keep the shipped runtime identity consistent with Bundle.main / StoreKit.
config_path = 'ios/App/App/capacitor.config.json'
config = JSON.parse(File.read(config_path))
config['appId'] = bundle_id
File.write(config_path, JSON.pretty_generate(config) + "\n")
