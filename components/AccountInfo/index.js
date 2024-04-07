import React from 'react';
import { shortenAddress, useLookupAddress } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';

export default function AccountInfo({ account, accountEtherBalance }) {
  return (
    <>
      {!!account && (
        <>
          <div className="m-1 is-inline-block">
            Connected To: {shortenAddress(account)}
            <br />
            BNB Balance:{' '}
            {!!accountEtherBalance
              ? Number(formatEther(accountEtherBalance)).toFixed(4)
              : '...'}{' '}
            BNB
          </div>
        </>
      )}
    </>
  );
}
