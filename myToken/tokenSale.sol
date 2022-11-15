// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

interface MyToken{
    function decimals()external view returns(uint8);
    function balanceOf(address _address) external view returns(uint256);
    function transfer(address _to, uint256 _value) external returns (bool success);
}

contract TokenSale {
    address owner;
    uint256 price;
    MyToken myTokenContract;
    uint256 tokensSold;

    event Sold(address _buyer, uint256 _amount);

    constructor(uint256 _price, address _addressContract){
        owner = msg.sender;
        price = _price;
        myTokenContract = MyToken(_addressContract);
    }
    function buy(uint256 _numTokens)public payable{
        require(msg.value == (price * _numTokens));
        uint256 scaledAumount = (_numTokens * uint256(10) ** myTokenContract.decimals());
        require(myTokenContract.balanceOf(address(this)) >= scaledAumount);
        tokensSold += _numTokens;
        require(myTokenContract.transfer(msg.sender, scaledAumount));
        emit Sold(msg.sender, _numTokens);
    }

    function endSold()public{
        require(msg.sender == owner);
        require(myTokenContract.transfer(owner, myTokenContract.balanceOf(address(this))));
        payable(msg.sender).transfer(address(this).balance);
    }

}