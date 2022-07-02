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
        pid: 0
      },
      {
        title: "90 DAYS",
        pid: 1
      },
      {
        title: "1 YEAR",
        pid: 2
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
        pid: 3
      },
      {
        title: "90 DAYS",
        pid: 4
      },
      {
        title: "1 YEAR",
        pid: 5
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
        pid: 6
      },
      {
        title: "90 DAYS",
        pid: 7
      },
      {
        title: "1 YEAR",
        pid: 8
      }
    ]
  }
]