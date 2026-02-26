import { e2e as test } from '../../testpup.js'

// yes... the tests are dumb but also act as unit tests...
test('puppeteerDsl - full coverage', async t => {
  await t.goto('https://example.com')
  t.is(await t.url(), 'https://example.com/')
  t.ok(await t.exists('h1'))
  t.is(await t.getText('h1'), 'Example Domain')
  t.is(await t.count('p'), 2)

  const title = await t.eval(() => document.title)
  t.is(title, 'Example Domain')

  await t.wait(10)
  await t.waitFor('a')
  t.falsy(await t.hasClass('body', 'foo'))

  // interaction
  const nav = t.waitForNav()
  await t.waitAndClick('a')
  await nav
  t.contains(await t.url(), 'iana.org')
})
