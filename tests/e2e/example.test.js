import { e2e as test } from '../../testpup.js'

// yes, these are dumb... but they're unit testing our DSL...
// And slow-ish (NINE SECONDS) because node:test runs --test-concurrency
// at the FILE level... which is correct.
test('goto + url', async t => {
  await t.goto('https://example.com')
  t.is(await t.url(), 'https://example.com/')
})

test('exists', async t => {
  await t.goto('https://example.com')
  t.ok(await t.exists('h1'))
})

test('getText', async t => {
  await t.goto('https://example.com')
  t.is(await t.getText('h1'), 'Example Domain')
})

test('count', async t => {
  await t.goto('https://example.com')
  t.is(await t.count('p'), 2)
})

test('eval', async t => {
  await t.goto('https://example.com')
  t.is(await t.eval(() => document.title), 'Example Domain')
})

test('wait', async t => {
  await t.goto('https://example.com')
  await t.wait(10)
  t.pass()
})

test('waitFor', async t => {
  await t.goto('https://example.com')
  await t.waitFor('a')
  t.pass()
})

test('hasClass', async t => {
  await t.goto('https://example.com')
  t.falsy(await t.hasClass('body', 'foo'))
})

test('waitAndClick + waitForNav', async t => {
  await t.goto('https://example.com')
  const nav = t.waitForNav()
  await t.waitAndClick('a')
  await nav
  t.contains(await t.url(), 'iana.org')
})
