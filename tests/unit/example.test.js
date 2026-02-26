import { unit as test } from '../../testpup.js'

test('assertDsl - basic coverage', t => {
  t.is(1, 1)
  t.not(1, 2)
  t.deepEqual({ a: 1 }, { a: 1 })
  t.ok(true)
  t.falsy('')
  t.match('testpup', /pup/)
  t.contains('hello world', 'hello')
  t.throws(() => { throw new Error('!') })
  t.pass()
})

test('assertDsl - async', async t => {
  await t.throwsAsync(Promise.reject(new Error('!')))
})
