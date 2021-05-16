---
title: IxFunctor.ts
nav_order: 5
parent: Modules
---

## IxFunctor overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ixflap](#ixflap)
- [type classes](#type-classes)
  - [IxFunctor3 (interface)](#ixfunctor3-interface)
  - [IxFunctor4 (interface)](#ixfunctor4-interface)
- [utils](#utils)
  - [ixbindTo](#ixbindto)

---

# combinators

## ixflap

**Signature**

```ts
export declare function ixflap<F extends URIS4>(
  F: IxFunctor4<F>
): <A>(a: A) => <I, O, E, B>(fab: Kind4<F, I, O, E, (a: A) => B>) => Kind4<F, I, O, E, B>
export declare function ixflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B>
```

Added in v2.10.0

# type classes

## IxFunctor3 (interface)

**Signature**

```ts
export interface IxFunctor3<F extends URIS3> {
  readonly URI: F
  readonly ixmap: <A, B>(f: (a: A) => B) => <I, O>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, B>
}
```

Added in v2.10.0

## IxFunctor4 (interface)

**Signature**

```ts
export interface IxFunctor4<F extends URIS4> {
  readonly URI: F
  readonly ixmap: <A, B>(f: (a: A) => B) => <I, O, E>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, B>
}
```

Added in v2.10.0

# utils

## ixbindTo

**Signature**

```ts
export declare function ixbindTo<F extends URIS4>(
  F: IxFunctor4<F>
): <N extends string>(name: N) => <I, O, E, A>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in N]: A }>
export declare function ixbindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }>
```

Added in v2.10.0
