/**
 * @since 2.10.0
 */
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from 'fp-ts/HKT'
import { pipe } from 'fp-ts/lib/function'
import { Pointed, Pointed2, Pointed3, Pointed4 } from 'fp-ts/lib/Pointed'

import { IxApply3, IxApply4 } from './IxApply'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxChain3<F extends URIS3> extends IxApply3<F> {
  readonly ixchain: <A, B, O, Z>(f: (a: A) => Kind3<F, O, Z, B>) => <I>(fa: Kind3<F, I, O, A>) => Kind3<F, I, Z, B>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxChain4<F extends URIS4> extends IxApply4<F> {
  readonly ixchain: <O, Z, E, A, B>(
    f: (a: A) => Kind4<F, O, Z, E, B>
  ) => <I>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export function ixchainFirst<M extends URIS4>(
  M: IxChain4<M>
): <I, O, Z, E, A, B>(f: (a: A) => Kind4<M, O, Z, E, B>) => (first: Kind4<M, I, O, E, A>) => Kind4<M, I, Z, E, A>
export function ixchainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A>
export function ixchainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A> {
  return (f) => (first) =>
    pipe(
      first,
      M.ixchain((a) =>
        pipe(
          f(a),
          M.ixmap(() => a)
        )
      )
    )
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function ixDo<F extends URIS4>(F: Pointed4<F>): <I, R, E>() => Kind4<F, I, R, E, {}>
export function ixDo<F extends URIS3>(F: Pointed3<F>): <I, E>() => Kind3<F, I, E, {}>
export function ixDo<F extends URIS2>(F: Pointed2<F>): <I>() => Kind2<F, I, {}>
export function ixDo<F>(F: Pointed<F>): <I>() => HKT2<F, I, {}>
export function ixDo<F>(F: Pointed<F>) {
  return <I>(): HKT2<F, I, {}> => F.of({}) as HKT2<F, I, {}>
}

/**
 * @since 2.10.0
 */
export function ixbind<M extends URIS4>(
  M: IxChain4<M>
): <N extends string, A, Second, Third, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, Second, Third, E, B>
) => <First>(
  ma: Kind4<M, First, Second, E, A>
) => Kind4<M, First, Third, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ixbind<M extends URIS3>(
  M: IxChain3<M>
): <N extends string, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, Second, Third, B>
) => <First>(
  ma: Kind3<M, First, Second, A>
) => Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ixbind<M extends URIS3>(M: IxChain3<M>) {
  return <N extends string, A, Second, Third, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind3<M, Second, Third, B>
  ) => <First>(
    ma: Kind3<M, First, Second, A>
  ): Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =>
    pipe(
      ma,
      M.ixchain((a) =>
        pipe(
          f(a),
          M.ixmap((b) => Object.assign({}, a, { [name]: b }) as { [K in keyof A | N]: K extends keyof A ? A[K] : B })
        )
      )
    )
}
