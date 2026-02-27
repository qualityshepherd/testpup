import { e2e as test } from '../../testpup.js'
test('e2e: get text content of an element', async t => {
  await t.goto('https://example.com')
  const text = await t.getText('h1')
  t.is(text, 'Example Domain')
})
