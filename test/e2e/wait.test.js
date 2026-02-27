import { e2e as test } from '../../testpup.js'
test('e2e: wait', async t => {
  await t.goto('https://example.com')
  await t.wait(10)
  t.pass()
})
