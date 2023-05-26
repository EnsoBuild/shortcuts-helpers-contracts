pragma solidity ^0.8.16;

/**
 * @notice Helper contract to encode Balancer userData
 */

contract BalancerHelpers {
    uint256 public constant VERSION = 1;

    function encodeDataForJoinKindOne(uint256 joinKind, uint256[] memory amounts, uint256 minimumBPT)
        public
        pure
        returns (bytes memory)
    {
        return abi.encode(joinKind, amounts, minimumBPT);
    }

     function encodeDataForExitKindZero(uint256 exitKind, uint256 amount, uint256 tokenIndex)
        public
        pure
        returns (bytes memory)
    {

        return abi.encode(exitKind, amount, tokenIndex);
    }
}