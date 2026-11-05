require "base64"
require "openssl"
require "tempfile"

# Codemagic integration variables contain a .p8 PEM, not a filename. Keep the
# normalized key outside the checkout/artifacts, and never include it in errors.
module AscApiKey
  class InvalidKey < StandardError; end

  def self.normalize(value)
    pem = value.to_s.strip
    # Integration normally supplies PEM. Accept strict Base64-wrapped PEM too;
    # this is decoded here, so fastlane must not decode it a second time.
    pem = Base64.strict_decode64(pem.gsub(/\s/, "")) unless pem.start_with?("-----BEGIN ")
    pem = pem.gsub('\\r\\n', "\n").gsub('\\n', "\n").gsub("\r\n", "\n").strip + "\n"
    unless pem.match?(/\A-----BEGIN (PRIVATE KEY|EC PRIVATE KEY)-----\n[A-Za-z0-9+\/=\n]+\n-----END \1-----\n\z/)
      raise InvalidKey
    end
    key = OpenSSL::PKey.read(pem)
    unless key.is_a?(OpenSSL::PKey::EC) && key.private? && key.group.curve_name == "prime256v1"
      raise InvalidKey
    end
    pem
  rescue ArgumentError, OpenSSL::OpenSSLError, InvalidKey
    raise InvalidKey, "APP_STORE_CONNECT_PRIVATE_KEY must contain a valid unencrypted P-256 .p8 PEM (or Base64 PEM); check Codemagic integration formatting", cause: nil
  end

  def self.with_key_file(env)
    pem = normalize(env.fetch("APP_STORE_CONNECT_PRIVATE_KEY", ""))
    file = Tempfile.new(["asc-api-key-", ".p8"])
    begin
      file.binmode
      file.chmod(0o600)
      file.write(pem)
      file.close
      yield file.path
    ensure
      file.close!
    end
  end
end
