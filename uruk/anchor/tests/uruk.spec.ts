import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Uruk } from '../target/types/uruk';

describe('uruk', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Uruk as Program<Uruk>;

  const urukKeypair = Keypair.generate();

  it('Initialize Uruk', async () => {
    await program.methods
      .initialize()
      .accounts({
        uruk: urukKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([urukKeypair])
      .rpc();

    const currentCount = await program.account.uruk.fetch(
      urukKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Uruk', async () => {
    await program.methods
      .increment()
      .accounts({ uruk: urukKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.uruk.fetch(
      urukKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Uruk Again', async () => {
    await program.methods
      .increment()
      .accounts({ uruk: urukKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.uruk.fetch(
      urukKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Uruk', async () => {
    await program.methods
      .decrement()
      .accounts({ uruk: urukKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.uruk.fetch(
      urukKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set uruk value', async () => {
    await program.methods
      .set(42)
      .accounts({ uruk: urukKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.uruk.fetch(
      urukKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the uruk account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        uruk: urukKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.uruk.fetchNullable(
      urukKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
