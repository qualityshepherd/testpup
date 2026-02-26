import { unit as test } from '../../testpup.js'

test('is', t => t.is(1, 1))
test('not', t => t.not(1, 2))
test('deepEqual', t => t.deepEqual({ a: 1 }, { a: 1 }))
test('ok', t => t.ok(true))
test('falsy', t => t.falsy(''))
test('match', t => t.match('testpup', /pup/))
test('contains', t => t.contains('hello world', 'hello'))
test('throws', t => t.throws(() => { throw new Error('!') }))
test('pass', t => t.pass())
test('throwsAsync', async t => {
  await t.throwsAsync(Promise.reject(new Error('!')))
})
