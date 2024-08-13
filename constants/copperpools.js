import { utils } from 'ethers';
const { parseEther } = utils;
export const COPPER_POOLS = [
  {
    subtitle: '14.98% TCu29LP burn on unstake.',
    address: '0x106609790b2eC7C66EbaC0bF3c391C3DB77fa40C',
    wrapperAddress: '0xC9aCC19165a2e81Fd03E2E872bf919B25AC5c429',
    rewardAssetName: 'CZR',
    rewardAddress: '0x5cd0c2c744caf04cda258efc6558a3ed3defe97b',
    rewardDecimals: 18,
    lp: '0xbf92a0c60a129a56485a3fb891851cf88798602d',
    tokens: [
      {
        address: '0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70',
        symbol: 'CZUSD',
      },
      {
        address: '0x5cd0c2c744caf04cda258efc6558a3ed3defe97b',
        symbol: 'CZR',
      },
    ],
    logo: './images/tokens/DGOD.png',
    feeBasis: 1498,
  },
  {
    subtitle: '9.98% TCu29LP burn on unstake.',
    address: '0x8BA7041C764FB1d425799e750F74162b2D0F5f36',
    wrapperAddress: '0xFc185a7e730d2157ba715cA9ad9830a0BEeBd159',
    rewardAssetName: 'CZR',
    rewardAddress: '0x5cd0c2c744caf04cda258efc6558a3ed3defe97b',
    rewardDecimals: 18,
    lp: '0xbf92a0c60a129a56485a3fb891851cf88798602d',
    tokens: [
      {
        address: '0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70',
        symbol: 'CZUSD',
      },
      {
        address: '0x5cd0c2c744caf04cda258efc6558a3ed3defe97b',
        symbol: 'CZR',
      },
    ],
    logo: './images/tokens/CZR.png',
    feeBasis: 998,
    duty: '50 LRT',
  },
];
