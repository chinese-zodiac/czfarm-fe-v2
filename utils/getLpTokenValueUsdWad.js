import { BigNumber } from 'ethers';
import { weiToUsdWeiVal } from '../utils/bnDisplay';

export const getLpTokenValueUsdWad = (token0Name, lpInfo, lpWad, czfPrice, czusdPrice) => {
  if (token0Name !== "CZF" && token0Name !== "CZUSD") throw new Error("Invalid token0Name for getLpTokenValueUsdWad");
  let price = token0Name == "CZF" ? czfPrice : czusdPrice;
  return weiToUsdWeiVal(lpInfo?.tokens?.[0]?.mul(2).mul(lpWad ?? BigNumber.from(0)).div(lpInfo?.totalSupply ?? BigNumber.from(1)) ?? BigNumber.from(0), price);
}