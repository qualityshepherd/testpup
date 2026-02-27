import { e2e as test } from '../../testpup.js'
import { examplePage } from './pages/example.page.js'

test('page object - title + heading', async t => {
  const example = examplePage(t)
  await example.goto('https://example.com')
  t.is(await example.getTitle(), 'Example Domain')
  t.is(await example.getHeading(), 'Example Domain')
})
