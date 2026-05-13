# InferAll for VS Code

**Cline with free inference built in. Zero setup. Anthropic-compatible.**

InferAll is a fork of [Cline](https://github.com/cline/cline) that bundles free inference and a single-vendor billing relationship into the same agentic coding experience Cline pioneered. Sign in once, get 100k tokens free, and start coding — no API keys to manage, no separate providers to onboard.

<p align="center">
  <img src="https://media.githubusercontent.com/media/cline/cline/main/assets/docs/demo.gif" width="100%" />
</p>

## Why InferAll

- **No API key for first 100k tokens.** Sign in to InferAll and start coding. The free tier is enough to evaluate the workflow end-to-end before any billing relationship begins.
- **Anthropic-compatible.** The InferAll gateway speaks Anthropic's API format. If your team has already approved Claude Code or Anthropic SDK-based tooling, InferAll drops into that same approved chain — no new vendor onboarding required.
- **Single key, single bill, single endpoint.** Every gateway call hits `api.inferall.ai`. One vendor relationship for procurement, one billing surface, one endpoint to log.
- **Automatic provider failover.** The gateway routes across upstream providers to keep you productive even when one provider has a bad day.
- **Audit-log-ready.** The extension scaffolds an `inferall.auditLog.enabled` setting for compliance buyers. (Local audit-log writer is on the near-term roadmap — see `REBRAND_AUDIT.md`.)

## Designed for environments where AI procurement is hard

Agencies and regulated orgs are standardizing on VS Code and actively restricting ad-hoc ChatGPT use. InferAll is intentionally positioned to meet that audience:

- **Single-vendor relationship.** One contract, one DPA, one endpoint — instead of evaluating Anthropic + OpenAI + Google + the agent vendor separately.
- **Anthropic format compatibility** means existing security-cleared tooling stacks keep working.
- **No data exfiltration to multiple vendors.** Requests fan out from a single trust boundary.
- **No compliance theater.** We do not currently claim FedRAMP, SOC 2, or other certifications — those require real audits, and we will publish them only when they exist. See `inferall.ai/security` for the current state.

## Install

1. Install the extension from the VS Code Marketplace (listing coming soon — until then, see `https://inferall.ai/extension` for the direct download).
2. Open the InferAll sidebar.
3. Sign in. The first 100k tokens are on the house.

## Features

The full agentic feature set inherited from Cline:

- **Plan-then-act flow** with explicit approval before any file change or terminal command.
- **Create and edit files**, with a diff view, linter/compiler error monitoring, and Timeline integration.
- **Run terminal commands** via VS Code shell integration.
- **Use a browser** for end-to-end testing and visual debugging.
- **Model Context Protocol (MCP)** support — connect databases, APIs, and custom tools.
- **`@url`, `@problems`, `@file`, `@folder`** context primitives.
- **Checkpoints** — compare and restore workspace state at every step.

## Contributing

To contribute, start with [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Acknowledgments

InferAll AI is a fork of [Cline](https://github.com/cline/cline) (© Cline Bot Inc., Apache License 2.0). The agentic engine, prompt engineering, MCP integration, and webview UI are upstream Cline's work, and this fork honors that lineage. We track upstream and pull improvements regularly. If your interest is the underlying agent (rather than the InferAll-included inference / single-vendor / audit-ready positioning), please use upstream Cline directly and support the original project.

**InferAll Inc. is not affiliated with or endorsed by Cline Bot Inc.** See [`NOTICE`](./NOTICE) for the full attribution and modification notice.

## License

InferAll AI is distributed under the [Apache License 2.0](./LICENSE). Includes code © 2026 Cline Bot Inc. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).
