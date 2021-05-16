/**
 * @since 2.10.0
 */
import { Kind3, Kind4, URIS3, URIS4 } from 'fp-ts/HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxPointed3<F extends URIS3> {
  readonly URI: F
  readonly ixof: <I, A>(a: A) => Kind3<F, I, I, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxPointed4<F extends URIS4> {
  readonly URI: F
  readonly ixof: <I, E, A>(a: A) => Kind4<F, I, I, E, A>
}
