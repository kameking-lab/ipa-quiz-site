require_relative "asc_config"

def expect_error(env)
  begin
    AscConfig.read(env)
  rescue RuntimeError
    return
  end
  raise "Expected invalid configuration to be rejected"
end

base = { "ASC_BUILD_NUMBER" => "17" }
raise "Default submission must be false" if AscConfig.read(base)[:submit]
raise "Review must be absent by default" if AscConfig.read(base)[:review_ready]
expect_error({})
expect_error(base.merge("SUBMIT_FOR_REVIEW" => "TRUE"))
expect_error(base.merge("SUBMIT_FOR_REVIEW" => "true"))
expect_error(base.merge("ASC_REVIEW_INFO_READY" => "true", "ASC_REVIEW_SOURCE" => "environment"))
tag = { "CM_TAG" => "asc-kakomon-submit-v1.0.0-b17-r20261105-01", "CM_TRIGGER_SOURCE" => "webhook" }
ready = base.merge(tag).merge("SUBMIT_FOR_REVIEW" => "false", "ASC_REVIEW_INFO_READY" => "true",
  "ASC_REVIEW_SOURCE" => "environment",
  "ASC_PREREQUISITES_CONFIRMED" => "true", "ASC_COPYRIGHT" => "2026 Test")
AscConfig::REVIEW_ENV.each_value { |key| ready[key] = "test" }
ready["ASC_REVIEW_CODE"] = "A" * 43
raise "Explicit ready request should submit" unless AscConfig.read(ready)[:submit]
expect_error(ready.merge("ASC_PREREQUISITES_CONFIRMED" => "false"))
expect_error(ready.merge("ASC_REVIEW_CODE" => "placeholder"))
expect_error(ready.merge("CM_TRIGGER_SOURCE" => "api"))
expect_error(ready.merge("CM_TAG" => "", "SUBMIT_FOR_REVIEW" => "true"))
expect_error(ready.merge("CM_TAG" => "asc-kakomon-v1.0.0-b17-r01", "SUBMIT_FOR_REVIEW" => "true"))
%w[asc-kakomon-anything asc-kakomon-v1.0.0-blatest-r01 asc-kakomon-v1.0.0-b0-r01 asc-kakomon-v1.0.0-b017-r01 asc-kakomon-v1.0.0-b17 asc-kakomon-submit-v1.0.0-b17-r01/other].each do |invalid|
  expect_error(base.merge("CM_TAG" => invalid))
end
expect_error(base.merge("CM_TAG" => "asc-kakomon-v1.0.0-b17-r01\n"))
listing = AscConfig.read(base.merge("CM_TAG" => "asc-kakomon-v1.2-b23-rretry-2", "ASC_APP_VERSION" => "9.9.9"))
raise "Tag must select exact version/build without submission" unless listing[:version] == "1.2" && listing[:build] == "23" && !listing[:submit]
stored = ready.reject { |key, _| AscConfig::REVIEW_ENV.value?(key) }.merge("ASC_REVIEW_SOURCE" => "existing")
raise "Stored ASC information must not need Codemagic review secrets" unless AscConfig.read(stored)[:submit]
expect_error(stored.merge("ASC_REVIEW_SOURCE" => "unknown"))
puts "ASC configuration, exact tag parsing and submission guards PASS"
