import { utils } from 'ethers'
const { parseEther } = utils;

export const BURN_POOLS = [
    {
        subtitle: "100% Burn CZF for CZR. WARNING: Accounts which purchase CZF and then deposit will have stake set to zero.",
        address: "0xa34b2d12dd2426cA93bA2C3bBA86BF24a2FAAAEf",
        rewardAssetName: "CZR",
        rewardAddress: "0x5cd0c2C744caF04cda258Efc6558A3Ed3defE97b",
        baseAssetName: "CZF",
        baseAssetAddress: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        rewardDecimals: 18,
        logo: "./images/tokens/CZR.svg"
    },
    {
        subtitle: "100% Burn CZUSD for CZR.",
        address: "0xD53760b58c3F4ADAbe947E379D19cc28f1246742",
        rewardAssetName: "CZR",
        rewardAddress: "0x5cd0c2C744caF04cda258Efc6558A3Ed3defE97b",
        baseAssetName: "CZUSD",
        baseAssetAddress: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        rewardDecimals: 18,
        logo: "./images/tokens/CZR.svg"
    }
]