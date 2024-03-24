// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import type { Uruk } from '../target/types/uruk';
import { IDL as UrukIDL } from '../target/types/uruk';

// Re-export the generated IDL and type
export { Uruk, UrukIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const URUK_PROGRAM_ID = new PublicKey(
  'CCwrCCD1YZegdeG6g59V5ZP2EoRWuVQ86cLfA7cgpZzx'
);

// This is a helper function to get the program ID for the Uruk program depending on the cluster.
export function getUrukProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return URUK_PROGRAM_ID;
  }
}
