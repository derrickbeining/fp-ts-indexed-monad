---
title: IxChain.ts
nav_order: 4
parent: Modules
---

## IxChain overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ixchainFirst](#ixchainfirst)
- [type classes](#type-classes)
  - [IxChain3 (interface)](#ixchain3-interface)
  - [IxChain4 (interface)](#ixchain4-interface)
- [utils](#utils)
  - [ixDo](#ixdo)
  - [ixbind](#ixbind)

---

# combinators

## ixchainFirst

**Signature**

```ts
export declare function ixchainFirst<M extends URIS4>(
  M: IxChain4<M>
): <I, O, Z, E, A, B>(f: (a: A) => Kind4<M, O, Z, E, B>) => (first: Kind4<M, I, O, E, A>) => Kind4<M, I, Z, E, A>
export declare function ixchainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A>
```

Added in v2.10.0

# type classes

## IxChain3 (interface)

**Signature**

```ts
export interface IxChain3<F extends URIS3> extends IxApply3<F> {
  readonly ixchain: <A, B, O, Z>(f: (a: A) => Kind3<F, O, Z, B>) => <I>(fa: Kind3<F, I, O, A>) => Kind3<F, I, Z, B>
}
```

Added in v2.10.0

## IxChain4 (interface)

**Signature**

```ts
export interface IxChain4<F extends URIS4> extends IxApply4<F> {
  readonly ixchain: <O, Z, E, A, B>(
    f: (a: A) => Kind4<F, O, Z, E, B>
  ) => <I>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, B>
}
```

Added in v2.10.0

# utils

## ixDo

**Signature**

```ts
export declare function ixDo<F extends URIS4>(F: Pointed4<F>): <I, R, E>() => Kind4<F, I, R, E, {}>
export declare function ixDo<F extends URIS3>(F: Pointed3<F>): <I, E>() => Kind3<F, I, E, {}>
export declare function ixDo<F extends URIS2>(F: Pointed2<F>): <I>() => Kind2<F, I, {}>
export declare function ixDo<F>(F: Pointed<F>): <I>() => HKT2<F, I, {}>
```

Added in v2.10.0

## ixbind

**Signature**

```ts
export declare function ixbind<M extends URIS4>(
  M: IxChain4<M>
): <N extends string, A, Second, Third, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, Second, Third, E, B>
) => <First>(
  ma: Kind4<M, First, Second, E, A>
) => Kind4<M, First, Third, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function ixbind<M extends URIS3>(
  M: IxChain3<M>
): <N extends string, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, Second, Third, B>
) => <First>(
  ma: Kind3<M, First, Second, A>
) => Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v2.10.0
