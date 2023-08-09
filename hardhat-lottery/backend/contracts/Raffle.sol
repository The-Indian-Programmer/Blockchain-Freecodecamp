/* 
1. Entre the raffle by paying some amount 
    a. 1 ticket = 0.01 ETH
    b. 1 person can buy 1 ticket 
    

2. Pick a winner
3. Winner to be selected every minutes (Automatically by chainlink) 
*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";


error Raffle_NotEnoughFee();
error Raffle_AmountSendFailedToRecentWinner();


contract Raffle is VRFConsumerBaseV2{
    /* State Variables */
    uint256 private immutable i_enteraneFee;
    address payable[] private i_participants;
    VRFCoordinatorV2Interface private i_vrfCoordinatorV2;
    bytes32 private immutable i_ganLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 2;
    

    /* Lottery Winners */
    address private s_recentWinner;


    /* Events */
    event Raffle_Entered(address indexed _from, uint256 _amount);
    event Raffle_RequestedRandomWinner(uint256 indexed requestId);
    event Raffle_PickedRandomWinner(address indexed _winner, uint256 _amount);
    
    
    constructor(address vrfCoordinatorV2, uint256 _enteranceFee, bytes32  ganLane, uint64 subscriptionId, uint32 callbackGasLimit) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_enteraneFee = _enteranceFee;
        i_vrfCoordinatorV2 = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_ganLane = ganLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }


    // function to enter the raffle
    function enterRaffle() external payable returns (bool){
        if (msg.value < i_enteraneFee) revert Raffle_NotEnoughFee();

        i_participants.push(payable(msg.sender));
        // Emit an event whenever we update the state varibles or mapping
        emit Raffle_Entered(msg.sender, msg.value);

        return true;
    }


    // function to pick random winner
    function pickRandomWinner() external {
        uint256 requestId  = i_vrfCoordinatorV2.requestRandomWords(
            i_ganLane,//
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS//
        );
        emit Raffle_RequestedRandomWinner(requestId);
    }


    // fulfillRandomness function
    function fulfillRandomWords(uint256 /* requestID */, uint256[] memory randomWords) internal override {
        uint256 randomNum = randomWords[0];
        uint256 winnerIndex = randomNum % i_participants.length;
        address payable recentWinner = i_participants[winnerIndex]; 
        s_recentWinner = recentWinner;

        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) revert Raffle_AmountSendFailedToRecentWinner();

        emit Raffle_PickedRandomWinner(recentWinner, address(this).balance);
    }




    // ***************************************** view and pure functions *********************************************************

    // function to get the enterance fee
    function getEnteranceFee() external view returns (uint256) {
        return i_enteraneFee;
    }


    // function to get the participants by index
    function getParticipant(uint256 _index) external view returns (address payable) {
        return i_participants[_index];
    }


    // function to get the participants
    function getParticipants() external view returns (address payable[] memory) {
        return i_participants;
    }


    // function to get the recent winner
    function getRecentWinner() external view returns (address) {
        return s_recentWinner;
    }
}