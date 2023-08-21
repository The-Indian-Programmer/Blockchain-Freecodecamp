// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 
contract BasicNFT is ERC721{
    string public constant TOKEN_URI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    /* State Variables */
    uint256 private tokenCounter;

    /* Contructor */
    constructor() ERC721("BasicNFT", "BNFT") {
        tokenCounter = 0;
    }


    /* Functions */
    function mintNft() external returns(uint256) {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
        return tokenCounter;
    }



    /* Getter Functions */
    function getTokenCounter() external view returns(uint256) {
        return tokenCounter;
    }

    function tokenURI(uint256 /* tokenId */) public pure override returns(string memory) {
        return TOKEN_URI;
    }
}
