import { e2e as test } from '../../testpup.js'
import { examplePage } from './pages/example.page.js'

test('page object - clickMore', async t => {
  const example = examplePage(t)
  await example.goto('https://example.com')
  await example.clickMore()
  t.contains(await t.url(), 'iana.org')
})
