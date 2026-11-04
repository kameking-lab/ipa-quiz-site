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
expect_error(base.merge("ASC_REVIEW_INFO_READY" => "true"))
ready = base.merge("SUBMIT_FOR_REVIEW" => "true", "ASC_REVIEW_INFO_READY" => "true",
  "ASC_PREREQUISITES_CONFIRMED" => "true", "ASC_COPYRIGHT" => "2026 Test")
AscConfig::REVIEW_ENV.each_value { |key| ready[key] = "test" }
ready["ASC_REVIEW_CODE"] = "A" * 43
raise "Explicit ready request should submit" unless AscConfig.read(ready)[:submit]
expect_error(ready.merge("ASC_PREREQUISITES_CONFIRMED" => "false"))
expect_error(ready.merge("ASC_REVIEW_CODE" => "placeholder"))
puts "ASC configuration guards PASS (9 cases)"
