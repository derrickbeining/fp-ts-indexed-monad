/**
 * When applying module augmentation when creating types,
 * ensure that there are 2 declarations.
 *
 * See `IxState` for more details.
 *
 *
 * @since 2.10.0
 * @todo chain2, ap2
 *
 */
import { Chain, Chain1, Chain2 } from 'fp-ts/Chain'
import { constVoid, pipe } from 'fp-ts/function'
import { Functor, Functor1, Functor2 } from 'fp-ts/Functor'
import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Pointed, Pointed1, Pointed2 } from 'fp-ts/Pointed'
import { StateT, StateT1, StateT2 } from 'fp-ts/StateT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export interface IxStateT<F, R, E, A> {
  (i: R): HKT<F, [A, E]>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface IxStateT1<F extends URIS, R, E, A> {
  (i: R): Kind<F, [A, E]>
}

/**
 * @category model
 * @since 2.10.0
 */
export interface IxStateT2<F extends URIS2, S, R, E, A> {
  (i: S): Kind2<F, E, [A, R]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export function put<F extends URIS2>(F: Pointed2<F>): <I, E>(i: I) => IxStateT2<F, I, I, E, void>
export function put<F extends URIS>(F: Pointed1<F>): <I>(i: I) => IxStateT1<F, I, I, void>
export function put<F>(F: Pointed<F>): <I>(i: I) => IxStateT<F, I, I, void>
export function put<F>(F: Pointed<F>): <I>(i: I) => IxStateT<F, I, I, void> {
  return (i) => () => F.of([constVoid(), i])
}

/**
 * @summary
 * Apply a function to the state, polymorphically changing the resulting state.
 *
 * @category constructors
 * @since 2.10.0
 */
export function ixmodify<F extends URIS2>(F: Pointed2<F>): <S, R, E>(f: (i: S) => R) => IxStateT2<F, S, R, E, void>
export function ixmodify<F extends URIS>(F: Pointed1<F>): <R, E>(f: (i: R) => E) => IxStateT1<F, R, E, void>
export function ixmodify<F>(F: Pointed<F>): <R, E>(f: (i: R) => E) => IxStateT<F, R, E, void>
export function ixmodify<F>(F: Pointed<F>): <R, E>(f: (i: R) => E) => IxStateT<F, R, E, void> {
  return (f) => (i) => F.of([constVoid(), f(i)])
}

/**
 * @category constructors
 * @since 2.10.0
 */
export function get<F extends URIS2>(F: Pointed2<F>): <I, E>() => IxStateT2<F, I, I, E, I>
export function get<F extends URIS>(F: Pointed1<F>): <I>() => IxStateT1<F, I, I, I>
export function get<F>(F: Pointed<F>): <I>() => IxStateT<F, I, I, I>
export function get<F>(F: Pointed<F>): <I>() => IxStateT<F, I, I, I> {
  return () => (i) => F.of([i, i])
}

/**
 * @category constructors
 * @since 2.10.0
 */
export function gets<F extends URIS2>(F: Pointed2<F>): <I, E, A>(f: (i: I) => A) => IxStateT2<F, I, I, E, A>
export function gets<F extends URIS>(F: Pointed1<F>): <I, A>(f: (i: I) => A) => IxStateT1<F, I, I, A>
export function gets<F>(F: Pointed<F>): <I, A>(f: (i: I) => A) => IxStateT<F, I, I, A>
export function gets<F>(F: Pointed<F>): <I, A>(f: (i: I) => A) => IxStateT<F, I, I, A> {
  return (f) => (i) => F.of([f(i), i])
}

/**
 * @category constructors
 * @since 2.10.0
 */
export function fromStateF<F extends URIS2>(): <S, E, A>(fa: StateT2<F, S, E, A>) => IxStateT2<F, S, S, E, A>
export function fromStateF<F extends URIS>(): <S, A>(fa: StateT1<F, S, A>) => IxStateT1<F, S, S, A>
export function fromStateF<F>(): <R, A>(fa: StateT<F, R, A>) => IxStateT<F, R, R, A>
export function fromStateF<F>(): <R, A>(fa: StateT<F, R, A>) => IxStateT<F, R, R, A> {
  return (fa) => fa
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export function toStateF<F extends URIS2>(): <R, E, A>(fa: IxStateT2<F, R, R, E, A>) => StateT2<F, R, E, A>
export function toStateF<F extends URIS>(): <E, A>(fa: IxStateT1<F, E, E, A>) => StateT1<F, E, A>
export function toStateF<F>(): <E, A>(fa: IxStateT<F, E, E, A>) => StateT<F, E, A>
export function toStateF<F>(): <E, A>(fa: IxStateT<F, E, E, A>) => StateT<F, E, A> {
  return (fa) => fa
}

/**
 * @category destructors
 * @since 2.10.0
 */
export function ixexecute<F extends URIS2>(
  F: Functor2<F>
): <I, E>(i: I) => <O, A>(fa: IxStateT2<F, I, O, E, A>) => Kind2<F, E, O>
export function ixexecute<F extends URIS>(F: Functor1<F>): <I>(i: I) => <O, A>(fa: IxStateT1<F, I, O, A>) => Kind<F, O>
export function ixexecute<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, O>
export function ixexecute<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, O> {
  return (i) => (fa) => F.map(fa(i), (ao) => ao[1])
}

/**
 * @category destructors
 * @since 2.10.0
 */
export function evaluate<F extends URIS2>(
  F: Functor2<F>
): <I>(i: I) => <O, E, A>(fa: IxStateT2<F, I, O, E, A>) => Kind2<F, E, A>
export function evaluate<F extends URIS>(F: Functor1<F>): <I>(i: I) => <O, A>(fa: IxStateT1<F, I, O, A>) => Kind<F, A>
export function evaluate<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, A>
export function evaluate<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, A> {
  return (i) => (fa) => F.map(fa(i), (ao) => ao[0])
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category IxPointed
 * @since 2.10.0
 */
export function ixof<F extends URIS2>(F: Pointed2<F>): <S, E, A>(a: A) => IxStateT2<F, S, S, E, A>
export function ixof<F extends URIS>(F: Pointed1<F>): <S, A>(a: A) => IxStateT1<F, S, S, A>
export function ixof<F>(F: Pointed<F>): <S, A>(a: A) => IxStateT<F, S, S, A>
export function ixof<F>(F: Pointed<F>): <I, A>(a: A) => IxStateT<F, I, I, A> {
  return (a) => (i) => F.of([a, i])
}
/**
 * @category Pointed
 * @since 2.10.0
 */
export const of = ixof

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category IxFunctor
 * @since 2.10.0
 */
export function ixmap<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <I, O, E>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, I, O, E, B>
export function ixmap<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <I, O>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, I, O, B>
export function ixmap<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <I, O>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, O, B>
export function ixmap<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <I, O>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, O, B> {
  return (f) => (fa) => (i) => F.map(fa(i), ([a, o]) => [f(a), o])
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map = ixmap

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category IxApply
 * @since 2.10.0
 */
export function ixap<F extends URIS2>(
  F: Chain2<F>
): <O, Z, E, A>(
  fa: IxStateT2<F, O, Z, E, A>
) => <I, B>(fab: IxStateT2<F, I, O, E, (a: A) => B>) => IxStateT2<F, I, Z, E, B>
export function ixap<F extends URIS>(
  F: Chain1<F>
): <O, Z, A>(fa: IxStateT1<F, O, Z, A>) => <I, B>(fab: IxStateT1<F, I, O, (a: A) => B>) => IxStateT1<F, I, Z, B>
export function ixap<F>(
  F: Chain<F>
): <O, Z, A>(fa: IxStateT<F, O, Z, A>) => <I, B>(fab: IxStateT<F, I, O, (a: A) => B>) => IxStateT<F, I, Z, B>
export function ixap<F>(
  F: Chain<F>
): <O, Z, A>(fa: IxStateT<F, O, Z, A>) => <I, B>(fab: IxStateT<F, I, O, (a: A) => B>) => IxStateT<F, I, Z, B> {
  return (fa) => (fab) =>
    pipe(
      fab,
      ixchain(F)((f) => map(F)(f)(fa))
    )
}

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.10.0
 */
export function ap<F extends URIS2>(
  F: Chain2<F>
): <I, E, A>(fa: IxStateT2<F, I, I, E, A>) => <B>(fab: IxStateT2<F, I, I, E, (a: A) => B>) => IxStateT2<F, I, I, E, B>
export function ap<F extends URIS>(
  F: Chain1<F>
): <I, A>(fa: IxStateT1<F, I, I, A>) => <B>(fab: IxStateT1<F, I, I, (a: A) => B>) => IxStateT1<F, I, I, B>
export function ap<F>(
  F: Chain<F>
): <I, A>(fa: IxStateT<F, I, I, A>) => <B>(fab: IxStateT<F, I, I, (a: A) => B>) => IxStateT<F, I, I, B>
export function ap<F>(
  F: Chain<F>
): <O, Z, A>(fa: IxStateT<F, O, Z, A>) => <I, B>(fab: IxStateT<F, I, O, (a: A) => B>) => IxStateT<F, I, Z, B> {
  return (fa) => (fab) =>
    pipe(
      fab,
      ixchain(F)((f) => map(F)(f)(fa))
    )
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category IxChain
 * @since 2.10.0
 */
export function ixchain<F extends URIS2>(
  F: Chain2<F>
): <O, Z, E, A, B>(
  f: (a: A) => IxStateT2<F, O, Z, E, B>
) => <I>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, I, Z, E, B>
export function ixchain<F extends URIS>(
  F: Chain1<F>
): <O, Z, A, B>(f: (a: A) => IxStateT1<F, O, Z, B>) => <I>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, I, Z, B>
export function ixchain<F>(
  F: Chain<F>
): <O, Z, A, B>(f: (a: A) => IxStateT<F, O, Z, B>) => <I>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, Z, B>
export function ixchain<F>(
  F: Chain<F>
): <O, Z, A, B>(f: (a: A) => IxStateT<F, O, Z, B>) => <I>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, Z, B> {
  return (f) => (fa) => (i) => F.chain(fa(i), ([a, o]) => f(a)(o))
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 2.10.0
 */
export function chain<F extends URIS2>(
  F: Chain2<F>
): <I, E, A, B>(f: (a: A) => IxStateT2<F, I, I, E, B>) => (fa: IxStateT2<F, I, I, E, A>) => IxStateT2<F, I, I, E, B>
export function chain<F extends URIS>(
  F: Chain1<F>
): <I, A, B>(f: (a: A) => IxStateT1<F, I, I, B>) => (fa: IxStateT1<F, I, I, A>) => IxStateT1<F, I, I, B>
export function chain<F>(
  F: Chain<F>
): <I, A, B>(f: (a: A) => IxStateT<F, I, I, B>) => (fa: IxStateT<F, I, I, A>) => IxStateT<F, I, I, B>
export function chain<F>(
  F: Chain<F>
): <I, A, B>(f: (a: A) => IxStateT<F, I, I, B>) => (fa: IxStateT<F, I, I, A>) => IxStateT<F, I, I, B> {
  return (f) => (fa) => (i) => F.chain(fa(i), ([a, o]) => f(a)(o))
}

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.10.0
 */
export function local<F extends URIS2>(): <I, X>(
  f: (x: X) => I
) => <O, E, A>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, X, O, E, A>
export function local<F extends URIS>(): <I, X>(
  f: (x: X) => I
) => <O, A>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, X, O, A>
export function local<F>(): <I, X>(f: (x: X) => I) => <O, A>(fa: IxStateT<F, I, O, A>) => IxStateT<F, X, O, A>
export function local<F>(): <I, X>(f: (x: X) => I) => <O, A>(fa: IxStateT<F, I, O, A>) => IxStateT<F, X, O, A> {
  return (f) => (fa) => (x) => fa(f(x))
}
