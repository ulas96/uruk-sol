#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("CCwrCCD1YZegdeG6g59V5ZP2EoRWuVQ86cLfA7cgpZzx");

#[program]
pub mod uruk {
    use super::*;

  pub fn close(_ctx: Context<CloseUruk>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.uruk.count = ctx.accounts.uruk.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.uruk.count = ctx.accounts.uruk.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeUruk>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.uruk.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeUruk<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Uruk::INIT_SPACE,
  payer = payer
  )]
  pub uruk: Account<'info, Uruk>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseUruk<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub uruk: Account<'info, Uruk>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub uruk: Account<'info, Uruk>,
}

#[account]
#[derive(InitSpace)]
pub struct Uruk {
  count: u8,
}
