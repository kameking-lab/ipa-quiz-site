# Pure validation, deliberately runs before authentication or ASC mutations.
module AscConfig
  TAG = /\Aasc-kakomon-(submit-)?v([0-9]+\.[0-9]+(?:\.[0-9]+)?)-b([1-9][0-9]*)-r([A-Za-z0-9][A-Za-z0-9-]{0,39})\z/.freeze
  REVIEW_ENV = {
    first_name: "ASC_REVIEW_FIRST_NAME", last_name: "ASC_REVIEW_LAST_NAME",
    phone_number: "ASC_REVIEW_PHONE", email_address: "ASC_REVIEW_EMAIL",
    demo_password: "ASC_REVIEW_CODE"
  }.freeze

  def self.request(env)
    values = env.to_h.dup
    tag = values.fetch("CM_TAG", "")
    if !tag.empty?
      match = TAG.match(tag)
      raise "Invalid ASC tag; use asc-kakomon-[submit-]vVERSION-bBUILD-rRUN" unless match
      submit = !match[1].nil?
      raise "Review submission requires a tag webhook" if submit && values["CM_TRIGGER_SOURCE"] != "webhook"
      raise "A listing tag cannot request review submission" if !submit && values["SUBMIT_FOR_REVIEW"] == "true"
      values.update("ASC_APP_VERSION" => match[2], "ASC_BUILD_NUMBER" => match[3], "SUBMIT_FOR_REVIEW" => submit.to_s)
    elsif values["SUBMIT_FOR_REVIEW"] == "true"
      raise "Review submission requires a dedicated submit tag"
    end
    values
  end

  def self.read(input)
    env = request(input)
    version = env.fetch("ASC_APP_VERSION", "1.0.0")
    build = env.fetch("ASC_BUILD_NUMBER", "")
    raise "ASC_APP_VERSION must be a numeric marketing version" unless version.match?(/\A\d+\.\d+(?:\.\d+)?\z/)
    raise "Set ASC_BUILD_NUMBER to an existing uploaded integer build (never latest)" unless build.match?(/\A[1-9]\d*\z/)
    %w[SUBMIT_FOR_REVIEW ASC_REVIEW_INFO_READY ASC_PREREQUISITES_CONFIRMED].each do |key|
      raise "#{key} must be true or false" unless [nil, "", "true", "false"].include?(env[key])
    end
    submit = env["SUBMIT_FOR_REVIEW"] == "true"
    ready = env["ASC_REVIEW_INFO_READY"] == "true"
    source = env.fetch("ASC_REVIEW_SOURCE", "existing")
    raise "ASC_REVIEW_SOURCE must be existing or environment" unless %w[existing environment].include?(source)
    review = REVIEW_ENV.transform_values { |key| env.fetch(key, "") }
    if ready && source == "environment"
      raise "Ready review information requires every ASC_REVIEW_* secret" if review.values.any?(&:empty?)
      raise "Invalid review code format" unless review[:demo_password].match?(/\A[A-Za-z0-9_-]{43,128}\z/)
    end
    copyright = !env.fetch("ASC_COPYRIGHT", "").strip.empty?
    if submit
      raise "Review submission requires complete review info, copyright and confirmed ASC1 prerequisites" unless ready && copyright && env["ASC_PREREQUISITES_CONFIRMED"] == "true"
    end
    { version: version, build: build, submit: submit, review_ready: ready, review_source: source, review: review, copyright: copyright }
  end
end

if $PROGRAM_NAME == __FILE__
  # CM_ENV is consumed by later steps, not sourced as shell code. Only public,
  # validated parameters go here. Full prerequisite validation runs next.
  values = AscConfig.request(ENV)
  config = AscConfig.read(values.merge("SUBMIT_FOR_REVIEW" => "false", "CM_TAG" => "", "ASC_REVIEW_INFO_READY" => "false"))
  puts "ASC_APP_VERSION=#{config[:version]}"
  puts "ASC_BUILD_NUMBER=#{config[:build]}"
  puts "SUBMIT_FOR_REVIEW=#{values.fetch('SUBMIT_FOR_REVIEW', 'false')}"
end
