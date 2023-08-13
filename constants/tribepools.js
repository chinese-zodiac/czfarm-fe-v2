import { utils } from 'ethers';
const { parseEther } = utils;
export const TRIBE_POOLS = [
    {
        subtitle: "14.98% CZR burn on unstake.",
        address: "0x73e203e23785bcd6bd060a4a0a40de4c36ce20bb",
        wrapperAddress: "0xd06217a2d18c2b26fae3e649cd2de133f573ab43",
        rewardAssetName: "DGOD",
        rewardAddress: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
        rewardDecimals: 18,
        lp: "0xC0B4dCC1d249D177a43bdAA13649f9b2830744A7",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
                symbol: "DGOD"
            }
        ],
        logo: "./images/tokens/DGOD.png",
        feeBasis: 1498
    },
    {
        subtitle: "9.98% CZR burn on unstake.",
        address: "0x0f03a13620c9b87b5eee6ca99aa9c76bafd41a26",
        wrapperAddress: "0x003cccc78ebe57c6dcd57e4c49b24d7dec074893",
        rewardAssetName: "DGOD",
        rewardAddress: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
        rewardDecimals: 18,
        lp: "0xC0B4dCC1d249D177a43bdAA13649f9b2830744A7",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
                symbol: "DGOD"
            }
        ],
        logo: "./images/tokens/DGOD.png",
        feeBasis: 998,
        duty: "50 LRT"
    },
    {
        subtitle: "14.98% CZR burn on unstake.",
        address: "0x7741f33db7f3a7322a167200a6f191f3cdfeb704",
        wrapperAddress: "0x989d7c902c1c33af1a6018b6f2713c49c5052677",
        rewardAssetName: "GEM",
        rewardAddress: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
        rewardDecimals: 18,
        lp: "0x9321907037fa062b52b3f564b3350Adf935Bf698",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
                symbol: "GEM"
            }
        ],
        logo: "./images/tokens/GEM.png",
        feeBasis: 1498
    },
    {
        subtitle: "9.98% CZR burn on unstake.",
        address: "0x27dbaa53afdc7e6f0eff9c1fe07a8d01e5e93139",
        wrapperAddress: "0xf24ee6519c14d60e8b97ef802f5fac53d323e7fc",
        rewardAssetName: "GEM",
        rewardAddress: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
        rewardDecimals: 18,
        lp: "0x9321907037fa062b52b3f564b3350Adf935Bf698",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
                symbol: "GEM"
            }
        ],
        logo: "./images/tokens/GEM.png",
        feeBasis: 998,
        duty: "50 LRT"
    },
    {
        subtitle: "14.98% CZR burn on unstake.",
        address: "0x5f5f82503d54b70190afca003C4B4D81080117aD",
        wrapperAddress: "0x770Ca266f6eFf94880e60D4276fE708FF498a61F",
        rewardAssetName: "LSDT",
        rewardAddress: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
        rewardDecimals: 18,
        lp: "0xa98F8B669790b1063c0dB3a03A9ECfE4ce602bEe",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
                symbol: "LSDT"
            }
        ],
        logo: "./images/tokens/LSDT.png",
        feeBasis: 1498
    },
    {
        subtitle: "9.98% CZR burn on unstake.",
        address: "0x11509E61BA6069A2EF67A30BAA1878b9E7248375",
        wrapperAddress: "0xBeFE5F7c282c9Cb5A333892E2e600b28d80699c7",
        rewardAssetName: "LSDT",
        rewardAddress: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
        rewardDecimals: 18,
        lp: "0xa98F8B669790b1063c0dB3a03A9ECfE4ce602bEe",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
                symbol: "LSDT"
            }
        ],
        logo: "./images/tokens/LSDT.png",
        feeBasis: 998,
        duty: "50 LRT"
    },/*
    {
        subtitle: "14.98% CZR burn on unstake.",
        address: "0x84748681A294F2Eb49fF0BFac21cd82fcF646107",
        wrapperAddress: "0x39e18C777A3FfC6B2Bc9B0485486E54DFBFEF165",
        rewardAssetName: "BRAG",
        rewardAddress: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
        rewardDecimals: 18,
        lp: "0x2b8c51720d5e007163bf83f38c2a72e497f1fb48",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
                symbol: "BRAG"
            }
        ],
        logo: "./images/tokens/BRAG.png",
        feeBasis: 1498
    },
    {
        subtitle: "9.98% CZR burn on unstake.",
        address: "0xcE0Dac82B8FF4c3C9e5d5244f2DbC8791Ea63D7e",
        wrapperAddress: "0x2cfc10F03570C05713bEF29006ec018Cd4de8E51",
        rewardAssetName: "BRAG",
        rewardAddress: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
        rewardDecimals: 18,
        lp: "0x2b8c51720d5e007163bf83f38c2a72e497f1fb48",
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
                symbol: "BRAG"
            }
        ],
        logo: "./images/tokens/BRAG.png",
        feeBasis: 998,
        duty: "50 LRT"
    }*/
]