---
title: IxStateT.ts
nav_order: 9
parent: Modules
---

## IxStateT overview

When applying module augmentation when creating types,
ensure that there are 2 declarations.

See `IxState` for more details.

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
- [Functor](#functor)
  - [map](#map)
- [IxApply](#ixapply)
  - [ixap](#ixap)
- [IxChain](#ixchain)
  - [ixchain](#ixchain)
- [IxFunctor](#ixfunctor)
  - [ixmap](#ixmap)
- [IxPointed](#ixpointed)
  - [ixof](#ixof)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [local](#local)
- [constructors](#constructors)
  - [fromStateF](#fromstatef)
  - [get](#get)
  - [gets](#gets)
  - [ixmodify](#ixmodify)
  - [put](#put)
- [destructors](#destructors)
  - [evaluate](#evaluate)
  - [ixexecute](#ixexecute)
  - [toStateF](#tostatef)
- [model](#model)
  - [IxStateT (interface)](#ixstatet-interface)
  - [IxStateT1 (interface)](#ixstatet1-interface)
  - [IxStateT2 (interface)](#ixstatet2-interface)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare function ap<F extends URIS2>(
  F: Chain2<F>
): <I, E, A>(fa: IxStateT2<F, I, I, E, A>) => <B>(fab: IxStateT2<F, I, I, E, (a: A) => B>) => IxStateT2<F, I, I, E, B>
export declare function ap<F extends URIS>(
  F: Chain1<F>
): <I, A>(fa: IxStateT1<F, I, I, A>) => <B>(fab: IxStateT1<F, I, I, (a: A) => B>) => IxStateT1<F, I, I, B>
export declare function ap<F>(
  F: Chain<F>
): <I, A>(fa: IxStateT<F, I, I, A>) => <B>(fab: IxStateT<F, I, I, (a: A) => B>) => IxStateT<F, I, I, B>
```

Added in v2.10.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare function chain<F extends URIS2>(
  F: Chain2<F>
): <I, E, A, B>(f: (a: A) => IxStateT2<F, I, I, E, B>) => (fa: IxStateT2<F, I, I, E, A>) => IxStateT2<F, I, I, E, B>
export declare function chain<F extends URIS>(
  F: Chain1<F>
): <I, A, B>(f: (a: A) => IxStateT1<F, I, I, B>) => (fa: IxStateT1<F, I, I, A>) => IxStateT1<F, I, I, B>
export declare function chain<F>(
  F: Chain<F>
): <I, A, B>(f: (a: A) => IxStateT<F, I, I, B>) => (fa: IxStateT<F, I, I, A>) => IxStateT<F, I, I, B>
```

Added in v2.10.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: typeof ixmap
```

Added in v2.10.0

# IxApply

## ixap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare function ixap<F extends URIS2>(
  F: Chain2<F>
): <O, Z, E, A>(
  fa: IxStateT2<F, O, Z, E, A>
) => <I, B>(fab: IxStateT2<F, I, O, E, (a: A) => B>) => IxStateT2<F, I, Z, E, B>
export declare function ixap<F extends URIS>(
  F: Chain1<F>
): <O, Z, A>(fa: IxStateT1<F, O, Z, A>) => <I, B>(fab: IxStateT1<F, I, O, (a: A) => B>) => IxStateT1<F, I, Z, B>
export declare function ixap<F>(
  F: Chain<F>
): <O, Z, A>(fa: IxStateT<F, O, Z, A>) => <I, B>(fab: IxStateT<F, I, O, (a: A) => B>) => IxStateT<F, I, Z, B>
```

Added in v2.10.0

# IxChain

## ixchain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare function ixchain<F extends URIS2>(
  F: Chain2<F>
): <O, Z, E, A, B>(
  f: (a: A) => IxStateT2<F, O, Z, E, B>
) => <I>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, I, Z, E, B>
export declare function ixchain<F extends URIS>(
  F: Chain1<F>
): <O, Z, A, B>(f: (a: A) => IxStateT1<F, O, Z, B>) => <I>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, I, Z, B>
export declare function ixchain<F>(
  F: Chain<F>
): <O, Z, A, B>(f: (a: A) => IxStateT<F, O, Z, B>) => <I>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, Z, B>
```

Added in v2.10.0

# IxFunctor

## ixmap

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare function ixmap<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <I, O, E>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, I, O, E, B>
export declare function ixmap<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <I, O>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, I, O, B>
export declare function ixmap<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <I, O>(fa: IxStateT<F, I, O, A>) => IxStateT<F, I, O, B>
```

Added in v2.10.0

# IxPointed

## ixof

**Signature**

```ts
export declare function ixof<F extends URIS2>(F: Pointed2<F>): <S, E, A>(a: A) => IxStateT2<F, S, S, E, A>
export declare function ixof<F extends URIS>(F: Pointed1<F>): <S, A>(a: A) => IxStateT1<F, S, S, A>
export declare function ixof<F>(F: Pointed<F>): <S, A>(a: A) => IxStateT<F, S, S, A>
```

Added in v2.10.0

# Pointed

## of

**Signature**

```ts
export declare const of: typeof ixof
```

Added in v2.10.0

# combinators

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare function local<F extends URIS2>(): <I, X>(
  f: (x: X) => I
) => <O, E, A>(fa: IxStateT2<F, I, O, E, A>) => IxStateT2<F, X, O, E, A>
export declare function local<F extends URIS>(): <I, X>(
  f: (x: X) => I
) => <O, A>(fa: IxStateT1<F, I, O, A>) => IxStateT1<F, X, O, A>
export declare function local<F>(): <I, X>(f: (x: X) => I) => <O, A>(fa: IxStateT<F, I, O, A>) => IxStateT<F, X, O, A>
```

Added in v2.10.0

# constructors

## fromStateF

**Signature**

```ts
export declare function fromStateF<F extends URIS2>(): <S, E, A>(fa: StateT2<F, S, E, A>) => IxStateT2<F, S, S, E, A>
export declare function fromStateF<F extends URIS>(): <S, A>(fa: StateT1<F, S, A>) => IxStateT1<F, S, S, A>
export declare function fromStateF<F>(): <R, A>(fa: StateT<F, R, A>) => IxStateT<F, R, R, A>
```

Added in v2.10.0

## get

**Signature**

```ts
export declare function get<F extends URIS2>(F: Pointed2<F>): <I, E>() => IxStateT2<F, I, I, E, I>
export declare function get<F extends URIS>(F: Pointed1<F>): <I>() => IxStateT1<F, I, I, I>
export declare function get<F>(F: Pointed<F>): <I>() => IxStateT<F, I, I, I>
```

Added in v2.10.0

## gets

**Signature**

```ts
export declare function gets<F extends URIS2>(F: Pointed2<F>): <I, E, A>(f: (i: I) => A) => IxStateT2<F, I, I, E, A>
export declare function gets<F extends URIS>(F: Pointed1<F>): <I, A>(f: (i: I) => A) => IxStateT1<F, I, I, A>
export declare function gets<F>(F: Pointed<F>): <I, A>(f: (i: I) => A) => IxStateT<F, I, I, A>
```

Added in v2.10.0

## ixmodify

**Signature**

```ts
export declare function ixmodify<F extends URIS2>(
  F: Pointed2<F>
): <S, R, E>(f: (i: S) => R) => IxStateT2<F, S, R, E, void>
export declare function ixmodify<F extends URIS>(F: Pointed1<F>): <R, E>(f: (i: R) => E) => IxStateT1<F, R, E, void>
export declare function ixmodify<F>(F: Pointed<F>): <R, E>(f: (i: R) => E) => IxStateT<F, R, E, void>
```

Added in v2.10.0

## put

**Signature**

```ts
export declare function put<F extends URIS2>(F: Pointed2<F>): <I, E>(i: I) => IxStateT2<F, I, I, E, void>
export declare function put<F extends URIS>(F: Pointed1<F>): <I>(i: I) => IxStateT1<F, I, I, void>
export declare function put<F>(F: Pointed<F>): <I>(i: I) => IxStateT<F, I, I, void>
```

Added in v2.10.0

# destructors

## evaluate

**Signature**

```ts
export declare function evaluate<F extends URIS2>(
  F: Functor2<F>
): <I>(i: I) => <O, E, A>(fa: IxStateT2<F, I, O, E, A>) => Kind2<F, E, A>
export declare function evaluate<F extends URIS>(
  F: Functor1<F>
): <I>(i: I) => <O, A>(fa: IxStateT1<F, I, O, A>) => Kind<F, A>
export declare function evaluate<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, A>
```

Added in v2.10.0

## ixexecute

**Signature**

```ts
export declare function ixexecute<F extends URIS2>(
  F: Functor2<F>
): <I, E>(i: I) => <O, A>(fa: IxStateT2<F, I, O, E, A>) => Kind2<F, E, O>
export declare function ixexecute<F extends URIS>(
  F: Functor1<F>
): <I>(i: I) => <O, A>(fa: IxStateT1<F, I, O, A>) => Kind<F, O>
export declare function ixexecute<F>(F: Functor<F>): <I>(i: I) => <O, A>(fa: IxStateT<F, I, O, A>) => HKT<F, O>
```

Added in v2.10.0

## toStateF

**Signature**

```ts
export declare function toStateF<F extends URIS2>(): <R, E, A>(fa: IxStateT2<F, R, R, E, A>) => StateT2<F, R, E, A>
export declare function toStateF<F extends URIS>(): <E, A>(fa: IxStateT1<F, E, E, A>) => StateT1<F, E, A>
export declare function toStateF<F>(): <E, A>(fa: IxStateT<F, E, E, A>) => StateT<F, E, A>
```

Added in v2.10.0

# model

## IxStateT (interface)

**Signature**

```ts
export interface IxStateT<F, R, E, A> {
  (i: R): HKT<F, [A, E]>
}
```

Added in v2.10.0

## IxStateT1 (interface)

**Signature**

```ts
export interface IxStateT1<F extends URIS, R, E, A> {
  (i: R): Kind<F, [A, E]>
}
```

Added in v2.10.0

## IxStateT2 (interface)

**Signature**

```ts
export interface IxStateT2<F extends URIS2, S, R, E, A> {
  (i: S): Kind2<F, E, [A, R]>
}
```

Added in v2.10.0
