import {DEX} from "../constants/dex";

export const dexBuyLink = (address,dex) =>`${dex.baseUrl}swap?outputCurrency=${address}`
export const dexAddLink = (token0,token1,dex) =>`${dex.baseUrl}add/${token0}/${token1}`
export const czCashBuyLink = (address)=>dexBuyLink(address,DEX.PCS);
export const czCashAddLink = (token0,token1)=>dexAddLink(token0,token1,DEX.PCS);