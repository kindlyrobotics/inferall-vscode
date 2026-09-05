/**
 * Windows needs longer for hook tests, because hook tests SPAWN A PROCESS.
 *
 * Every test in this directory that exercises `HookFactory` / `HookProcess`
 * writes a Node script to disk and runs it through `spawn` (HookProcess.ts:176).
 * On Windows, process creation plus Node startup routinely exceeds mocha's 2000ms
 * default under CI load. That is the platform being slow at the thing under test,
 * not a hidden defect — which is why an allowance is the right fix here.
 *
 * ⛔ THE ALLOWANCE EXISTED AND COVERED 7 TESTS OF 167. Measured 2026-09-05: the
 *   `if (process.platform === "win32") this.timeout(...)` guard appeared in
 *   `taskresume.test.ts` (4 of 16), `hook-factory.test.ts` (2 of 27) and
 *   `user-prompt-submit.test.ts` (1 of 16). Every other hook test ran at the
 *   2000ms default on Windows. `Tests` failed on 4 of the last 12 runs on main
 *   (~33%), and the observed timeouts were 4 at 2000ms against 1 at 15000ms —
 *   i.e. mostly tests that never received the allowance at all, not tests that
 *   are genuinely too slow for it.
 *
 * ⭐ APPLIED PER FILE, NOT PER TEST, BECAUSE PER-TEST IS WHAT FAILED. A guard
 *   that must be remembered on each new `it()` was missed 160 times. A
 *   `beforeEach` at the top of a suite covers tests that do not exist yet, which
 *   is the only version of this that stays fixed.
 *
 * ⚠️ DELIBERATELY NOT GLOBAL. Files here that do no spawning —
 *   `shell-escape.test.ts` (35 pure string tests), `hooks-utils`,
 *   `hook-model-context`, `notification-hook` — keep the default, so a real
 *   regression there still surfaces as a timeout instead of being absorbed.
 */
export const WINDOWS_HOOK_TIMEOUT_MS = 30_000

/**
 * Use inside a suite that spawns hooks:
 *
 *     describe("...", () => {
 *       beforeEach(function () { applyWindowsHookTimeout(this) })
 *       ...
 *     })
 *
 * ⚠️ IT IS A `beforeEach`, NOT A CALL ON THE SUITE, FOR A CONCRETE REASON: every
 *   top-level `describe` in this directory is an ARROW function, so `this` is not
 *   a Mocha context there. That is also why the original guards ended up
 *   per-test — each `it()` had to be converted to `function ()` to reach `this`.
 *   A `beforeEach(function () {...})` gets the context without restructuring the
 *   suite, and still covers every test in it, including ones added later.
 */
export function applyWindowsHookTimeout(ctx: Mocha.Context): void {
	if (process.platform !== "win32") {
		return
	}
	ctx.timeout(WINDOWS_HOOK_TIMEOUT_MS)
}
