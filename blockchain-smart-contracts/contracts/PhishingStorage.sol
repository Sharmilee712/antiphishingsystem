// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PhishingStorage {
    address public owner;

    mapping(string => bool) private phishingURLs;

    event URLFlagged(string url);
    event URLUnflagged(string url);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function flagURL(string memory url) public onlyOwner {
        phishingURLs[url] = true;
        emit URLFlagged(url);
    }

    function unflagURL(string memory url) public onlyOwner {
        phishingURLs[url] = false;
        emit URLUnflagged(url);
    }

    function isPhishing(string memory url) public view returns (bool) {
        return phishingURLs[url];
    }
}
