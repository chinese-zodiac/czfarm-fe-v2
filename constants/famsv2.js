const DEX = {
  PCS: {
    name: "CZ.Cash",
    shortName: "CZ",
    baseUrl: "https://cz.cash/#/"
  },
  CAFE: {
    name: "Cafeswap",
    shortName: "CAFE",
    baseUrl: "https://dex.cafeswap.finance/#/"
  },
  DONK: {
    name: "Donkswap",
    shortName: "DONK",
    baseUrl: "https://donkswap.com/#/"
  },
  SHRK: {
    name: "Autoshark",
    shortName: "SHRK",
    baseUrl: "https://autoshark.finance/"
  },
  JETS: {
    name: "Jetswap",
    shortName: "JETS",
    baseUrl: "https://exchange.jetswap.finance/#/"
  },
  BABY: {
    name: "Babyswap",
    shortName: "BABY",
    baseUrl: "https://exchange.babyswap.finance/#/"
  },
  GTAR: {
    name: "Guitarswap",
    shortName: "GTAR",
    baseUrl: "https://guitarswap.exchange/"
  },
  AMPL: {
    name: "Ampleswap",
    shortName: "AMPL",
    baseUrl: "https://ampleswap.com/"
  },
  APE: {
    name: "Apeswap",
    shortName: "APE",
    baseUrl: "https://app.apeswap.finance/"
  },
  EPS: {
    name: "Ellipsis",
    shortName: "EPS",
    baseUrl: "https://ellipsis.finance/pool/0"
  },
  KNIGHT: {
    name: "KnightSwap",
    shortName: "KNIGHT",
    baseUrl: "https://dex.knightswap.financial/#/"
  }
}

export const FARM_V2 = [
  {
    lp:"0xAAC96d00C566571bafdfa3B8440Bdc3cDB223Ad0", //czf/busd -PCS
    dex:DEX.PCS,
    pid:0,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        symbol:"BUSD"
      }
    ]
  },
  {
    lp:"0xeF8e8CfADC0b634b6d0065080a69F139159a17dE", //czf/bnb -PCS
    dex:DEX.PCS,
    pid:1,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        symbol:"WBNB"
      }
    ]
  },
  {
    lp:"0x98b5F5E7Ec32cda1F3E89936c9972f92296aFE47", //czf/czusd -PCS
    dex:DEX.PCS,
    pid:2,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol:"CZUSD"
      }
    ]
  },
  {
    lp:"0xd7C6Fc00FAe64cb7D242186BFD21e31C5b175671", //czusd/busd -PCS
    dex:DEX.PCS,
    pid:3,
    tokens:[
      {
        address:"0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol:"CZUSD"
      },
      {
        address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        symbol:"BUSD"
      }
    ]
  },
  {
    lp:"0xE90AEbc91Df3b534F4e2D74b527FaA6f49d45a77", //czf/ghd -PCS
    dex:DEX.PCS,
    pid:4,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xfDFD27aE39cebefDBaAc8615F18aa68DDD0F15f5",
        symbol:"GHD"
      }
    ]
  },
  {
    lp:"0x41063A1AEFE6d6f4b44a2b030bB259673dCA8bA6", //CZF/IF1 -PCS
    dex:DEX.PCS,
    pid:5,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xfcac1a3ede7b55cc51e3ebff2885a67fbfe01a1a",
        symbol:"IF1"
      }
    ]
  },
  {
    lp:"0x9C8bae84261eA499c628a4aaD925564766210e64", //CZF/BTCB -PCS
    dex:DEX.PCS,
    pid:6,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
        symbol:"BTCB"
      }
    ]
  },
  {
    lp:"0xEcEEC5745Acf050A3a464fd2FAF64c1d683c8616", //CZF/ETH -PCS
    dex:DEX.PCS,
    pid:7,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        symbol:"ETH"
      }
    ]
  },
  {
    lp:"0x13573b1970611bb401f0B75994C80E16c8F56C35", //CZF/CAKE -PCS
    dex:DEX.PCS,
    pid:8,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
        symbol:"CAKE"
      }
    ]
  },
  {
    lp:"0x4E80c807233546F3F820ADEbCE64E75f5Eac3AB8", //CZF/ADA -PCS
    dex:DEX.PCS,
    pid:9,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        symbol:"ADA"
      }
    ]
  },
  {
    lp:"0xd5654a515f1cec88d1e3011e6729a3bd023b7533", //CZF/AMPLE -AMPL
    dex:DEX.AMPL,
    pid:10,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x335f6e0e804b70a96bf9eb8af31588942e9b2515",
        symbol:"AMPLE"
      }
    ]
  },
  {
    lp:"0x970b0c00880a5e2D5aa64aeb4a38CD3E82A2d5Cb", //CZF/MAINST -APE
    dex:DEX.APE,
    pid:11,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89",
        symbol:"MAINST"
      },
    ]
  },
  {
    lp:"0xaCC6AF9C62B482Cb89522e262F8b315d870208ab", //CZF/DEP -APE
    dex:DEX.APE,
    pid:12,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
        symbol:"DEP"
      }
    ]
  },
  {
    lp:"0x8Bb25E9CD67AF1E2b961A905e76A95E675b69645", //CZUSD/DEP -APE
    dex:DEX.APE,
    pid:13,
    tokens:[
      {
        address:"0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
        symbol:"CZUSD"
      },
      {
        address:"0xcaF5191fc480F43e4DF80106c7695ECA56E48B18",
        symbol:"DEP"
      }
    ]
  },
  {
    lp:"0x336b2ea94fca2798b0679e4d12b96472fe067baf", //CZF/OLIVE -PCS
    dex:DEX.PCS,
    pid:14,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x617724974218A18769020A70162165A539c07E8a",
        symbol:"OLIVE"
      }
    ]
  },
  {
    lp:"0x6b080059Fdd75113CeE43fb57A8B8c900d527D81", //CZF/CWE -PCS
    dex:DEX.PCS,
    pid:15,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x9c6b7221cDDA3b8136fbF9D27ac07AeeCC1087B5",
        symbol:"CWE"
      }
    ]
  },
  {
    lp:"0x01ab57d5062eFa63F87F062C981F7BE6C2Fe2739", //CZF/WNOW -PCS
    dex:DEX.PCS,
    pid:16,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x56AA0237244C67B9A854B4Efe8479cCa0B105289",
        symbol:"WNOW"
      }
    ]
  },
  {
    lp:"0x33FcB84f5e79082f62BA7de8285C9b37a68f1a02", //CZF/DONK -PCS
    dex:DEX.PCS,
    pid:17,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0x3969Fe107bAe2537cb58047159a83C33dfbD73f9",
        symbol:"DST"
      }
    ]
  }
]