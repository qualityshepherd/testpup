import { e2e as test } from '../../testpup.js'
import { examplePage } from './pages/example.page.js'

test('should use page object pattern', async t => {
  const example = examplePage(t)
  await example.goto('https://example.com')
  t.is(await example.getTitle(), 'Example Domain')
  t.is(await example.getHeading(), 'Example Domain')

  await example.clickMore()
  t.contains(await t.url(), 'iana.org')
})
