import { utils } from 'ethers'
const { parseEther } = utils;


export const POOLS_V1 = [
  {
    subtitle: "4.98% CZUSD burn on unstake.",
    address: "0x10584eEBAB00C390b622aaD1b4AbA68f7e4E217e",
    rewardAssetName: "CZF",
    rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    baseAssetName: "CZUSD",
    baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    rewardDecimals: 18,
    logo: "./images/tokens/CZF.png",
    feeBasis: 498,
    has1Bad0TaxSlot: true
  },
  {
    subtitle: "Hold 50 LRT to unstake, claim, or stake. 1.98% CZUSD burn on unstake.",
    address: "0x9405605DFEcFDa626b597F1E96Dd89d35254434e",
    rewardAssetName: "CZF",
    rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    baseAssetName: "CZUSD",
    baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    rewardDecimals: 18,
    logo: "./images/tokens/CZF.png",
    feeBasis: 198,
    duty: "50 LRT",
    has1Bad0TaxSlot: true
  }
]