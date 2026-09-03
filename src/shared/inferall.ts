// InferAll
//
// Sign-in (Controller.handleInferallCallback) used to configure the "anthropic"
// provider with anthropicBaseUrl pointed at our gateway and NO model, leaving
// the user on anthropicDefaultModelId — a bare "claude-*" id. That could not be
// worked around by setting a gateway model id either: AnthropicHandler.getModel()
// only honours apiModelId when `modelId in anthropicModels`, so anything that is
// not one of the 13 bare claude ids below is silently discarded.
//
// Measured 2026-09-03 against the gateway's own routeViaMessagesDoor: all 13 of
// those ids are refused — 12 by the unroutable-model gate ("InferAll cannot route
// ... as written, and we will not substitute a different model for it") and
// claude-opus-4-1-20250805 as retired. There was no model a signed-in user could
// pick that we would serve.
//
// So sign-in configures the OpenAI-compatible provider instead: its getModel()
// passes openAiModelId through unfiltered, against the /v1 base URL we publish
// in the docs. The default below is $0 and routes as written.
//
// IF THIS ID IS EVER CHANGED, verify the new one against the live door first —
// publishing a model id we have not probed is the mistake this product keeps
// paying for (the homepage, the docs and the blog each shipped bare ids).
export const inferallApiProvider = "openai" as const
export const inferallBaseUrl = "https://api.inferall.ai/v1"
export const inferallDefaultModelId = "minimaxai/minimax-m3"

/**
 * The api configuration produced by signing in through InferAll.
 *
 * Extracted from Controller.handleInferallCallback so the shape can be asserted
 * without booting a Controller — see __tests__/inferall.test.ts.
 */
export function buildInferallApiConfiguration<T extends object>(current: T, token: string) {
	return {
		...current,
		planModeApiProvider: inferallApiProvider,
		actModeApiProvider: inferallApiProvider,
		apiProvider: inferallApiProvider,
		openAiApiKey: token,
		openAiBaseUrl: inferallBaseUrl,
		// Both modes: whichever one the user is not currently in would otherwise keep
		// the previous provider's model and send an empty id on the next mode switch.
		planModeOpenAiModelId: inferallDefaultModelId,
		actModeOpenAiModelId: inferallDefaultModelId,
	}
}
