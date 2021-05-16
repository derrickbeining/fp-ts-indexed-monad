/**
 * @since 2.10.0
 */
import { Kind3, Kind4, URIS3, URIS4 } from 'fp-ts/HKT'
import { pipe } from 'fp-ts/lib/function'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxFunctor3<F extends URIS3> {
  readonly URI: F
  readonly ixmap: <A, B>(f: (a: A) => B) => <I, O>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, B>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxFunctor4<F extends URIS4> {
  readonly URI: F
  readonly ixmap: <A, B>(f: (a: A) => B) => <I, O, E>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export function ixflap<F extends URIS4>(
  F: IxFunctor4<F>
): <A>(a: A) => <I, O, E, B>(fab: Kind4<F, I, O, E, (a: A) => B>) => Kind4<F, I, O, E, B>
export function ixflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B>
export function ixflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B> {
  return (a) => (fab) =>
    pipe(
      fab,
      F.ixmap((f) => f(a))
    )
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function ixbindTo<F extends URIS4>(
  F: IxFunctor4<F>
): <N extends string>(name: N) => <I, O, E, A>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in N]: A }>
export function ixbindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }>
export function ixbindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }> {
  return (name) => (fa) =>
    pipe(
      fa,
      F.ixmap((a) => ({ [name]: a } as any))
    )
}
