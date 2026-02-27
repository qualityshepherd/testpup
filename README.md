[![Test](https://github.com/qualityshepherd/testpup/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/qualityshepherd/testpup/actions/workflows/test.yml)

# testpup
Minimal drop-in test setup: `node:test` + [Puppeteer](https://pptr.dev/). AVA-style assertions. No config, no magic. Meant to be customized to _your_ DSL.

> brine says: [Playwright](https://playwright.dev/) and [TestCafe](https://testcafe.io/) are powerful but heavy, opinionated (in a bad way), and slow. testpup is ~80 lines you can read in 2 minutes, edit in 5, and run fast. One dep. No framework. Just Chromium. And don't even get started on Cypress (DO NOT USE THAT POS).

## FEATURES
- e2e tests that run in seconds, not minutes
- ONE dependency! 
- `node:test` + Puppeteer — one runner for unit and e2e
- designed for YOUR DSL — configure commands and asserts to match your style
- page object pattern, shared browser suites, auto-retry, screenshots on failure
- debug with env vars: `HEADLESS=0 SLOWMO=100`
- single file, zero config, no classes, no opinions
- CI ready out of the box

## Setup
1. `npm install puppeteer --save-dev` to install puppeteer in your project
1. Copy `testpup.js` into your project
1. Add to your `package.json` scripts:
```json
"test": "node --test --test-reporter spec 'test/**/*.test.js'",
"test:unit": "node --test --test-reporter spec 'test/unit/**/*.test.js'",
"test:e2e": "node --test --test-reporter spec 'test/e2e/**/*.test.js'",
"test:debug": "HEADLESS=0 SLOWMO=100 node --test --test-reporter spec 'test/e2e/**/*.test.js'",
"kill": "pkill -f chromium"
```
That's it. There's no step 4.

## Usage
```js
import { unit, e2e } from '../../testpup.js'

unit('my unit test', t => {
  t.is(1 + 1, 2)
  t.contains('hello world', 'hello')
})

e2e('my e2e test', async t => {
  await t.goto('https://example.com')
  t.is(await t.getText('h1'), 'Example Domain')
  t.ok(await t.exists('a'))
})
```

```bash
npm test           # all tests
npm run test:unit  # unit only
npm run test:e2e   # e2e only
npm run test:debug # headed + 100ms slowMo, e2e only
```

Tests live in `test/unit/` and `test/e2e/`. Files must match `*.test.js`.

## e2e Options

```js
e2e('my test', async t => { ... }, {
  retries: 2,       // retry attempts on failure (default: 2)
  retryDelay: 1000, // ms between retries (default: 1000)
  timeout: 10000,   // puppeteer default timeout (default: 10000)
  headless: true,   // run headless — or set HEADLESS=0 (default: true)
  slowMo: 0         // ms delay between actions — or set SLOWMO=<ms> (default: 0)
})
```

Failed tests save a screenshot to `test/errors/`. Leaked Chromium? `npm run kill`.

## Shared Browser (suites)

For flows that need a shared browser across multiple tests — login once, run many — use `launchBrowser` with `before`/`after`:

```js
import { before, after, unit, launchBrowser } from '../../testpup.js'

let t

before(async () => {
  t = await launchBrowser()
  // login, seed data, etc.
  await t.goto('/login')
  await t.type('#email', 'user@test.com')
  await t.waitAndClick('[type=submit]')
})

after(() => t.browser.close())

unit('dashboard loads', async () => {
  t.contains(await t.url(), '/dashboard')
})

unit('can see profile', async () => {
  await t.waitAndClick('#profile')
  t.ok(await t.exists('.profile-card'))
})
```

`t` is the full DSL — same as `e2e`, just browser-managed by you.

## Customize
`testpup.js` is meant to be edited. Add DSL methods to suit your needs, change defaults, make it yours.

## Page Objects

Keep tests readable by wrapping page interactions in plain functions:

```js
// test/e2e/pages/login.page.js
export const loginPage = (t) => ({
  goto: () => t.goto('/login'),
  login: async (email, password) => {
    await t.type('#email', email)
    await t.type('#password', password)
    await t.waitAndClick('[type=submit]')
  }
})
```

```js
// test/e2e/checkout.test.js
import { e2e as test } from '../../testpup.js'
import { loginPage } from './pages/login.page.js'
import { cartPage } from './pages/cart.page.js'
import { checkoutPage } from './pages/checkout.page.js'

test('checkout flow', async t => {
  const login = loginPage(t)
  const cart = cartPage(t)
  const checkout = checkoutPage(t)

  await login.goto()
  await login.login('user@test.com', 'password')
  await cart.addItem('widget')
  await checkout.complete()
})
```

Tests read like user flows. Implementation details stay in the pages.
