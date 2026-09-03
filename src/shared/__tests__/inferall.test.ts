import { describe, it } from "mocha"
import "should"
import { anthropicModels } from "../api"
import { buildInferallApiConfiguration, inferallBaseUrl, inferallDefaultModelId } from "../inferall"

// Signing in through InferAll used to configure the "anthropic" provider with a
// base URL and no model, which left the user on anthropicDefaultModelId. Every
// id in anthropicModels is a bare "claude-*" id, and on 2026-09-03 all 13 were
// refused by the gateway (12 unroutable, 1 retired) — so the sign-in flow could
// not complete a single request. These assertions pin the parts of the fix that
// a well-meaning revert would undo.
describe("InferAll sign-in configuration", () => {
	const config = buildInferallApiConfiguration({ planModeApiProvider: "cline", someUnrelatedSetting: 7 }, "ifu_test")

	// Read through a string index so that DELETING a field fails these assertions
	// at runtime rather than at compile time. Both spellings should be caught, but
	// a mutant that dies on a type error has not exercised the assertion.
	const field = (key: string) => String((config as unknown as Record<string, unknown>)[key])

	it("does not select the anthropic provider, whose model ids the gateway refuses", () => {
		config.apiProvider.should.not.equal("anthropic")
		config.planModeApiProvider.should.not.equal("anthropic")
		config.actModeApiProvider.should.not.equal("anthropic")
	})

	it("selects one provider for both modes and the legacy field", () => {
		config.apiProvider.should.equal(config.planModeApiProvider)
		config.actModeApiProvider.should.equal(config.planModeApiProvider)
	})

	it("puts the token and base url on the fields the selected provider reads", () => {
		// OpenAiHandler reads openAiApiKey/openAiBaseUrl; anthropicApiKey would be inert.
		field("openAiApiKey").should.equal("ifu_test")
		field("openAiBaseUrl").should.equal(inferallBaseUrl)
		inferallBaseUrl.should.endWith("/v1") // the OpenAI-compatible door we document
	})

	it("sets a model for both modes, so neither mode falls back to a provider default", () => {
		field("planModeOpenAiModelId").should.equal(inferallDefaultModelId)
		field("actModeOpenAiModelId").should.equal(inferallDefaultModelId)
		inferallDefaultModelId.should.not.be.empty()
	})

	it("defaults to a model the gateway routes as written, not a bare claude id", () => {
		// The two properties the refused ids shared: no provider prefix, claude family.
		inferallDefaultModelId.should.containEql("/")
		inferallDefaultModelId.startsWith("claude-").should.be.false()
		Object.keys(anthropicModels).should.not.containEql(inferallDefaultModelId)
	})

	it("carries the rest of the existing configuration through unchanged", () => {
		config.someUnrelatedSetting.should.equal(7)
	})
})
