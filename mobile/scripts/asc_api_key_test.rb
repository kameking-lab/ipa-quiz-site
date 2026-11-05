require "minitest/autorun"
require_relative "asc_api_key"

class AscApiKeyTest < Minitest::Test
  def setup
    # Generated dummy only. No real credentials or key fixtures are read/written.
    @key = OpenSSL::PKey::EC.generate("prime256v1")
    @pem = @key.private_to_pem
  end

  def test_pem_transport_forms_load_and_sign_with_the_same_dummy_key
    forms = [@pem, @pem.gsub("\n", "\r\n"), @pem.gsub("\n", '\\n'),
             @pem.gsub("\n", '\\r\\n'), Base64.strict_encode64(@pem),
             Base64.strict_encode64(@pem.gsub("\n", '\\n')),
             "  \n#{@pem}  \n", @key.to_pem]
    forms.each do |value|
      path = nil
      AscApiKey.with_key_file("APP_STORE_CONNECT_PRIVATE_KEY" => value) do |file|
        path = file
        assert_equal 0o600, File.stat(file).mode & 0o777 unless Gem.win_platform?
        loaded = OpenSSL::PKey::EC.new(File.binread(file)) # fastlane Token.create's loader
        signature = loaded.sign("SHA256", "asc10-dummy-only")
        assert @key.verify("SHA256", signature, "asc10-dummy-only")
        assert_equal "\n", File.binread(file)[-1]
        refute_includes File.binread(file), "\r"
      end
      refute File.exist?(path), "Temporary key survived successful authentication"
    end
  end

  def test_cleanup_when_authentication_fails
    path = nil
    assert_raises(RuntimeError) do
      AscApiKey.with_key_file("APP_STORE_CONNECT_PRIVATE_KEY" => @pem) do |file|
        path = file
        raise "dummy authentication failure"
      end
    end
    refute File.exist?(path), "Temporary key survived failed authentication"
  end

  def test_rejects_bad_or_wrong_keys_without_exposing_input_or_openssl_errors
    marker = "asc10-secret-marker"
    values = [nil, "", marker, Base64.strict_encode64(marker),
              @pem.sub("BEGIN PRIVATE", "BEGIN ENCRYPTED PRIVATE"),
              @key.public_to_pem, OpenSSL::PKey::EC.generate("secp384r1").private_to_pem,
              OpenSSL::PKey::RSA.generate(2048).private_to_pem,
              "-----BEGIN PRIVATE KEY-----\n#{marker}\n-----END PRIVATE KEY-----\n"]
    values.each do |value|
      error = assert_raises(AscApiKey::InvalidKey) { AscApiKey.normalize(value) }
      refute_includes error.message, marker
      assert_nil error.cause
    end
  end
end
