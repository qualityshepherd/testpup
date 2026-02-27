import { e2e as test } from '../../testpup.js'
test('e2e: waitFor', async t => {
  await t.goto('https://example.com')
  await t.waitFor('h1')
  t.pass()
})
