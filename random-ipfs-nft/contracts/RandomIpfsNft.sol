// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract RandomIpfsNft is VRFConsumerBaseV2{

    // TODO: -When user mint the nft, the nft will be stored in the ipfs



    VRFCoordinatorV2Interface internal i_vrfCoordinator;
    
    constructor(address _vrfCoordinator) VRFConsumerBaseV2(_vrfCoordinator) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);        
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {

    }
}