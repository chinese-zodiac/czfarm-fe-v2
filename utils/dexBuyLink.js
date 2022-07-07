import {DEX} from "../constants/dex";

export const dexBuyLink = (address,dex) =>`${dex.baseUrl}swap?outputCurrency=${address}`
export const czCashBuyLink = (address)=>dexBuyLink(address,DEX.PCS);