import { utils } from 'ethers'
const { parseEther } = utils;


export const POOLS_V1 = [
  {
      name: "CZF->CZUSD",
      subtitle: "10% CZF burn on withdraw",
      address: "0x8B299092691240d3420c7f2c87aF5fd84812546d",
      rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      baseAssetName: "CZF",
      rewardDecimals: 18,
      logo: "./images/tokens/CZUSD.png",
      feeBasis:1000,
    },
    {
      name: "CZF->CZUSD",
      subtitle: "Hold 5 LRT to withdraw, claim, or stake. 5% CZF burn on withdraw",
      address: "0x8B299092691240d3420c7f2c87aF5fd84812546d",
      rewardAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      baseAssetName: "CZF",
      rewardDecimals: 18,
      logo: "./images/tokens/CZUSD.png",
      feeBasis:500,
      lrtRequired:parseEther("5")
    },
    {
      name: "CZF->DEP",
      subtitle: "15% CZF burn on withdraw",
      address: "0xf1D3aFE3E064CD5A42Fb601695D5b93e9De0BAd9",
      rewardAddress: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
      baseAssetName: "CZF",
      rewardDecimals: 18,
      logo: "./images/tokens/DEP.png",
      feeBasis:1500
    },
    {
      name: "CZF->DEP",
      subtitle: "15% CZF burn on withdraw",
      address: "0xf1D3aFE3E064CD5A42Fb601695D5b93e9De0BAd9",
      rewardAddress: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
      baseAssetName: "CZF",
      rewardDecimals: 18,
      logo: "./images/tokens/DEP.png",
      feeBasis:500,
      lrtRequired:parseEther("50")
    },
    {
      name: "CZUSD->CZF",
      address: "0x586B7Ed172BceF93aEcA938a70CD425a8EF06A69",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png"
    },
    {
      name: "CZUSD->CZF",
      subtitle: "4% CZUSD burn on withdraw",
      address: "0x380A01792C2227AC4357D30822631dE8f85B922D",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png",
      feeBasis:400
    },
    {
      name: "CZUSD->CZF",
      subtitle: "Hold 50 LRT to withdraw, claim, or stake. No fees.",
      address: "0x380A01792C2227AC4357D30822631dE8f85B922D",
      rewardAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
      baseAssetName: "CZUSD",
      rewardDecimals: 18,
      logo: "./images/tokens/CZF.png",
      feeBasis:400,
      lrtRequired:parseEther("50")
    },
    {
      name: "CZUSD->IF2",
      address: "0x36Cd92223E98dFe362E672988d92E006B63Ae3F1",
      rewardAddress: "0x308811b388B3b34f0F683BCED45Ee6B7B0E0c6f1",
      baseAssetName: "CZUSD",
      rewardDecimals: 18,
      logo: "./images/tokens/IF2.png"
    }
]