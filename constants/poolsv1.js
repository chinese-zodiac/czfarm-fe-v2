import { utils } from 'ethers'
const { parseEther } = utils;


export const POOLS_V1 = [
  {
    subtitle: "10% CZF burn on unstake.",
    address: "0x8B299092691240d3420c7f2c87aF5fd84812546d",
    rewardAssetName: "CZUSD",
    rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    baseAssetName: "CZF",
    baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    rewardDecimals: 18,
    logo: "./images/tokens/CZUSD.png",
    feeBasis: 1000
  },
  {
    subtitle: "14.98% CZF burn on unstake.",
    address: "0x6615f3B9FE17fa63F35817cfD669224BA3d00b12",
    rewardAssetName: "CZUSD",
    rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    baseAssetName: "CZF",
    baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    rewardDecimals: 18,
    logo: "./images/tokens/CZUSD.png",
    feeBasis: 1498,
    has1Bad0TaxSlot: true
  },
  {
    subtitle: "4.98% CZUSD burn on unstake.",
    address: "0x4A012c3665550F4dEA2a5302E6144426A9B311B8",
    rewardAssetName: "CZF",
    rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    baseAssetName: "CZUSD",
    baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    rewardDecimals: 18,
    logo: "./images/tokens/CZF.png",
    feeBasis: 498,
    has1Bad0TaxSlot: true
  },
]