import { e2e as test } from '../../testpup.js'
test('e2e: goto + url', async t => {
  await t.goto('https://example.com')
  t.is(await t.url(), 'https://example.com/')
  await t.waitFor('h1')
  t.pass()
})
