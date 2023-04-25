pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract Clock is ChainlinkClient {
    bool public alarmDone;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() public {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        oracle = 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD;
        jobId = "a7ab70d561d34eb49e9b1612fd2e044b";
        fee = 0.1 * 10**18;
        alarmDone=false;
    }

    function requestAlarmClock(uint256 durationInSeconds) public returns(bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillAlarm.selector
        );

        request.addUint("until", block.timestamp + durationInSeconds);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfillAlarm(bytes32 _requestId) public recordChainlinkFulfillment(_requestId) {
        alarmDone = true;
    }

    function withdrawLink() external {
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }
}