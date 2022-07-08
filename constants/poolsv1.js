import { utils } from 'ethers'
const { parseEther } = utils;


export const POOLS_V1 = [
  {
      subtitle: "10% CZF burn on withdraw",
      address: "0x8B299092691240d3420c7f2c87aF5fd84812546d",
      rewardAssetName: "CZUSD",
      rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      baseAssetName: "CZF",
      baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      rewardDecimals: 18,
      logo: "./images/tokens/CZUSD.png",
      feeBasis:1000,
    },
    {
      subtitle: "Hold 5 LRT to withdraw, claim, or stake. 5% CZF burn on withdraw",
      address: "0xde9fcb5b05B1BDB16Af10bd4051712A0F1e0fA25",
      rewardAssetName: "CZUSD",
      rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      baseAssetName: "CZF",
      baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      rewardDecimals: 18,
      logo: "./images/tokens/CZUSD.png",
      feeBasis:500,
      lrtRequired:parseEther("5")
    },
    {
      subtitle: "15% CZF burn on withdraw",
      address: "0xf1D3aFE3E064CD5A42Fb601695D5b93e9De0BAd9",
      rewardAssetName: "DEP",
      rewardAddress: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
      baseAssetName: "CZF",
      baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      rewardDecimals: 18,
      logo: "./images/tokens/DEP.png",
      feeBasis:1500,
    },
    {
      subtitle: "Hold 50 LRT to withdraw, claim, or stake. 5% CZF burn on withdraw",
      address: "0x3829723cE582aE372571A8CE5AdcB1107422BbF1",
      rewardAssetName: "DEP",
      rewardAddress: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
      baseAssetName: "CZF",
      baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      rewardDecimals: 18,
      logo: "./images/tokens/DEP.png",
      feeBasis:500,
      lrtRequired:parseEther("50")
    },
    {
      address: "0x586B7Ed172BceF93aEcA938a70CD425a8EF06A69",
      rewardAssetName: "CZF",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png"
    },
    {
      subtitle: "4% CZUSD burn on withdraw",
      address: "0x380A01792C2227AC4357D30822631dE8f85B922D",
      rewardAssetName: "CZF",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png",
      feeBasis:400
    },
    {
      subtitle: "Hold 50 LRT to withdraw, claim, or stake. No fees.",
      address: "0xD5112ffd4cEf35d8F73c58a48a50051AC2C96121",
      rewardAssetName: "CZF",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png",
      feeBasis:400,
      lrtRequired:parseEther("50")
    },
    {
      name: "CZUSD->IF2",
      address: "0x36Cd92223E98dFe362E672988d92E006B63Ae3F1",
      rewardAssetName: "IF2",
      rewardAddress: "0x308811b388B3b34f0F683BCED45Ee6B7B0E0c6f1",
      baseAssetName: "CZUSD",
      baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      rewardDecimals: 18,
      logo: "./images/tokens/IF2.png"
    }
]