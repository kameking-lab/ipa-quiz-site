# ASC11: existing Codemagic integration authentication

Keep `integrations: app_store_connect: App Store Key`. No new secret or integration
setting is required. The official documentation says this integration injects
`APP_STORE_CONNECT_KEY_IDENTIFIER`, `APP_STORE_CONNECT_ISSUER_ID`, and
`APP_STORE_CONNECT_PRIVATE_KEY`; reserved integration values override group values.
It is not a separate credential service which a CLI command can use when those
values and standard key files are missing or invalid.

`asc_auth.py` uses **codemagic-cli-tools 0.70.2** itself: its argument types resolve
PEM, `@file:...`, and `@env:...`. If the private-key variable is absent, its normal
`AuthKey_<key-id>.p8` search is used. We do not assume that the variable is a literal
PEM, Base64, or a bare filename. Malformed/escaped/Base64 values are not an official
CLI format. The fixed dependency version is intentional because the adapter uses
the Python API, including `_assert_api_client_credentials()`.

The workflow first checks JWT signing and makes a read-only request to confirm app
ID `6830358918` and bundle `jp.kakomon-ai.app`. Failure reports only a source category
(PEM / file reference / environment reference / standard search / unsupported),
never input values, filenames, raw exceptions or response bodies. If the existing
integration itself contains a wrong key, this still stops; we have not verified
the failing build's real credential format and do not claim otherwise.

The CLI has no token-export action, screenshot-set commands, review-detail commands
or subscription catalog commands in 0.70.2. We therefore retain the existing
guarded fastlane metadata/screenshot uploader and use Codemagic's
`AppStoreConnectApiClient` JWT issuer. `AscCodemagicToken` passes the JWT to
Spaceship over a captured anonymous pipe and refreshes through the same issuer
before expiry. Ruby never receives the private key. No API-key action or sensitive
key hash is passed to deliver. The existing IAP/settings REST client also uses this
issuer. Exact version/build selection, default submission=false, review-contact
reuse, explicit submission guards and manual release remain in place.

Neither keys nor JWTs are written to `CM_ENV`, artifacts or the checkout. JWT disk
caching and HTTP request logging are disabled. `--token-for-pipe` is internal IPC;
do not run it in a build shell or redirect it into a log/artifact. For diagnostics,
use `--check`. Ordinary branch push can start the existing TestFlight workflow;
metadata rerun requires a separate tag and is not performed by this change.

Official references:

- [Codemagic integration and exposed build variables](https://docs.codemagic.io/yaml-code-signing/alternative-code-signing-methods/), automatic signing / configuring environment variables.
- [Reserved integration variables and precedence](https://help.codemagic.io/articles/1244724682-why-is-my-app-store-connect-private-key-environment-variable-not-updating-between-builds), Answer.
- [CLI authentication options and actions](https://github.com/codemagic-ci-cd/cli-tools/blob/73a194a2db2dadf381c878bf1d848dc9e27809c4/docs/app-store-connect/README.md), `--private-key`, `--disable-jwt-cache`, actions.
- [Official credential resolution / client](https://github.com/codemagic-ci-cd/cli-tools/blob/73a194a2db2dadf381c878bf1d848dc9e27809c4/src/codemagic/tools/app_store_connect/app_store_connect.py), `_assert_api_client_credentials`, `_resolve_app_store_connect_private_key`, `_get_api_client`.
- [Official reference formats](https://github.com/codemagic-ci-cd/cli-tools/blob/73a194a2db2dadf381c878bf1d848dc9e27809c4/src/codemagic/cli/argument/typed_cli_argument.py), `EnvironmentArgumentValue`.
- [Official JWT lifetime and refresh](https://github.com/codemagic-ci-cd/cli-tools/blob/73a194a2db2dadf381c878bf1d848dc9e27809c4/src/codemagic/apple/app_store_connect/json_web_token_manager.py), `get_jwt`, 19-minute expiry, `enable_cache=False`.
- [fastlane 2.241.2 Token refresh interface](https://github.com/fastlane/fastlane/blob/2.241.2/spaceship/lib/spaceship/connect_api/token.rb) and [deliver existing-token authentication](https://github.com/fastlane/fastlane/blob/2.241.2/deliver/lib/deliver/runner.rb), `login`.
