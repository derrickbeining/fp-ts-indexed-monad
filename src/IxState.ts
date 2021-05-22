/**
 * `IxState` (Indexed State) is a derivation of `State`, that may have **polymorphic** states;
 * The input may be of a different type than the output.
 *
 * State changes are kept track of by the generics `I`, `O`, `X` and `Z`.
 * - `I` indicates the current input state
 * - `O` indicates the current output state
 * - `X` indicates the next input state
 * - `Z` indicates the next output state
 *
 * When composing `IxState` where the indexes are polymorhpic, functions `ixchain` and `ixap` can be
 * used to compose `<I, O>` with `<O, Z>` to return `<I, Z>`.
 *
 * Intuitively this is function composition on the indexes.
 *
 * `IxState` is derived by applying the `Identity` monad to the transformer `IxStateT`.
 *
 * @since 2.10.0
 */

import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_ } from 'fp-ts/Apply'
import { bind as bind_, chainFirst as chainFirst_, Chain2 } from 'fp-ts/Chain'
import { bindTo as bindTo_, flap as flap_, Functor3 } from 'fp-ts/Functor'
import * as I from 'fp-ts/Identity'
import { Monad2 } from 'fp-ts/Monad'
import { Pointed2 } from 'fp-ts/Pointed'
import { State } from 'fp-ts/State'

import { IxApplicative3 } from './IxApplicative'
import { ixapFirst as ixapFirst_, IxApply3, ixapS as ixapS_, ixapSecond as ixapSecond_ } from './IxApply'
import { ixbind as ixbind_, IxChain3, ixchainFirst as ixchainFirst_, ixDo as ixDo_ } from './IxChain'
import { ixbindTo as ixbindTo_, ixflap as ixflap_, ixlet as ixlet_, IxFunctor3 } from './IxFunctor'
import { IxMonad3 } from './IxMonad'
import { IxPointed3 } from './IxPointed'
import * as IxStateT from './IxStateT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category Model
 * @since 2.10.0
 */
export interface IxState<I, O, A> {
  (i: I): [A, O]
}

/**
 * @category Model
 * @since 2.10.0
 */
export const URI = 'IxState'

/**
 * @category Model
 * @since 2.10.0
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  export interface URItoKind3<R, E, A> {
    readonly [URI]: IxState<R, E, A>
  }

  // Allows usage with `ap, `chain` and `of`: Isomorphic state.
  export interface URItoKind2<E, A> {
    readonly [URI]: IxState<E, E, A>
  }
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @summary
 * Apply a function to the state, polymorphically changing the resulting state.
 *
 * @category constructors
 * @since 2.10.0
 */
export const ixmodify: <I, O>(f: (i: I) => O) => IxState<I, O, void> =
  /*#__PURE__*/
  IxStateT.ixmodify(I.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const put: <I>(fi: I) => IxState<I, I, void> =
  /*#__PURE__*/
  IxStateT.put(I.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromState: <I, A>(fa: State<I, A>) => IxState<I, I, A> = IxStateT.fromStateF<I.URI>()

/**
 * @category constructors
 * @since 2.10.0
 */
export const get =
  /*#__PURE__*/
  IxStateT.get(I.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const gets =
  /*#__PURE__*/
  IxStateT.gets(I.Pointed)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const toState: <I, A>(fa: IxState<I, I, A>) => State<I, A> = IxStateT.toStateF<I.URI>()

/**
 * @category destructors
 * @since 2.10.0
 */
export const ixexecute =
  /*#__PURE__*/
  IxStateT.ixexecute(I.Functor)

/**
 * @category destructors
 * @since 2.10.0
 */
export const evaluate =
  /*#__PURE__*/
  IxStateT.evaluate(I.Functor)

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _ixof: IxPointed3<URI>['ixof'] = (a) => (i) => [a, i]
const _ixmap: <I, O, A, B>(fa: IxState<I, O, A>, f: (a: A) => B) => IxState<I, O, B> = (fa, f) => (i) => {
  const [a, o] = fa(i)
  return [f(a), o]
}
const _ixap: <I, O, Z, A, B>(fab: IxState<I, O, (a: A) => B>, fa: IxState<O, Z, A>) => IxState<I, Z, B> = (fab, fa) => (
  i
) => {
  const [f, o] = fab(i)
  const [a, z] = fa(o)
  return [f(a), z]
}
const _ixchain: <I, O, Z, A, B>(fa: IxState<I, O, A>, f: (a: A) => IxState<O, Z, B>) => IxState<I, Z, B> = (fa, f) => (
  i
) => {
  const [a, o] = fa(i)
  const [b, z] = f(a)(o)
  return [b, z]
}
const _of: Pointed2<URI>['of'] = _ixof
const _map: Functor3<URI>['map'] = _ixmap
const _ap: Apply2<URI>['ap'] = _ixap
const _chain: Chain2<URI>['chain'] = _ixchain

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const IxFunctor: IxFunctor3<URI> = {
  URI,
  ixmap: (f) => (fa) => _ixmap(fa, f),
}

/**
 * @category instances
 * @since 2.10.0
 */
export const IxApply: IxApply3<URI> = {
  URI,
  ixmap: IxFunctor.ixmap,
  ixap: (fa) => (fab) => _ixap(fab, fa),
}

/**
 * @category instances
 * @since 2.10.0
 */
export const IxChain: IxChain3<URI> = {
  URI,
  ixmap: IxFunctor.ixmap,
  ixap: IxApply.ixap,
  ixchain: (f) => (fa) => _ixchain(fa, f),
}

/**
 * @category instances
 * @since 2.10.0
 */
export const IxPointed: IxPointed3<URI> = {
  URI,
  ixof: _ixof,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const IxApplicative: IxApplicative3<URI> = {
  URI,
  ixof: IxPointed.ixof,
  ixmap: IxFunctor.ixmap,
  ixap: IxApply.ixap,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const IxMonad: IxMonad3<URI> = {
  URI,
  ixof: IxPointed.ixof,
  ixmap: IxFunctor.ixmap,
  ixap: IxApply.ixap,
  ixchain: IxChain.ixchain,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = { URI, of: _of }

/**
 * @category instances
 * @since 2.10.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: _ixmap,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain,
}
/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad2<URI> = {
  URI,
  of: _of,
  map: _map,
  ap: _ap,
  chain: _chain,
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category IxPointed
 * @since 2.10.0
 */
export const ixof = _ixof

/**
 * @category IxFunctor
 * @since 2.10.0
 */
export const ixmap =
  /*#__PURE__*/
  IxStateT.ixmap(I.Functor)

/**
 * @category IxFunctor
 * @since 2.10.0
 */
export const ixflap =
  /*#__PURE__*/
  ixflap_(IxFunctor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category IxApply
 * @since 2.10.0
 */
export const ixap =
  /*#__PURE__*/
  IxStateT.ixap(I.Chain)

/**
 * @category IxApply
 *
 * @since 2.10.0
 */
export const ixapFirst =
  /*#__PURE__*/
  ixapFirst_(IxApply)

/**
 * @category IxApply
 * @since 2.10.0
 */
export const ixapSecond =
  /*#__PURE__*/
  ixapSecond_(IxApply)

/**
 * @category Apply
 *
 * @since 2.10.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * @category Apply
 * @since 2.10.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category IxChain
 *
 * @since 2.10.0
 */
export const ixchain =
  /*#__PURE__*/
  IxStateT.ixchain(I.Chain)

/**
 * @category IxChain
 * @since 2.10.0
 */
export const ixchainFirst =
  /*#__PURE__*/
  ixchainFirst_(IxChain)

/**
 * @category Chain
 * @since 2.10.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category Pointed
 * @since 2.10.0
 */
export const of: Pointed2<URI>['of'] =
  /*#__PURE__*/
  IxStateT.of(I.Pointed)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map =
  /*#__PURE__*/
  IxStateT.map(I.Functor)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 *
 * @category Apply
 * @since 2.10.0
 */
export const ap =
  /*#__PURE__*/
  IxStateT.ap(I.Chain)

/**
 *
 * @category Chain
 * @since 2.10.0
 */
export const chain =
  /*#__PURE__*/
  IxStateT.chain(I.Chain)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 2.10.0
 */
export const local = IxStateT.local<I.URI>()

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
export const ixDo =
  /*#__PURE__*/
  ixDo_(Pointed)

/**
 * @since 2.10.0
 */
export const Do = ixDo

/**
 * @since 2.10.2
 */
export const ixlet =
  /*#__PURE__*/
  ixlet_(IxFunctor)

/**
 * @since 2.10.2
 */
export const let_ = ixlet

export {
  /**
   * @since 2.10.2
   */
  let_ as let,
}

/**
 * @since 2.10.0
 */
export const ixbind =
  /*#__PURE__*/
  ixbind_(IxChain)

/**
 * @since 2.10.0
 */
export const ixbindTo =
  /*#__PURE__*/
  ixbindTo_(IxFunctor)

/**
 * @since 2.10.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * @since 2.10.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * ixDo-notation combinator for discarding the result of a computation rather
 * than binding it to a name. It is simply an alias for `ixchainFirst`
 * @since 2.10.0
 */
export const ixdiscard = ixchainFirst

/**
 * Do-notation combinator for discarding the result of a computation rather
 * than binding it to a name. It is simply an alias for `chainFirst`
 * @since 2.10.0
 */
export const discard = chainFirst

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const ixapS =
  /*#__PURE__*/
  ixapS_(IxApply)

/**
 * @since 2.10.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)
