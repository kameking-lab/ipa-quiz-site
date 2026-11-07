# One effective setting for Pod installation, Info.plist and the privacy manifest.
module IosAdsConfig
  def self.read(env = ENV)
    app_id = env.fetch('MOBILE_GAD_APPLICATION_ID', '').strip
    raise 'Invalid MOBILE_GAD_APPLICATION_ID' unless app_id.empty? || app_id.match?(/\Aca-app-pub-\d{16}~\d{10}\z/)
    client = env.fetch('MOBILE_ADSENSE_CLIENT', '').strip
    slot = env.fetch('MOBILE_ADSENSE_SLOT', '').strip
    cmp_url = env.fetch('MOBILE_ADS_CMP_SCRIPT_URL', '').strip
    # Exact publisher-bound script URL supplied by Google's Privacy & messaging.
    publisher = client.sub(/\Aca-/, '')
    valid_ads = client.match?(/\Aca-pub-\d{16}\z/) && slot.match?(/\A\d{10}\z/) &&
      cmp_url.match?(%r{\Ahttps://fundingchoicesmessages\.google\.com/i/#{Regexp.escape(publisher)}\?ers=1\z})
    enabled = env['MOBILE_ADS_ENABLED'] == 'true' && env['MOBILE_ADS_WEB_CONSENT_READY'] == 'true' && valid_ads
    { enabled: enabled, app_id: app_id, client: client, slot: slot, cmp_url: cmp_url }
  end
end

puts IosAdsConfig.read[:enabled] if $PROGRAM_NAME == __FILE__
