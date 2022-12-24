// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

interface ERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns(bool);
}

contract ERC165Mapping is ERC165{
    mapping(bytes4 => bool) internal supportedInterfaces;
    constructor() {
        supportedInterfaces[this.supportsInterface.selector] = true;
    }

    function supportsInterface(bytes4 interfaceID) external view returns (bool){
        return supportedInterfaces[interfaceID];
    }
}

interface Numbers {
    function setNumber(uint _num) external;
    function getNumber() external view returns(uint);
}

contract NumbersRooms is ERC165Mapping, Numbers {
    uint num;

    constructor(){
        supportedInterfaces[this.setNumber.selector ^ this.getNumber.selector] = true;
    }

    function setNumber(uint _num) external {
        num = _num;
    }

    function getNumber() external view returns(uint){
        return num;
    }
}