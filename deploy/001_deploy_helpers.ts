import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const UNI_POOL_MANAGER_ADDRESS: Record<number, string> = {
  1: '0x000000000004444c5dc75cB358380D2e3dE08A90',
  10: '0x9a13f98cb987694c9f086b1f5eb990eea8264ec3',
  8453: '0x498581ff718922c3f8e6a244956af099b2652b2b',
  42161: '0x360e68faccca8ca495c1b759fd9eee466db9fb32',
  137: '0x67366782805870060151383f4bbff9dab53e5cd6',
  56: '0x28e2ea090877bf75740558f6bfb36a5ffee9e9df',
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, getChainId} = hre;
  const {deterministic} = deployments;
  const {deployer} = await getNamedAccounts();
  const chainId = +(await getChainId());

  if (!chainId) {
    throw new Error('Chain ID is not set');
  }

  const {deploy: deployEnsoShortcutsHelpers} = await deterministic('EnsoShortcutsHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployEnsoShortcutsHelpers();

  const {deploy: deployMathHelpers} = await deterministic('MathHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployMathHelpers();

  const {deploy: deploySignedMathHelpers} = await deterministic('SignedMathHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deploySignedMathHelpers();

  const {deploy: deployPercentageMathHelpers} = await deterministic('PercentageMathHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployPercentageMathHelpers();

  const {deploy: deployTupleHelpers} = await deterministic('TupleHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployTupleHelpers();

  const {deploy: deployDecimalHelpers} = await deterministic('DecimalHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployDecimalHelpers();

  const {deploy: deployUniswapV4Helpers} = await deterministic('UniswapV4Helpers', {
    from: deployer,
    args: [UNI_POOL_MANAGER_ADDRESS[chainId === 31337 ? 1 : chainId]],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployUniswapV4Helpers();

  const {deploy: deploySwapHelpers} = await deterministic('SwapHelpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deploySwapHelpers();

  const {deploy: deployERC20Helpers} = await deterministic('ERC20Helpers', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: true,
  });

  await deployERC20Helpers();

  /*
  if (network.name === 'mainnet') {
    const {deploy: deploySommelierHelpers} = await deterministic('SommelierHelpers', {
      from: deployer,
      args: [],
      log: true,
      autoMine: true,
      skipIfAlreadyDeployed: true,
    });
  
    await deploySommelierHelpers();
  }
  */
};
export default func;
func.tags = ['Helpers'];
