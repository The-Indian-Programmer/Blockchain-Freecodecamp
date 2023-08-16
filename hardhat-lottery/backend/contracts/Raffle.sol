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
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error Raffle_NotEnoughFee();
error Raffle_AmountSendFailedToRecentWinner();
error Raffle_NotOpen();
error Raffle_NotUpKeepNeeded(uint256 balance, uint256 participants, bool isOpen, uint256 lastTimeStamp);

contract Raffle is VRFConsumerBaseV2, KeeperCompatibleInterface {
    /* Type Declaration */
    enum RaffleState {
        OPEN,
        CALCULATING
    }

    /* State Variables */
    uint256 private immutable i_enteraneFee;
    address payable[] private i_participants;
    VRFCoordinatorV2Interface private i_vrfCoordinatorV2;
    bytes32 private immutable i_ganLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 2;
    RaffleState private s_raffleState;

    /* Lottery Winners */
    address private s_recentWinner;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_timeInterval;

    /* Events */
    event Raffle_Entered(address indexed _from, uint256 _amount);
    event Raffle_RequestedRandomWinner(uint256 indexed requestId);
    event Raffle_PickedRandomWinner(address indexed _winner, uint256 _amount);

    constructor(
        address vrfCoordinatorV2,
        uint256 _enteranceFee,
        bytes32 ganLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_enteraneFee = _enteranceFee;
        i_vrfCoordinatorV2 = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_ganLane = ganLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        s_raffleState = RaffleState.OPEN;
        s_lastTimeStamp = block.timestamp;
        i_timeInterval = interval;
    }

    // function to enter the raffle
    function enterRaffle() external payable returns (bool) {
        if (msg.value < i_enteraneFee) revert Raffle_NotEnoughFee();
        if (s_raffleState != RaffleState.OPEN) revert Raffle_NotOpen();

        i_participants.push(payable(msg.sender));
        // Emit an event whenever we update the state varibles or mapping
        emit Raffle_Entered(msg.sender, msg.value);

        return true;
    }

    // function to pick random winner
    

    function checkUpkeep(
        bytes memory /* checkData */
    ) public override view returns  (bool upkeepNeeded, bytes memory /* performData */) {
        // upkeepNeeded = true;
        // performData = checkData;
        bool isOpen = (s_raffleState == RaffleState.OPEN);
        bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_timeInterval);
        bool enoughParticipants = (i_participants.length > 0);
        bool hasBalance = (address(this).balance > 0);

        upkeepNeeded = (isOpen && timePassed && enoughParticipants && hasBalance);
        return (upkeepNeeded, bytes(""));
    }

    function performUpkeep(bytes calldata /*performData */) external override {
        
        // // check if the checkUpkeep function returns true
        // if (checkUpkeep(bytes("")) == false) return;

        (bool upKeepNeeded, ) = checkUpkeep("");

        if (!upKeepNeeded) revert Raffle_NotUpKeepNeeded(address(this).balance, i_participants.length , s_raffleState == RaffleState.OPEN , s_lastTimeStamp);
        
        
        s_raffleState = RaffleState.CALCULATING;
        uint256 requestId = i_vrfCoordinatorV2.requestRandomWords(
            i_ganLane, //
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS //
        );
        s_raffleState = RaffleState.OPEN;
        i_participants = new address payable[](0);
        emit Raffle_RequestedRandomWinner(requestId);
    }

    // fulfillRandomness function
    function fulfillRandomWords(uint256 /* requestID */, uint256[] memory randomWords) internal override {
        uint256 randomNum = randomWords[0];
        uint256 winnerIndex = randomNum % i_participants.length;
        address payable recentWinner = i_participants[winnerIndex];
        s_recentWinner = recentWinner;
        s_lastTimeStamp = block.timestamp;


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
    function getParticipant(
        uint256 _index
    ) external view returns (address payable) {
        return i_participants[_index];
    }

    // function to get the participants
    function getParticipants()
        external
        view
        returns (address payable[] memory)
    {
        return i_participants;
    }

    // function to get the recent winner
    function getRecentWinner() external view returns (address) {
        return s_recentWinner;
    }

    // function to get raffle state
    function getRaffleState() external view returns (RaffleState) {
        return s_raffleState;
    }

    // function to get the last time stamp
    function getLastTimeStamp() external view returns (uint256) {
        return s_lastTimeStamp;
    }


    // function to get the time interval
    function getTimeInterval() external view returns (uint256) {
        return i_timeInterval;
    }

    // function to get the balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }


    // funciton to get the num  words
    function getNumWords() external pure returns (uint32) {
        return NUM_WORDS;
    } 
}
