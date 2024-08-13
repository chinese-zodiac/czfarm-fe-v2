import { BigNumber } from 'ethers';
import { weiToUsdWeiVal } from '../utils/bnDisplay';

export const getLpTokenValueUsdWad = (
  token0Name,
  lpInfo,
  lpWad,
  tokenPrice,
  czusdPrice,
  isSwap
) => {
  //TODO: remove isSwap when refactor how lp token addresses are stored
  if (
    token0Name !== 'CZF' &&
    token0Name !== 'CZUSD' &&
    token0Name !== 'CZB' &&
    token0Name !== 'BANDIT'
  )
    throw new Error('Invalid token0Name for getLpTokenValueUsdWad');
  let price = token0Name != 'CZUSD' ? tokenPrice : czusdPrice;
  return weiToUsdWeiVal(
    lpInfo?.tokens?.[isSwap ? 1 : 0]
      ?.mul(2)
      .mul(lpWad ?? BigNumber.from(0))
      .div(lpInfo?.totalSupply ?? BigNumber.from(1)) ?? BigNumber.from(0),
    price
  );
};
