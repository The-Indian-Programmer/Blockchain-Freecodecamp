// SPDX-License-Identifier: MIT


pragma solidity ^0.8.7;

/* Library Imports */
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/* Error Messages */
error NftMarketPlace__PriceShouldBeGreaterThanZero();
error NftMarketPlace__NftNotApprovedForMarketPlace();
error NftMarketPlace__NftAlreadyListed(address nftAddress, uint256 tokenId);
error NftMarketPlace__NotNFTOwner(address nftAddress, uint256 tokenId);
error NftMarketPlace__NftNotListed(address nftAddress, uint256 tokenId);
error NftMarketPlace__AlreadyNFTOwner(address nftAddress, uint256 tokenId);
error NftMarketPlace__NotSufficientAmountForNFT(address nftAddress, uint256 tokenId, uint256 price);
error NftMarketPlace__NotHaveSufficientAmount(address user);
error NftMarketPlace__WithDrawFailed(address user, uint256 amount);





contract NftMarketPlace is ReentrancyGuard {



    /* Events */
    event NFTItemAddedToList(address indexed nftAddress, uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTItemBought(address indexed nftAddress, uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTItemCanceled(address indexed nftAddress, uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTItemUpdated(address indexed nftAddress, uint256 indexed tokenId, uint256 price, address indexed seller);
    event AmountWithDrawn(address indexed user, uint256 indexed amount);


    /* Structs */
    struct Listing {
        uint256 price;
        address seller;
    }


    /* State Variable */
    mapping(address => mapping(uint256 => Listing)) private s_listings; /* NFTAddress => tokenId => seller */
    mapping(address => uint256) private s_balances; /* seller => balance */
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    /* Modifiers */
    modifier NFTListed (address nftAddress, uint256 tokenId, address seller) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.seller != address(0)) revert NftMarketPlace__NftAlreadyListed(nftAddress, tokenId);
        _;
    }

    modifier notOwnerOfNFT (address nftAddress, uint256 tokenId, address seller) {
        IERC721 nft = IERC721(nftAddress);
        if (nft.ownerOf(tokenId) != seller) revert NftMarketPlace__NotNFTOwner(nftAddress, tokenId);
        _;
    }

    modifier NftNotListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.seller == address(0)) revert NftMarketPlace__NftNotListed(nftAddress, tokenId);
        _;
    } 

    modifier isOwnerOfNFT(address nftAddress, uint256 tokenId, address buyer) {
        IERC721 nft = IERC721(nftAddress);
        if (nft.ownerOf(tokenId) == buyer) revert NftMarketPlace__AlreadyNFTOwner(nftAddress, tokenId);
        _;
    }


    /* Function to list the NFT Item */
    function listNFTItem(address nftAddress, uint256 tokenId, uint256 price) external NFTListed(nftAddress, tokenId, msg.sender) notOwnerOfNFT(nftAddress, tokenId, msg.sender) returns (bool) {
        if (price <= 0) revert NftMarketPlace__PriceShouldBeGreaterThanZero();

        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) revert NftMarketPlace__NftNotApprovedForMarketPlace();

        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit NFTItemAddedToList(nftAddress, tokenId, price, msg.sender);
        return true;
    }

    /* Function to buy the NFT Item */
    function buyNFTItem(address nftAddress, uint256 tokenId) external payable NftNotListed(nftAddress, tokenId) isOwnerOfNFT(nftAddress, tokenId, msg.sender) nonReentrant returns (bool) {
            Listing memory nftListing = s_listings[nftAddress][tokenId];
            if (msg.value < nftListing.price) revert NftMarketPlace__NotSufficientAmountForNFT(nftAddress, tokenId, msg.value);
            s_balances[nftListing.seller] += msg.value;
            delete s_listings[nftAddress][tokenId];

            IERC721(nftAddress).safeTransferFrom(nftListing.seller, msg.sender, tokenId);
            emit NFTItemBought(nftAddress, tokenId, msg.value, msg.sender);
            return true;
    }

    /* Function to cancel item from the marketplace */
    function cancelNFTItem(address nftAddress, uint256 tokenId) external isOwnerOfNFT(nftAddress, tokenId, msg.sender) NftNotListed(nftAddress, tokenId) returns (bool) {
        Listing memory nftListing = s_listings[nftAddress][tokenId];
        delete s_listings[nftAddress][tokenId];
        emit NFTItemCanceled(nftAddress, tokenId, nftListing.price, msg.sender);
        return true;
    }

    /* Function to update the NFT Listing */
    function updateNFTItem(address nftAddress, uint256 tokenId, uint256 price) external isOwnerOfNFT(nftAddress, tokenId, msg.sender) NftNotListed(nftAddress, tokenId) returns(bool) {
        if (price <= 0) revert NftMarketPlace__PriceShouldBeGreaterThanZero();

        Listing memory nftListing = s_listings[nftAddress][tokenId];
        nftListing.price = price;
        s_listings[nftAddress][tokenId] = nftListing;
        emit NFTItemUpdated(nftAddress, tokenId, price, msg.sender);
        return true;
    }

    /* Function to withdraw the amount from the marketplace */
    function withDrawAmount() external returns (bool) {
        uint256 amount = s_balances[msg.sender];
        if (amount <= 0) revert NftMarketPlace__NotHaveSufficientAmount(msg.sender);

        s_balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert NftMarketPlace__WithDrawFailed(msg.sender, amount);
        emit AmountWithDrawn(msg.sender, amount);
        return true;
    }



    /* ------------------------------- Getter Functions ------------------------------- */
    /* Function to get the NFT Listing */
    function getListing(address nftAddress, uint256 tokenId) external view returns (Listing memory) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        return listing;
    }

    /* Function to get the NFT Listing Price */
    function getListingPrice(address nftAddress, uint256 tokenId) external view returns (uint256) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        return listing.price;
    }

    /* Function to get the NFT Listing Seller */
    function getListingSeller(address nftAddress, uint256 tokenId) external view returns (address) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        return listing.seller;
    }

    /* Function to get the NFT Listing Seller */
    function getListingSellerBalance(address seller) external view returns (uint256) {
        return s_balances[seller];
    }

    /* Function to get the NFT MarketPlace Owner */
    function getOwner() external view returns (address) {
        return owner;
    }

    /* Function to get the NFT Marketplace Address */
    function getMarketPlaceAddress() external view returns (address) {
        return address(this);
    }
}