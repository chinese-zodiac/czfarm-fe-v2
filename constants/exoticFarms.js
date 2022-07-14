import {DEX} from "./dex";

export const EXOTIC_FARMS = [
  {
    title: "CZF/BNB on PCS",
    lp:"0xeF8e8CfADC0b634b6d0065080a69F139159a17dE", //czf/bnb -PCS
    dex:DEX.PCS,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        symbol:"WBNB"
      }
    ],
    oracle: "0x1D5D8bF7345D3cB611Dd4A98Fa5F7159Cb6d1451",
    farms: [
      {
        title: "7 DAYS",
        pid: 0,
        chronoVesting:"0x5351e4fcD656B56C442f761760495568426c7279"
      },
      {
        title: "90 DAYS",
        pid: 1,
        chronoVesting:"0xd84B90E2c581Ee36532B9F9035Da3daC6D9B5A07"
      },
      {
        title: "1 YEAR",
        pid: 2,
        chronoVesting:"0x3fFfD7d941cc38831E7F72AAe640c31113A435f9"
      }
    ]
  },
  {
    title: "CZF/BUSD on PCS",
    lp:"0xAAC96d00C566571bafdfa3B8440Bdc3cDB223Ad0", //czf/busd -PCS
    dex:DEX.PCS,
    tokens:[
      {
        address:"0x7c1608C004F20c3520f70b924E2BfeF092dA0043",
        symbol:"CZF"
      },
      {
        address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        symbol:"BUSD"
      }
    ],
    oracle: "0x741b0D9Bf195e7bE74DE138B7B5F7e7328d65f12",
    farms: [
      {
        title: "7 DAYS",
        pid: 3,
        chronoVesting:"0x162d7b60226c627BA384B97AFe76c7a63EDd5c4B"
      },
      {
        title: "90 DAYS",
        pid: 4,
        chronoVesting:"0xFd7f3189b7E09e4995F07F550e01e91254F58D30"
      },
      {
        title: "1 YEAR",
        pid: 5,
        chronoVesting:"0x227f88eDDe39399eF01de7eD11DA322e536F152d"
      }
    ]
  },
  {
    title: "CZF/CZUSD on PCS",
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
    ],
    oracle: "0x53C95Ecfde2ED3a8438cFF4F365cf06a07199551",
    farms: [
      {
        title: "7 DAYS",
        pid: 6,
        chronoVesting:"0x016f33A0Fe6A9476C46BdBDe2D1decebc3016d0a"
      },
      {
        title: "90 DAYS",
        pid: 7,
        chronoVesting:"0x07E94E47eA08A55661be01AbCe527aA8084076d1"
      },
      {
        title: "1 YEAR",
        pid: 8,
        chronoVesting:"0x000ba08bA482EFdF557A47eDe2477eCFa224C70f"
      }
    ]
  }
]