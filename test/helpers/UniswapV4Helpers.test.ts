import {expect} from 'chai';
import {ethers} from 'hardhat';
import {pack} from '@ethersproject/solidity';
import {UniswapV4Helpers} from '../../typechain';
import {utils} from 'ethers';

describe('UniswapV4Helpers', async () => {
  let uniswapV4Helpers: UniswapV4Helpers;
  let mockToken0: string;
  let mockToken1: string;

  // Actions from @uniswap/v4-periphery/src/libraries/Actions.sol
  const MINT_POSITION = '0x02';
  const SETTLE_PAIR = '0x0d';

  before(async () => {
    uniswapV4Helpers = <UniswapV4Helpers>await ethers.getContract('UniswapV4Helpers');
    // Using mock addresses for testing
    mockToken0 = '0x1000000000000000000000000000000000000000';
    mockToken1 = '0x2000000000000000000000000000000000000000';
  });

  describe('encodeMint', () => {
    it('should correctly encode mint parameters', async () => {
      const fee = 500;
      const tickSpacing = 10;
      const tickLower = -100;
      const tickUpper = 100;
      const liquidity = 1000000n;
      const amount0Max = 1000000n;
      const amount1Max = 1000000n;
      const recipient = '0x3000000000000000000000000000000000000000';

      // Manually encode the expected data
      const actions = pack(['uint8', 'uint8'], [MINT_POSITION, SETTLE_PAIR]);

      const poolKey = {
        currency0: mockToken0,
        currency1: mockToken1,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: ethers.constants.AddressZero,
      };

      const params = [
        utils.defaultAbiCoder.encode(
          [
            'tuple(address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)',
            'int24',
            'int24',
            'uint256',
            'uint128',
            'uint128',
            'address',
            'bytes',
          ],
          [poolKey, tickLower, tickUpper, liquidity, amount0Max, amount1Max, recipient, '0x']
        ),
        utils.defaultAbiCoder.encode(['address', 'address'], [mockToken0, mockToken1]),
      ];

      const expectedData = utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [actions, params]);

      const encodedData = await uniswapV4Helpers.encodeMint(
        mockToken0,
        mockToken1,
        fee,
        tickSpacing,
        tickLower,
        tickUpper,
        liquidity,
        amount0Max,
        amount1Max,
        recipient
      );

      expect(encodedData).to.equal(expectedData);
    });
  });

  describe('encodeMintWithHooks', () => {
    it('should correctly encode mint with hooks parameters', async () => {
      const fee = 500;
      const tickSpacing = 10;
      const tickLower = -100;
      const tickUpper = 100;
      const liquidity = 1000000n;
      const amount0Max = 1000000n;
      const amount1Max = 1000000n;
      const recipient = '0x3000000000000000000000000000000000000000';
      const hooks = '0x4000000000000000000000000000000000000000';

      // Manually encode the expected data
      const actions = pack(['uint8', 'uint8'], [MINT_POSITION, SETTLE_PAIR]);

      const poolKey = {
        currency0: mockToken0,
        currency1: mockToken1,
        fee: fee,
        tickSpacing: tickSpacing,
        hooks: hooks,
      };

      const params = [
        utils.defaultAbiCoder.encode(
          [
            'tuple(address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)',
            'int24',
            'int24',
            'uint256',
            'uint128',
            'uint128',
            'address',
            'bytes',
          ],
          [poolKey, tickLower, tickUpper, liquidity, amount0Max, amount1Max, recipient, '0x']
        ),
        utils.defaultAbiCoder.encode(['address', 'address'], [mockToken0, mockToken1]),
      ];

      const expectedData = utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [actions, params]);

      const encodedData = await uniswapV4Helpers.encodeMintWithHooks(
        mockToken0,
        mockToken1,
        fee,
        tickSpacing,
        tickLower,
        tickUpper,
        liquidity,
        amount0Max,
        amount1Max,
        recipient,
        hooks
      );

      expect(encodedData).to.equal(expectedData);
    });
  });
});
