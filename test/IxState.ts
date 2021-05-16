import { constVoid, pipe } from 'fp-ts/function'
import * as State from 'fp-ts/State'

import { ixState as M } from '../src'
import { deepStrictEqual, double } from './util'

describe('IxState', () => {
  test('put', () => {
    deepStrictEqual(M.put(9)(8), [constVoid(), 9])
  })

  test('toState', () => {
    const state = M.of<number, number>(4)
    deepStrictEqual(pipe(state, M.toState)(42), state(42))
  })

  test('fromState', () => {
    const state = State.of<number, number>(4)
    deepStrictEqual(pipe(state, M.fromState)(42), state(42))
  })

  describe('do notation', () => {
    test('Do', () => {
      deepStrictEqual(M.Do()(4), [{}, 4])
    })

    test('ixDo', () => {
      deepStrictEqual(M.ixDo()(4), [{}, 4])
    })

    test('ixbind', () => {
      deepStrictEqual(
        pipe(
          M.Do(),
          M.ixbind('answer', () => M.of(42))
        )(constVoid()),
        [{ answer: 42 }, constVoid()]
      )
    })

    test('ixbindTo', () => {
      deepStrictEqual(pipe(M.of(42), M.ixbindTo('answer'))(constVoid()), [{ answer: 42 }, constVoid()])
    })

    test('bind', () => {
      deepStrictEqual(
        pipe(
          M.Do<number>(),
          M.bind('a', () => M.of(42)),
          M.bind('b', ({ a }) => M.of(a + 5))
        )(0),
        [{ a: 42, b: 47 }, 0]
      )
    })

    test('bindTo', () => {
      deepStrictEqual(pipe(M.of<number, number>(42), M.bindTo('answer'))(0), [{ answer: 42 }, 0])
    })
  })

  test('evaluate', () => {
    deepStrictEqual(pipe(M.of(42), M.evaluate(6)), 42)
  })

  test('execute', () => {
    deepStrictEqual(pipe(M.ixmodify(double), M.ixexecute(42)), 84)
  })

  test('get', () => {
    deepStrictEqual(M.get<number>()(42), [42, 42])
  })

  test('gets', () => {
    deepStrictEqual(M.gets<number, string>(String)(42), ['42', 42])
  })

  test('imodify', () => {
    deepStrictEqual(M.ixmodify(String)(42), [constVoid(), '42'])
  })

  test('map', () => {
    deepStrictEqual(pipe(M.of(4), M.map(double))(9), [8, 9])
  })
  test('ixmap', () => {
    deepStrictEqual(pipe(M.of(4), M.ixmap(double))(9), [8, 9])
  })

  test('flap', () => {
    deepStrictEqual(
      pipe(
        M.of((x: number) => `${x}`),
        M.flap(1)
      )(100),
      [`${1}`, 100]
    )
  })

  test('ixflap', () => {
    deepStrictEqual(
      pipe(
        M.of((x: number) => `${x}`),
        M.ixflap(1)
      )(100),
      [`${1}`, 100]
    )
  })

  test('ixchain', () => {
    deepStrictEqual(
      pipe(
        M.of<number, void>(constVoid()),
        M.ixchain(() => M.ixmodify<number, string>(String)),
        M.ixchain(() => M.ixmodify<string, Array<string>>((a) => a.split('')))
      )(42),
      [constVoid(), ['4', '2']]
    )
  })

  test('chain', () => {
    deepStrictEqual(
      pipe(
        M.of<number, number>(1),
        M.chain((x) => M.ixmodify((y) => x + y)),
        M.chain(() => M.ixmodify((y) => y - 2))
      )(42),
      [constVoid(), 41]
    )
  })

  test('ixchainFirst', () => {
    deepStrictEqual(
      pipe(
        M.of<number, string>('answer'),
        M.ixchainFirst(() => M.ixmodify(String))
      )(42),
      ['answer', '42']
    )
  })

  test('of', () => {
    deepStrictEqual(M.of<number, string>('The Answer')(42), ['The Answer', 42])
  })
  test('ixof', () => {
    deepStrictEqual(M.ixof<number, string>('The Answer')(42), ['The Answer', 42])
  })

  test('ixap', () => {
    deepStrictEqual(
      pipe(
        M.of<string, (a: number) => number>(double),
        M.ixap(
          pipe(
            M.of<string, number>(42),
            M.ixchainFirst(() => M.ixmodify((a) => a.split(', ')))
          )
        )
      )('Hello, World!'),
      [84, ['Hello', 'World!']]
    )
  })

  test('ap', () => {
    deepStrictEqual(
      pipe(
        M.of<string, (a: string) => string>((x) => x.concat(x)),
        M.ap(
          pipe(
            M.of<string, string>('42'),
            M.ixchainFirst(() => M.ixmodify((a) => a.replace(', ', '')))
          )
        )
      )('Hello, World!'),
      ['4242', 'HelloWorld!']
    )
  })

  test('ixapFirst', () => {
    deepStrictEqual(
      pipe(
        M.of<number, number>(4),
        M.ixapFirst(
          pipe(
            M.of<number, number>(2),
            M.ixchainFirst(() => M.ixmodify<number, string>(String))
          )
        )
      )(42),
      [4, '42']
    )
  })

  test('ixapSecond', () => {
    deepStrictEqual(
      pipe(
        M.of<number, number>(4),
        M.ixapSecond(
          pipe(
            M.of<number, number>(2),
            M.ixchainFirst(() => M.ixmodify<number, string>(String))
          )
        )
      )(42),
      [2, '42']
    )
  })

  test('apFirst', () => {
    deepStrictEqual(
      pipe(
        M.of<string, string>('Hello, World!'),
        M.apFirst(
          pipe(
            M.of<string, string>('42'),
            M.ixchainFirst(() => M.ixmodify((a) => a.replace(', ', '')))
          )
        )
      )('Hello, World!'),
      ['Hello, World!', 'HelloWorld!']
    )
  })

  test('apSecond', () => {
    deepStrictEqual(
      pipe(
        M.of<string, string>('Hello, World!'),
        M.apSecond(
          pipe(
            M.of<string, string>('42'),
            M.ixchainFirst(() => M.ixmodify((a) => a.replace(', ', '')))
          )
        )
      )('Hello, World!'),
      ['42', 'HelloWorld!']
    )
  })

  test('ixapS', () => {
    deepStrictEqual(pipe(M.Do(), M.ixapS('answer', M.of(42)))(constVoid()), [{ answer: 42 }, constVoid()])
  })

  test('local', () => {
    deepStrictEqual(
      pipe(
        M.of<number, void>(constVoid()),
        M.local<number, string>(Number),
        M.ixchain(() => M.ixmodify(double))
      )('42'),
      [constVoid(), 84]
    )
  })
})
