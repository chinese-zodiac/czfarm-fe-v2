import { DEX } from "./dex";

export const FARM_V2 = [
  {
    lp: "0xAAC96d00C566571bafdfa3B8440Bdc3cDB223Ad0", //czf/busd -PCS
    dex: DEX.PCS,
    pid: 0,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        symbol: "BUSD"
      }
    ]
  },
  {
    lp: "0xeF8e8CfADC0b634b6d0065080a69F139159a17dE", //czf/bnb -PCS
    dex: DEX.PCS,
    pid: 1,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        symbol: "WBNB"
      }
    ]
  },
  {
    lp: "0x98b5F5E7Ec32cda1F3E89936c9972f92296aFE47", //czf/czusd -PCS
    dex: DEX.PCS,
    pid: 2,
    tokens: [
      {
        address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol: "CZUSD"
      },
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      }
    ]
  },
  {
    lp: "0xd7C6Fc00FAe64cb7D242186BFD21e31C5b175671", //czusd/busd -PCS
    dex: DEX.PCS,
    pid: 3,
    tokens: [
      {
        address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol: "CZUSD"
      },
      {
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        symbol: "BUSD"
      }
    ]
  },
  {
    lp: "0x41063A1AEFE6d6f4b44a2b030bB259673dCA8bA6", //CZF/IF1 -PCS
    dex: DEX.PCS,
    pid: 5,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xfcac1a3ede7b55cc51e3ebff2885a67fbfe01a1a",
        symbol: "IF1"
      }
    ]
  },
  {
    lp: "0x9C8bae84261eA499c628a4aaD925564766210e64", //CZF/BTCB -PCS
    dex: DEX.PCS,
    pid: 6,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
        symbol: "BTCB"
      }
    ]
  },
  {
    lp: "0xEcEEC5745Acf050A3a464fd2FAF64c1d683c8616", //CZF/ETH -PCS
    dex: DEX.PCS,
    pid: 7,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        symbol: "ETH"
      }
    ]
  },
  {
    lp: "0x13573b1970611bb401f0B75994C80E16c8F56C35", //CZF/CAKE -PCS
    dex: DEX.PCS,
    pid: 8,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
        symbol: "CAKE"
      }
    ]
  },
  {
    lp: "0x4E80c807233546F3F820ADEbCE64E75f5Eac3AB8", //CZF/ADA -PCS
    dex: DEX.PCS,
    pid: 9,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        symbol: "ADA"
      }
    ]
  },
  {
    lp: "0xaCC6AF9C62B482Cb89522e262F8b315d870208ab", //CZF/DEP -APE
    dex: DEX.APE,
    pid: 12,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
        symbol: "DEP"
      }
    ]
  },
  {
    lp: "0x8Bb25E9CD67AF1E2b961A905e76A95E675b69645", //CZUSD/DEP -APE
    dex: DEX.APE,
    pid: 13,
    tokens: [
      {
        address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol: "CZUSD"
      },
      {
        address: "0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
        symbol: "DEP"
      }
    ]
  },
  {
    lp: "0x336b2ea94fca2798b0679e4d12b96472fe067baf", //CZF/OLIVE -PCS
    dex: DEX.PCS,
    pid: 14,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x617724974218A18769020A70162165A539c07E8a",
        symbol: "OLIVE"
      }
    ]
  },
  {
    lp: "0x01ab57d5062eFa63F87F062C981F7BE6C2Fe2739", //CZF/WNOW -PCS
    dex: DEX.PCS,
    pid: 16,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x56AA0237244C67B9A854B4Efe8479cCa0B105289",
        symbol: "WNOW"
      }
    ]
  },
  {
    lp: "0x33FcB84f5e79082f62BA7de8285C9b37a68f1a02", //CZF/DONK -DONK
    dex: DEX.DONK,
    pid: 17,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x3969Fe107bAe2537cb58047159a83C33dfbD73f9",
        symbol: "DST"
      }
    ]
  },
  {
    lp: "0x3b44D7C8170e9EA0070DB07347DACb3DE7a80085", //CZF/CZR -PCS
    dex: DEX.PCS,
    pid: 19,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x5cd0c2C744caF04cda258Efc6558A3Ed3defE97b",
        symbol: "CZR"
      }
    ]
  },
  {
    lp: "0xd74ce80C184E1Cee90dB4b260F7A8dA020a43B72", //CZF/CZB -PCS
    dex: DEX.PCS,
    pid: 20,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xD963b2236D227a0302E19F2f9595F424950dc186",
        symbol: "CZB"
      }
    ]
  },
  {
    lp: "0xfA6CF68D17F59ea26b5e386da0Cfc868dbf5C669", //CZF/LRT -PCS
    dex: DEX.PCS,
    pid: 21,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xE95412D2d374B957ca7f8d96ABe6b6c1148fA438",
        symbol: "LRT"
      }
    ]
  },
  {
    lp: "0xfEe41686cbcCD8B15C1dafE05dED169E396569bf", //CZF/LSDT -PCS
    dex: DEX.PCS,
    pid: 22,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA",
        symbol: "LSDT"
      }
    ]
  },
  {
    lp: "0xb0beeD4967b29e447d5134837a679b2BF426C1d9", //CZF/GEM -PCS
    dex: DEX.PCS,
    pid: 23,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7",
        symbol: "GEM"
      }
    ]
  },
  {
    lp: "0xFbEda923c601bE0730617581DfFA23Fcd5a34587", //CZF/DGOD -PCS
    dex: DEX.PCS,
    pid: 24,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270",
        symbol: "DGOD"
      }
    ]
  },
  {
    lp: "0x01F6BF04e4905b380a7e139bdEBc070937503b39", //CZF/BRAG -PCS
    dex: DEX.PCS,
    pid: 25,
    tokens: [
      {
        address: "0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol: "CZF"
      },
      {
        address: "0x48c2bc3d0c63174B811aD4fa09b45cC039578aDb",
        symbol: "BRAG"
      }
    ]
  }
]