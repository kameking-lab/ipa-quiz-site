# One effective setting for Pod installation, Info.plist and the privacy manifest.
module IosAdsConfig
  def self.read(env = ENV)
    app_id = env.fetch('MOBILE_GAD_APPLICATION_ID', '').strip
    banner_id = env.fetch('MOBILE_ADMOB_BANNER_ID', '').strip
    enabled = env['MOBILE_ADS_ENABLED'] == 'true' &&
      env['MOBILE_ADS_NATIVE_CONSENT_READY'] == 'true' && valid_ids?(app_id, banner_id)
    { enabled: enabled, app_id: app_id, banner_id: banner_id }
  end

  def self.valid_ids?(app_id, banner_id)
    publisher = app_id[/\Aca-app-pub-(\d{16})~\d{10}\z/, 1]
    # Google's public sample publisher cannot enable a distribution build.
    !publisher.nil? && publisher != '3940256099942544' &&
      banner_id.match?(%r{\Aca-app-pub-#{publisher}/\d{10}\z})
  end
end

puts IosAdsConfig.read[:enabled] if $PROGRAM_NAME == __FILE__
