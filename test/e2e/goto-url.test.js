import { e2e as test } from '../../testpup.js'
test('e2e: navigate to a url and verify the address', async t => {
  await t.goto('https://example.com')
  t.is(await t.url(), 'https://example.com/')
  await t.waitFor('h1')
  t.pass()
})
