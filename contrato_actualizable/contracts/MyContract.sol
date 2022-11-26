// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.17;
import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract MyContract is Initializable {
    uint256 public x;

    function initialization(uint256 _x) public initializer {
        x = _x;
    }
    function increment()public{
        x += 100;
    }
}