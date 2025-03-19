// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract UniswapV4Helpers {
    uint256 internal constant MINT_POSITION = 0x02;
    uint256 internal constant MINT_POSITION_FROM_DELTAS = 0x05;
    uint256 internal constant SETTLE_PAIR = 0x0d;

    struct PoolKey {
        address currency0;
        address currency1;
        uint24 fee;
        int24 tickSpacing;
        address hooks;
    }

    function getPoolKey(
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        address hooks
    ) public pure returns (PoolKey memory) {
        return PoolKey({currency0: currency0, currency1: currency1, fee: fee, tickSpacing: tickSpacing, hooks: hooks});
    }

    function encodeMintWithHooks(
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        int24 tickLower,
        int24 tickUpper,
        uint256 liquidity,
        uint128 amount0Max,
        uint128 amount1Max,
        address recipient,
        address hooks
    ) public pure returns (bytes memory) {
        bytes memory actions = abi.encodePacked(uint8(MINT_POSITION), uint8(SETTLE_PAIR));

        bytes[] memory params = new bytes[](2);

        {
            params[0] = abi.encode(
                getPoolKey(currency0, currency1, fee, tickSpacing, hooks),
                tickLower,
                tickUpper,
                liquidity,
                amount0Max,
                amount1Max,
                recipient,
                bytes("")
            );
        }
        params[1] = abi.encode(currency0, currency1);

        return abi.encode(actions, params);
    }

    function encodeMint(
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        int24 tickLower,
        int24 tickUpper,
        uint256 liquidity,
        uint128 amount0Max,
        uint128 amount1Max,
        address recipient
    ) external pure returns (bytes memory) {
        return
            encodeMintWithHooks(
                currency0,
                currency1,
                fee,
                tickSpacing,
                tickLower,
                tickUpper,
                liquidity,
                amount0Max,
                amount1Max,
                recipient,
                address(0)
            );
    }

    function encodeMintFromDeltasWithHooks(
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        int24 tickLower,
        int24 tickUpper,
        uint128 amount0Max,
        uint128 amount1Max,
        address recipient,
        address hooks
    ) public pure returns (bytes memory) {
        bytes memory actions = abi.encodePacked(uint8(MINT_POSITION_FROM_DELTAS), uint8(SETTLE_PAIR));
        bytes[] memory params = new bytes[](2);

        params[0] = abi.encode(
            getPoolKey(currency0, currency1, fee, tickSpacing, hooks),
            tickLower,
            tickUpper,
            amount0Max,
            amount1Max,
            recipient,
            bytes("")
        );
        params[1] = abi.encode(currency0, currency1);

        return abi.encode(actions, params);
    }

    function encodeMintFromDeltas(
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        int24 tickLower,
        int24 tickUpper,
        uint128 amount0Max,
        uint128 amount1Max,
        address recipient
    ) external pure returns (bytes memory) {
        return
            encodeMintFromDeltasWithHooks(
                currency0,
                currency1,
                fee,
                tickSpacing,
                tickLower,
                tickUpper,
                amount0Max,
                amount1Max,
                recipient,
                address(0)
            );
    }
}
