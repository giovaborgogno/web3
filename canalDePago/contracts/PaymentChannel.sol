// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract PaymentChannel {
    address owner;
    mapping(uint256 => bool) usedNonces;

    constructor(){
        owner = msg.sender;
    }

    function moreMoney() public payable {
        require(msg.sender == owner);
    }

    function claimPayment(uint256 _amount, uint256 _nonce, bytes memory _sig)public{
        // comprobacion de que este pago no ha sido utilizado antes
        require(!usedNonces[_nonce], "Payment Used");
        usedNonces[_nonce] = true;

        // recrear el hash del pago
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, _amount, _nonce, address(this)));
        hash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));

        // comprobar que se ha firmado el pago
        require(recoverSigner(hash, _sig) == owner);

        payable(msg.sender).transfer(_amount);
    }

    function recoverSigner(bytes32 message, bytes memory sig)internal pure returns(address){
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)internal pure returns(uint8, bytes32, bytes32){
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly{
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))

        }

        return (v, r, s);
    }
}