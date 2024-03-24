'use client';

import { UrukIDL, getUrukProgramId } from '@uruk/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useUrukProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getUrukProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = new Program(UrukIDL, programId, provider);

  const accounts = useQuery({
    queryKey: ['uruk', 'all', { cluster }],
    queryFn: () => program.account.uruk.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['uruk', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ uruk: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useUrukProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useUrukProgram();

  const accountQuery = useQuery({
    queryKey: ['uruk', 'fetch', { cluster, account }],
    queryFn: () => program.account.uruk.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['uruk', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ uruk: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['uruk', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ uruk: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['uruk', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ uruk: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['uruk', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ uruk: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
