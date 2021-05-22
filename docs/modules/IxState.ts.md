---
title: IxState.ts
nav_order: 8
parent: Modules
---

## IxState overview

`IxState` (Indexed State) is a derivation of `State`, that may have **polymorphic** states;
The input may be of a different type than the output.

State changes are kept track of by the generics `I`, `O`, `X` and `Z`.

- `I` indicates the current input state
- `O` indicates the current output state
- `X` indicates the next input state
- `Z` indicates the next output state

When composing `IxState` where the indexes are polymorhpic, functions `ixchain` and `ixap` can be
used to compose `<I, O>` with `<O, Z>` to return `<I, Z>`.

Intuitively this is function composition on the indexes.

`IxState` is derived by applying the `Identity` monad to the transformer `IxStateT`.

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Chain](#chain)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
- [Functor](#functor)
  - [flap](#flap)
  - [map](#map)
- [IxApply](#ixapply)
  - [ixap](#ixap)
  - [ixapFirst](#ixapfirst)
  - [ixapSecond](#ixapsecond)
- [IxChain](#ixchain)
  - [ixchain](#ixchain)
  - [ixchainFirst](#ixchainfirst)
- [IxFunctor](#ixfunctor)
  - [ixflap](#ixflap)
  - [ixmap](#ixmap)
- [IxPointed](#ixpointed)
  - [ixof](#ixof)
- [Model](#model)
  - [IxState (interface)](#ixstate-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [local](#local)
- [constructors](#constructors)
  - [fromState](#fromstate)
  - [get](#get)
  - [gets](#gets)
  - [ixmodify](#ixmodify)
  - [put](#put)
- [destructors](#destructors)
  - [evaluate](#evaluate)
  - [ixexecute](#ixexecute)
  - [toState](#tostate)
- [instances](#instances)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [Functor](#functor-1)
  - [IxApplicative](#ixapplicative)
  - [IxApply](#ixapply-1)
  - [IxChain](#ixchain-1)
  - [IxFunctor](#ixfunctor-1)
  - [IxMonad](#ixmonad)
  - [IxPointed](#ixpointed-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [discard](#discard)
  - [ixDo](#ixdo)
  - [ixapS](#ixaps)
  - [ixbind](#ixbind)
  - [ixbindTo](#ixbindto)
  - [ixdiscard](#ixdiscard)
  - [ixlet](#ixlet)
  - [let](#let)
  - [let\_](#let_)

---

# Apply

## ap

**Signature**

```ts
export declare const ap: <I, A>(
  fa: IxStateT.IxStateT1<'Identity', I, I, A>
) => <B>(fab: IxStateT.IxStateT1<'Identity', I, I, (a: A) => B>) => IxStateT.IxStateT1<'Identity', I, I, B>
```

Added in v2.10.0

## apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(second: IxState<E, E, B>) => <A>(first: IxState<E, E, A>) => IxState<E, E, A>
```

Added in v2.10.0

## apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(second: IxState<E, E, B>) => <A>(first: IxState<E, E, A>) => IxState<E, E, B>
```

Added in v2.10.0

# Chain

## chain

**Signature**

```ts
export declare const chain: <I, A, B>(
  f: (a: A) => IxStateT.IxStateT1<'Identity', I, I, B>
) => (fa: IxStateT.IxStateT1<'Identity', I, I, A>) => IxStateT.IxStateT1<'Identity', I, I, B>
```

Added in v2.10.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, E, B>(
  f: (a: A) => IxState<E, E, B>
) => (first: IxState<E, E, A>) => IxState<E, E, A>
```

Added in v2.10.0

# Functor

## flap

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: IxState<R, E, (a: A) => B>) => IxState<R, E, B>
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <I, O>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => IxStateT.IxStateT1<'Identity', I, O, B>
```

Added in v2.10.0

# IxApply

## ixap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ixap: <O, Z, A>(
  fa: IxStateT.IxStateT1<'Identity', O, Z, A>
) => <I, B>(fab: IxStateT.IxStateT1<'Identity', I, O, (a: A) => B>) => IxStateT.IxStateT1<'Identity', I, Z, B>
```

Added in v2.10.0

## ixapFirst

**Signature**

```ts
export declare const ixapFirst: <O, Z, B>(
  second: IxState<O, Z, B>
) => <I, A>(first: IxState<I, O, A>) => IxState<I, Z, A>
```

Added in v2.10.0

## ixapSecond

**Signature**

```ts
export declare const ixapSecond: <I, O, Z, A, B>(
  second: IxState<O, Z, B>
) => (first: IxState<I, O, A>) => IxState<I, Z, B>
```

Added in v2.10.0

# IxChain

## ixchain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const ixchain: <O, Z, A, B>(
  f: (a: A) => IxStateT.IxStateT1<'Identity', O, Z, B>
) => <I>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => IxStateT.IxStateT1<'Identity', I, Z, B>
```

Added in v2.10.0

## ixchainFirst

**Signature**

```ts
export declare const ixchainFirst: <I, O, Z, A, B>(
  f: (a: A) => IxState<O, Z, B>
) => (first: IxState<I, O, A>) => IxState<I, Z, A>
```

Added in v2.10.0

# IxFunctor

## ixflap

**Signature**

```ts
export declare const ixflap: <A>(a: A) => <I, O, B>(fab: IxState<I, O, (a: A) => B>) => IxState<I, O, B>
```

Added in v2.10.0

## ixmap

**Signature**

```ts
export declare const ixmap: <A, B>(
  f: (a: A) => B
) => <I, O>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => IxStateT.IxStateT1<'Identity', I, O, B>
```

Added in v2.10.0

# IxPointed

## ixof

**Signature**

```ts
export declare const ixof: <I, A>(a: A) => IxState<I, I, A>
```

Added in v2.10.0

# Model

## IxState (interface)

**Signature**

```ts
export interface IxState<I, O, A> {
  (i: I): [A, O]
}
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'IxState'
```

Added in v2.10.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.10.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => IxState<E, E, A>
```

Added in v2.10.0

# combinators

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <I, X>(
  f: (x: X) => I
) => <O, A>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => IxStateT.IxStateT1<'Identity', X, O, A>
```

Added in v2.10.0

# constructors

## fromState

**Signature**

```ts
export declare const fromState: <I, A>(fa: State<I, A>) => IxState<I, I, A>
```

Added in v2.10.0

## get

**Signature**

```ts
export declare const get: <I>() => IxStateT.IxStateT1<'Identity', I, I, I>
```

Added in v2.10.0

## gets

**Signature**

```ts
export declare const gets: <I, A>(f: (i: I) => A) => IxStateT.IxStateT1<'Identity', I, I, A>
```

Added in v2.10.0

## ixmodify

**Signature**

```ts
export declare const ixmodify: <I, O>(f: (i: I) => O) => IxState<I, O, void>
```

Added in v2.10.0

## put

**Signature**

```ts
export declare const put: <I>(fi: I) => IxState<I, I, void>
```

Added in v2.10.0

# destructors

## evaluate

**Signature**

```ts
export declare const evaluate: <I>(i: I) => <O, A>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => A
```

Added in v2.10.0

## ixexecute

**Signature**

```ts
export declare const ixexecute: <I>(i: I) => <O, A>(fa: IxStateT.IxStateT1<'Identity', I, O, A>) => O
```

Added in v2.10.0

## toState

**Signature**

```ts
export declare const toState: <I, A>(fa: IxState<I, I, A>) => State<I, A>
```

Added in v2.10.0

# instances

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'IxState'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'IxState'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'IxState'>
```

Added in v2.10.0

## IxApplicative

**Signature**

```ts
export declare const IxApplicative: IxApplicative3<'IxState'>
```

Added in v2.10.0

## IxApply

**Signature**

```ts
export declare const IxApply: IxApply3<'IxState'>
```

Added in v2.10.0

## IxChain

**Signature**

```ts
export declare const IxChain: IxChain3<'IxState'>
```

Added in v2.10.0

## IxFunctor

**Signature**

```ts
export declare const IxFunctor: IxFunctor3<'IxState'>
```

Added in v2.10.0

## IxMonad

**Signature**

```ts
export declare const IxMonad: IxMonad3<'IxState'>
```

Added in v2.10.0

## IxPointed

**Signature**

```ts
export declare const IxPointed: IxPointed3<'IxState'>
```

Added in v2.10.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'IxState'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'IxState'>
```

Added in v2.10.0

# utils

## Do

**Signature**

```ts
export declare const Do: <I>() => IxState<I, I, {}>
```

Added in v2.10.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: IxState<E, E, B>
) => (fa: IxState<E, E, A>) => IxState<E, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IxState<E, E, B>
) => (ma: IxState<E, E, A>) => IxState<E, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <R, E, A>(fa: IxState<R, E, A>) => IxState<R, E, { readonly [K in N]: A }>
```

Added in v2.10.0

## discard

Do-notation combinator for discarding the result of a computation rather
than binding it to a name. It is simply an alias for `chainFirst`

**Signature**

```ts
export declare const discard: <A, E, B>(f: (a: A) => IxState<E, E, B>) => (first: IxState<E, E, A>) => IxState<E, E, A>
```

Added in v2.10.0

## ixDo

**Signature**

```ts
export declare const ixDo: <I>() => IxState<I, I, {}>
```

Added in v2.10.0

## ixapS

**Signature**

```ts
export declare const ixapS: <N, A, O, S, B>(
  name: Exclude<N, keyof A>,
  fb: IxState<O, S, B>
) => <First, O>(fa: IxState<First, O, A>) => IxState<First, S, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## ixbind

**Signature**

```ts
export declare const ixbind: <N, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IxState<Second, Third, B>
) => <First>(
  ma: IxState<First, Second, A>
) => IxState<First, Third, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0

## ixbindTo

**Signature**

```ts
export declare const ixbindTo: <N>(name: N) => <I, O, A>(fa: IxState<I, O, A>) => IxState<I, O, { [K in N]: A }>
```

Added in v2.10.0

## ixdiscard

ixDo-notation combinator for discarding the result of a computation rather
than binding it to a name. It is simply an alias for `ixchainFirst`

**Signature**

```ts
export declare const ixdiscard: <I, O, Z, A, B>(
  f: (a: A) => IxState<O, Z, B>
) => (first: IxState<I, O, A>) => IxState<I, Z, A>
```

Added in v2.10.0

## ixlet

**Signature**

```ts
export declare const ixlet: <N, A, B>(
  name: Exclude<N, keyof A>,
  val: (a: A) => B
) => <I, O>(ma: IxState<I, O, A>) => IxState<I, O, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.2

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  val: (a: A) => B
) => <I, O>(ma: IxState<I, O, A>) => IxState<I, O, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.2

## let\_

**Signature**

```ts
export declare const let_: <N, A, B>(
  name: Exclude<N, keyof A>,
  val: (a: A) => B
) => <I, O>(ma: IxState<I, O, A>) => IxState<I, O, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.2
