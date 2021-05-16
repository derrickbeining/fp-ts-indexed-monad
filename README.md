<h1 align="center" style="margin-bottom:0;">
  <pre>fp-ts-indexed-monad</pre>
</h1>

<h4 align="center" style="margin-top:0;">
  Indexed Monads for TypeScript.
</h3>

<p align="center">
  A companion library of
  <a href="https://derrickbeining.github.io/fp-ts/">
    fp-ts
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.com/derrickbeining/fp-ts-indexed-monad">
    <img src="https://img.shields.io/travis/derrickbeining/fp-ts-indexed-monad/main.svg?style=flat-square" alt="build status" height="20">
  </a>
  <a href="https://david-dm.org/derrickbeining/fp-ts-indexed-monad">
    <img src="https://img.shields.io/david/derrickbeining/fp-ts-indexed-monad.svg?style=flat-square" alt="dependency status" height="20">
  </a>
  <a href="https://www.npmjs.com/package/fp-ts-indexed-monad">
    <img src="https://img.shields.io/npm/dm/fp-ts-indexed-monad.svg" alt="npm downloads" height="20">
  </a>
</p>

**This library attempts to loosely port the following libraries to TypeScript:**

- [indexed (Haskell lib)](https://hackage.haskell.org/package/indexed-0.1.3)
- [purescript-indexed-monad](https://pursuit.purescript.org/packages/purescript-indexed-monad)

# Installation

To install the latest stable version:

```
npm install fp-ts-indexed-monad
```

## Dependency Compatibility

Since `fp-ts-indexed-monad` is meant to be a companion to `fp-ts`, I'm going to make each version match the lowest minor version of `fp-ts` that it is known to be compatible with, so that it's easy to identify which version of `fp-ts-indexed-monad` to use with whatever version of `fp-ts` you may be using. The patch version will incremented for new features and bug fixes.

See the [TypeScript Compatibility](https://github.com/derrickbeining/fp-ts#typescript-compatibility) section of the `fp-ts` README.

# Documentation

- [Docs](https://derrickbining.github.io/fp-ts-indexed-monad)
- Learning Resources
  - [fp-ts docs](https://derrickbeining.github.io/fp-ts/learning-resources/)
  - [Using IxMonad to enforce good hamburger building in Purescript by Justin Woo](https://qiita.com/kimagure/items/a0ee7313e8c7690bf3f5)
  - [Using IxMonad to enforce good hamburger building in TypeScript by Martín Valdés de León](https://medium.com/@mvaldesdeleon/using-ixmonad-to-enforce-good-hamburger-building-in-typescript-bcd584236dd4)
- [Ecosystem](https://derrickbeining.github.io/fp-ts/ecosystem/)
- [API Reference](https://derrickbeining.github.io/fp-ts/modules/)

# Help

If you need help with this library or with `fp-ts` check out:

- this [Discord server](https://discord.gg/HVWmBBXM8A)
- the `#fp-ts` channel on [FP slack](functionalprogramming.slack.com)

You can ping me and I'll do my best to get back to you quickly. My handle is @dbeining

# Development

- [Code conventions](https://derrickbeining.github.io/fp-ts/guides/code-conventions)

# License

The MIT License (MIT)
