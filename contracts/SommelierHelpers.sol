// SPDX-License-Identifier: MIT
/* THIS CONTRACT IS COMMENTED OUT SINCE IT REQUIRES A HIGHER VERSION BUT
   UPGRADING VERSION CAUSES TESTS TO FAIL AT DEPLOYMENT FOR OTHER CONTRACTS

pragma solidity ^0.8.20;

import { SafeERC20, IERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IERC4626 {
    function asset() external returns (address);
    function deposit(uint256 assets, address receiver) external returns (uint256);
}

/**
 * @notice Helper contract to handle Sommelier receiver
 */
 /*
contract SommelierHelpers {
    using SafeERC20 for IERC20;

    uint256 public constant VERSION = 2;

    error InvalidReceiver(address sender, address receiver);

    function depositToReceiver(IERC4626 vault, uint256 assets, address receiver)
        external
        returns (uint256)
    {
        // Only support when tx is called by receiver
        if (tx.origin != receiver) revert InvalidReceiver(msg.sender, receiver);
        IERC20 token = IERC20(vault.asset());
        token.transferFrom(msg.sender, address(this), assets);
        if (token.allowance(address(this), address(vault)) != 0) {
            // Reset approval just in case
            token.approve(address(vault), 0);
        }
        token.approve(address(vault), assets);
        return vault.deposit(assets, receiver);
    }
}
*/