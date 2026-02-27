import { before, e2e as test } from '../../testpup.js'

// The triple threat: use the API to create/setup data, then verify in the UI
// e2e tests aren't just for clicking buttons — they're a full API client too

let post

before(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  post = await res.json()
})

test('e2e: api to ui', async t => {
  await t.goto(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
  t.ok(await t.exists('body'))
  t.contains(await t.url(), `/${post.id}`)
})
