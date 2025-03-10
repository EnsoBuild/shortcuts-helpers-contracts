import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, network, getNamedAccounts} = hre;

  const {deterministic} = deployments;

  const {deployer} = await getNamedAccounts();

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
