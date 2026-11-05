# Exercise the actual Fastfile from fastlane's real working directory, without gems,
# credentials, network or artifacts. Stop exactly at the upload boundary.
require "json"
require "fileutils"
$LOADED_FEATURES << "spaceship.rb"

module UI
  def self.user_error!(message)
    raise message
  end
end
module Spaceship
  module ConnectAPI
    class << self
      attr_accessor :token, :app, :builds
    end
    class Token
      def self.create(**_options); Object.new; end
    end
    class App
      def self.find(_bundle); ConnectAPI.app; end
    end
    class Build
      def self.all(**options)
        raise "Unsafe lookup" unless options[:build_number] == "17" && options[:version] == "1.0.0" && options[:processing_states] == "VALID"
        ConnectAPI.builds
      end
    end
  end
end
class UploadBoundary < StandardError; end
class LaneHarness
  attr_reader :options
  attr_accessor :return_without_submission
  def default_platform(*); end
  def platform(*); yield; end
  def desc(*); end
  def lane(*, &block); @lane = block; end
  def sh(_python, script, _flag)
    raise "Wrong validation path under fastlane cwd" unless File.file?(script)
  end
  def deliver(**options)
    @options = options
    raise UploadBoundary unless return_without_submission
  end
  def sleep(_seconds); end
  def run; @lane.call; end
end
ReviewRecord = Struct.new(:contact_first_name, :contact_last_name, :contact_phone, :contact_email,
                         :demo_account_name, :demo_account_password, :demo_account_required, :updates) do
  def update(attributes:); self.updates = attributes; end
end
Version = Struct.new(:id, :version_string, :app_version_state, :app_store_state, :selected, :review) do
  def select_build(build_id:); self.selected = build_id; end
  def fetch_app_store_review_detail; review; end
end
AppRecord = Struct.new(:id, :version, :editable) do
  def get_app_store_versions(**); [version]; end
  def get_edit_app_store_version(**); editable; end
end
BuildRecord = Struct.new(:id, :expired)
ENV.update("ASC_BUILD_NUMBER" => "17", "SUBMIT_FOR_REVIEW" => "false", "ASC_REVIEW_INFO_READY" => "false",
  "APP_STORE_CONNECT_KEY_IDENTIFIER" => "TEST", "APP_STORE_CONNECT_ISSUER_ID" => "TEST", "APP_STORE_CONNECT_PRIVATE_KEY" => "TEST")
root = File.expand_path("..", __dir__)
Dir.chdir(File.join(root, "fastlane")) do
  v = Version.new("v1", "1.0.0", "PREPARE_FOR_SUBMISSION")
  Spaceship::ConnectAPI.app = AppRecord.new("6830358918", v, v)
  Spaceship::ConnectAPI.builds = [BuildRecord.new("b17", false)]
  h = LaneHarness.new
  h.instance_eval(File.read("Fastfile"), File.expand_path("Fastfile"), 1)
  begin; h.run; rescue UploadBoundary; end
  raise "Build wasn't explicitly selected" unless v.selected == "b17"
  o = h.options
  raise "Unsafe default upload flags" unless o[:skip_binary_upload] && !o[:submit_for_review] && !o[:automatic_release] && !o[:reject_if_possible]
  raise "Wrong metadata path" unless File.file?(File.join(o[:metadata_path], "ja/name.txt"))
  raise "Unexpected review secrets" if o.key?(:app_review_information)
  v.selected = nil
  Spaceship::ConnectAPI.app.editable = Version.new("other", "1.1.0", "PREPARE_FOR_SUBMISSION")
  begin
    h.run
    raise "Version mismatch should fail"
  rescue RuntimeError => error
    raise unless error.message == "deliver would target another version"
  end
  raise "Mutated build before mismatch rejection" if v.selected
  Spaceship::ConnectAPI.app.editable = v
  ENV.update("SUBMIT_FOR_REVIEW" => "true", "ASC_REVIEW_INFO_READY" => "true",
    "ASC_PREREQUISITES_CONFIRMED" => "true", "ASC_COPYRIGHT" => "2026 Test",
    "CM_TAG" => "asc-kakomon-submit-v1.0.0-b17-rtest", "CM_TRIGGER_SOURCE" => "webhook",
    "ASC_REVIEW_SOURCE" => "environment")
  AscConfig::REVIEW_ENV.each_value { |key| ENV[key] = "test" }
  ENV["ASC_REVIEW_CODE"] = "A" * 43
  h.return_without_submission = false
  begin; h.run; rescue UploadBoundary; end
  raise "Environment review route changed" unless h.options[:app_review_information][:demo_password] == "A" * 43
  # The normal ASC3 route needs no review secrets in Codemagic. Stop before
  # mutations if any ASC field is missing, then verify a notes-only PATCH.
  ENV["ASC_REVIEW_SOURCE"] = "existing"
  AscConfig::REVIEW_ENV.each_value { |key| ENV.delete(key) }
  v.review = ReviewRecord.new("First", "Last", "+81000000000", "test@example.invalid", "App Review", "A" * 43, true)
  %i[contact_first_name contact_last_name contact_phone contact_email demo_account_name demo_account_password demo_account_required].each do |field|
    saved = v.review.public_send(field)
    v.review.public_send("#{field}=", nil)
    v.selected = nil
    begin
      h.run
      raise "Missing stored review field should fail"
    rescue RuntimeError => error
      raise unless error.message.start_with?("Complete existing ASC review contact")
    end
    raise "Selected build before review rejection" if v.selected
    raise "Patched incomplete review" if v.review.updates
    v.review.public_send("#{field}=", saved)
  end
  begin; h.run; rescue UploadBoundary; end
  raise "Stored credentials leaked into deliver arguments" if h.options.key?(:app_review_information)
  raise "Notes PATCH changed owner fields" unless v.review.updates.keys == [:notes]
  raise "Wrong notes" unless v.review.updates[:notes] == File.read(File.join(root, "asc/review-notes.ja.txt"), encoding: "UTF-8")
  h.return_without_submission = true
  begin
    h.run
    raise "A precheck block should not report submission success"
  rescue RuntimeError => error
    raise unless error.message.start_with?("Review was requested but ASC did not confirm submission")
  end
end
puts "ASC Fastfile directory, build-selection and upload-boundary checks PASS"
