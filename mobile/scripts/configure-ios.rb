# CocoaPods supplies xcodeproj. Executed only by prepare-ios.mjs on macOS.
require 'xcodeproj'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |item| item.name == 'App' }
raise 'App target missing' unless target
build_number = ENV.fetch('BUILD_NUMBER', '1')
raise 'Invalid build number' unless build_number.match?(/\A\d+\z/)
target.build_configurations.each do |configuration|
  configuration.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'jp.kakomon-ai.app'
  configuration.build_settings['MARKETING_VERSION'] = '1.0.0'
  configuration.build_settings['CURRENT_PROJECT_VERSION'] = build_number
  configuration.build_settings['TARGETED_DEVICE_FAMILY'] = '1'
  configuration.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
end
group = project.main_group.find_subpath('App', false)
raise 'App group missing' unless group
reference = group.files.find { |file| file.path == 'PrivacyInfo.xcprivacy' } || group.new_file('PrivacyInfo.xcprivacy')
target.resources_build_phase.add_file_reference(reference, true)
project.root_object.attributes['LastUpgradeCheck'] = '2600'
project.save
plist_path = 'ios/App/App/Info.plist'
plist = Xcodeproj::Plist.read_from_path(plist_path)
plist['CFBundleDevelopmentRegion'] = 'ja'
plist['CFBundleLocalizations'] = ['ja']
plist['CFBundleDisplayName'] = '過去問AI'
plist['ITSAppUsesNonExemptEncryption'] = false
Xcodeproj::Plist.write_to_path(plist, plist_path)
