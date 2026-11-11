# CocoaPods supplies xcodeproj on CI; Windows verification also needs this gem.
require 'xcodeproj'
require 'json'
require_relative 'ios-ads-config'
bundle_id = 'jp.kakomon-ai.app'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |item| item.name == 'App' }
raise 'App target missing' unless target
build_number = ENV.fetch('BUILD_NUMBER', '1')
raise 'Invalid build number' unless build_number.match?(/\A[1-9]\d*\z/)
target.build_configurations.each do |configuration|
  configuration.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = bundle_id
  configuration.build_settings['MARKETING_VERSION'] = '1.0.1'
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
# Capacitor 8's template builds the window in SceneDelegate and ignores the
# storyboard class. Without this, QualificationBridgeViewController (and the
# TrackingTransparency / QualificationBridge plugins and safe-area insets it
# registers) never runs on a device: TestFlight builds 12 and 13 had plain
# CAPBridgeViewController, so every call to those plugins was UNIMPLEMENTED.
scene_path = 'ios/App/App/SceneDelegate.swift'
if File.exist?(scene_path)
  scene = File.read(scene_path)
  unless scene.include?('rootViewController = QualificationBridgeViewController()')
    scene = scene.sub('rootViewController = CAPBridgeViewController()', 'rootViewController = QualificationBridgeViewController()')
    raise 'Unsupported Capacitor SceneDelegate' unless scene.include?('rootViewController = QualificationBridgeViewController()')
    File.write(scene_path, scene)
  end
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
ads = IosAdsConfig.read
enabled, app_id, client, slot, cmp_url = ads.values_at(:enabled, :app_id, :client, :slot, :cmp_url)
plist['KakomonAdsEnabled'] = enabled
plist['KakomonAdsenseClient'] = enabled ? client : ''
plist['KakomonAdsenseSlot'] = enabled ? slot : ''
plist['KakomonAdsCMPScriptURL'] = enabled ? cmp_url : ''
puts "ADS1: WebView ads #{enabled ? 'configured' : 'disabled (optional settings absent or invalid)'}"
if enabled
  # WebView-only integration: exemption from the native-ad App ID check.
  # Do not call MobileAds.start or ship Google's sample App ID as a fallback.
  plist['GADIntegrationManager'] = 'webview'
  app_id.empty? ? plist.delete('GADApplicationIdentifier') : plist['GADApplicationIdentifier'] = app_id
  plist['NSUserTrackingUsageDescription'] = '他社のアプリやウェブサイトでの利用情報と、このアプリの利用情報を組み合わせて、興味に合った広告の表示と広告の効果測定に利用します。許可しなくても学習機能を利用できます。'
else
  plist.delete('NSUserTrackingUsageDescription')
  plist.delete_if { |key, _| key.start_with?('GAD') }
end
plist['CFBundleURLTypes'] = [{ 'CFBundleURLName' => "#{bundle_id}.auth", 'CFBundleURLSchemes' => ['kakomonai'] }]
Xcodeproj::Plist.write_to_path(plist, plist_path)
# Always start from the advertising template so off/on/off regeneration cannot
# retain tracking declarations or lose the original ads-enabled disclosures.
privacy = Xcodeproj::Plist.read_from_path(File.expand_path('../ios-assets/PrivacyInfo.xcprivacy', __dir__))
unless enabled
  privacy['NSPrivacyTracking'] = false
  privacy.delete('NSPrivacyTrackingDomains')
  privacy['NSPrivacyCollectedDataTypes'].reject! do |data|
    data['NSPrivacyCollectedDataTypeTracking'] = false
    data['NSPrivacyCollectedDataTypePurposes'].delete('NSPrivacyCollectedDataTypePurposeThirdPartyAdvertising')
    ['NSPrivacyCollectedDataTypeDeviceID', 'NSPrivacyCollectedDataTypeAdvertisingData', 'NSPrivacyCollectedDataTypeCoarseLocation'].include?(data['NSPrivacyCollectedDataType'])
  end
end
Xcodeproj::Plist.write_to_path(privacy, 'ios/App/App/PrivacyInfo.xcprivacy')
# cap sync copies the CLI-only appId into this bundled JSON on every run.
# Keep the shipped runtime identity consistent with Bundle.main / StoreKit.
config_path = 'ios/App/App/capacitor.config.json'
config = JSON.parse(File.read(config_path))
config['appId'] = bundle_id
File.write(config_path, JSON.pretty_generate(config) + "\n")
