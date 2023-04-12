import { DEX } from "./dex";



export const CZB_FARMS = [
    {
        lp: "0x90b275a373e8d1e89f6870dd0ac52252c4ffdf1d",
        dex: DEX.PCS,
        pid: 1,
        tokens: [
            {
                address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
                symbol: "CZUSD"
            },
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            }
        ]
    },
    {
        lp: "0xd74ce80C184E1Cee90dB4b260F7A8dA020a43B72",
        dex: DEX.PCS,
        pid: 3,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
                symbol: "CZF"
            }
        ]
    },
    {
        lp: "0xfc3B69f95F7A55C444f630f92a15d74a57579a09",
        dex: DEX.PCS,
        pid: 4,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
                symbol: "DGOD"
            }
        ]
    },
    {
        lp: "0xf5f2ae7b6774423038612d0FD4F33299133b926a",
        dex: DEX.PCS,
        pid: 5,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
                symbol: "LSDT"
            }
        ]
    },
    {
        lp: "0xF5887C28d57134133e05aC7a40c6106dCfDF985F",
        dex: DEX.PCS,
        pid: 6,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
                symbol: "GEM"
            }
        ]
    },
    {
        lp: "0xEc982A7065b4c6AF3713f2e25989f0EFF82cA773",
        dex: DEX.PCS,
        pid: 7,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
                symbol: "BRAG"
            }
        ]
    },
    {
        lp: "0xc143b363489e60b53Df7Ba28D30D6f4288F2d1D6",
        dex: DEX.PCS,
        pid: 8,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0xE95412D2d374B957ca7f8d96ABe6b6c1148fA438",
                symbol: "LRT"
            }
        ]
    },
    {
        lp: "0xa48d03B3d1D6BaB2788B4DB3f6b1CB9D18e6FB17",
        dex: DEX.PCS,
        pid: 9,
        tokens: [
            {
                address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
                symbol: "CZB"
            },
            {
                address: "0x5cd0c2C744caF04cda258Efc6558A3Ed3defE97b",
                symbol: "CZR"
            }
        ]
    }
]

export const CZB_FARMS_SINGLES = [{
    token: "0xD963b2236D227a0302E19F2f9595F424950dc186",
    tokenName: "CZB",
    dex: DEX.PCS,
    pid: 0,
}, {
    token: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
    tokenName: "CZUSD",
    dex: DEX.PCS,
    pid: 2,
}]