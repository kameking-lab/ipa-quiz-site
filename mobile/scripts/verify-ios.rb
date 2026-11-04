# Run after generation and again after use-profiles; this script never mutates.
require 'xcodeproj'
require 'json'

bundle_id = 'jp.kakomon-ai.app'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |item| item.name == 'App' }
raise 'App target missing' unless target
raise 'App build configurations missing' if target.build_configurations.empty?
target.build_configurations.each do |configuration|
  settings = configuration.build_settings
  raise "Bundle ID mismatch in #{configuration.name}" unless settings['PRODUCT_BUNDLE_IDENTIFIER'] == bundle_id
  if ENV.key?('BUILD_NUMBER')
    raise "Build number mismatch in #{configuration.name}" unless settings['CURRENT_PROJECT_VERSION'].to_s == ENV['BUILD_NUMBER']
  end
end
plist = Xcodeproj::Plist.read_from_path('ios/App/App/Info.plist')
raise 'Info.plist Bundle ID mismatch' unless plist['CFBundleIdentifier'] == '$(PRODUCT_BUNDLE_IDENTIFIER)'
raise 'Info.plist build number must use Xcode setting' unless plist['CFBundleVersion'] == '$(CURRENT_PROJECT_VERSION)'
urls = [{ 'CFBundleURLName' => "#{bundle_id}.auth", 'CFBundleURLSchemes' => ['kakomonai'] }]
raise 'Auth URL scheme mismatch' unless plist['CFBundleURLTypes'] == urls
config = JSON.parse(File.read('ios/App/App/capacitor.config.json'))
raise 'Native Capacitor runtime Bundle ID mismatch' unless config['appId'] == bundle_id

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
