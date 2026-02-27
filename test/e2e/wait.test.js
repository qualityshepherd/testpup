import { e2e as test } from '../../testpup.js'
test('e2e: wait a set amount of time', async t => {
  await t.goto('https://example.com')
  await t.wait(420)
  t.pass()
})
