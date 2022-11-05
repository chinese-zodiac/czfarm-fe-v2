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
    subtitle: "15% CZF burn on unstake.",
    address: "0xf1D3aFE3E064CD5A42Fb601695D5b93e9De0BAd9",
    rewardAssetName: "DEP",
    rewardAddress: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
    baseAssetName: "CZF",
    baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    rewardDecimals: 18,
    logo: "./images/tokens/DEP.png",
    feeBasis: 1500,
  },
  {
    subtitle: "4% CZUSD burn on unstake.",
    address: "0x380A01792C2227AC4357D30822631dE8f85B922D",
    rewardAssetName: "CZF",
    rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    baseAssetName: "CZUSD",
    baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    rewardDecimals: 18,
    logo: "./images/tokens/CZF.png",
    feeBasis: 400
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
    subtitle: "Hold 50 LRT to unstake, claim, or stake. 9.98% CZF burn on unstake.",
    address: "0x8562c5fd7E994ddC84420375f587880814b7a288",
    rewardAssetName: "CZUSD",
    rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    baseAssetName: "CZF",
    baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    rewardDecimals: 18,
    logo: "./images/tokens/CZUSD.png",
    feeBasis: 998,
    duty: "50 LRT",
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
  {
    subtitle: "Hold 50 LRT to unstake, claim, or stake. 1.98% CZUSD burn on unstake.",
    address: "0xD072476Cc1fC911f340d3145Ea89CA4a3eA73B0a",
    rewardAssetName: "CZF",
    rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
    baseAssetName: "CZUSD",
    baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    rewardDecimals: 18,
    logo: "./images/tokens/CZF.png",
    feeBasis: 198,
    duty: "50 LRT",
    has1Bad0TaxSlot: true
  },
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