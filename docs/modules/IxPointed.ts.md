---
title: IxPointed.ts
nav_order: 7
parent: Modules
---

## IxPointed overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [IxPointed3 (interface)](#ixpointed3-interface)
  - [IxPointed4 (interface)](#ixpointed4-interface)

---

# type classes

## IxPointed3 (interface)

**Signature**

```ts
export interface IxPointed3<F extends URIS3> {
  readonly URI: F
  readonly ixof: <I, A>(a: A) => Kind3<F, I, I, A>
}
```

Added in v2.10.0

## IxPointed4 (interface)

**Signature**

```ts
export interface IxPointed4<F extends URIS4> {
  readonly URI: F
  readonly ixof: <I, E, A>(a: A) => Kind4<F, I, I, E, A>
}
```

Added in v2.10.0
