# Pure validation, deliberately runs before authentication or ASC mutations.
module AscConfig
  REVIEW_ENV = {
    first_name: "ASC_REVIEW_FIRST_NAME", last_name: "ASC_REVIEW_LAST_NAME",
    phone_number: "ASC_REVIEW_PHONE", email_address: "ASC_REVIEW_EMAIL",
    demo_password: "ASC_REVIEW_CODE"
  }.freeze

  def self.read(env)
    version = env.fetch("ASC_APP_VERSION", "1.0.0")
    build = env.fetch("ASC_BUILD_NUMBER", "")
    raise "ASC_APP_VERSION must be a numeric marketing version" unless version.match?(/\A\d+\.\d+(?:\.\d+)?\z/)
    raise "Set ASC_BUILD_NUMBER to an existing uploaded integer build (never latest)" unless build.match?(/\A[1-9]\d*\z/)
    %w[SUBMIT_FOR_REVIEW ASC_REVIEW_INFO_READY ASC_PREREQUISITES_CONFIRMED].each do |key|
      raise "#{key} must be true or false" unless [nil, "", "true", "false"].include?(env[key])
    end
    submit = env["SUBMIT_FOR_REVIEW"] == "true"
    ready = env["ASC_REVIEW_INFO_READY"] == "true"
    review = REVIEW_ENV.transform_values { |key| env.fetch(key, "") }
    raise "Ready review information requires every ASC_REVIEW_* secret" if ready && review.values.any?(&:empty?)
    raise "Invalid review code format" if ready && !review[:demo_password].match?(/\A[A-Za-z0-9_-]{43,128}\z/)
    copyright = !env.fetch("ASC_COPYRIGHT", "").strip.empty?
    if submit
      raise "Review submission requires complete review info, copyright and confirmed ASC1 prerequisites" unless ready && copyright && env["ASC_PREREQUISITES_CONFIRMED"] == "true"
    end
    { version: version, build: build, submit: submit, review_ready: ready, review: review, copyright: copyright }
  end
end
