import { e2e as test } from '../../testpup.js'
test('e2e: evaluate javascript in the browser', async t => {
  await t.goto('https://example.com')
  const title = await t.eval(() => document.title)
  t.is(title, 'Example Domain')
})
