import { BigNumber } from 'ethers';
import { weiToUsdWeiVal} from '../utils/bnDisplay';

export const getLpTokenValueUsdWad = (token0Name,token0Bal,lpWad,lpTotalSupply,czfPrice,czusdPrice)=>{
  if(token0Name !== "CZF" && token0Name !== "CZUSD") throw new Error("Invalid token0Name for getLpTokenValueUsdWad");
  let price = token0Name == "CZF" ? czfPrice : czusdPrice;
  return weiToUsdWeiVal(token0Bal?.mul(2).mul(lpWad).div(lpTotalSupply) ?? BigNumber.from(0),price);
}