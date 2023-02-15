// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";

// import "./gazeaErc20.sol";

contract MintNFT is ERC721Enumerable, Ownable {
    // 누가 어떤 NFT를 뽑았나 이벤트
    // event nftTokenList(address nftTokenAddress,uint256 nftTokenNum);
    // NFT토큰의 최대량
    uint256 public constant MAX_TOKEN_COUNT = 60;
    // mint할때마다 가격 기준
    uint256 public mint_price = 0.005 ether;
    // meta URI
    string public metadataURI;
    uint256 tokenId = 1;
    mapping(address => uint256) buyer;
    uint256[] public tokenCount;

    constructor(
        // string memory _name,
        // string memory _symbol,
        string memory _metadataURI
    ) ERC721("NAME", "SYMBOL") {
        metadataURI = _metadataURI;
        // NFT 배열에 대한 동적 할당
        // for(uint i = 1; i<=MAX_TOKEN_COUNT; i++){
        //     tokenCount.push(i);
        //     _mint(msg.sender, i);
        // }
    }

    // 1~100까지 배열 동적 변수
    // 민트하는 함수
    function mintToken() public payable {
        require(
            msg.value > mint_price,
            "Your minting value is less than our minting standard"
        );
        // sold-out
        require(
            MAX_TOKEN_COUNT > totalSupply(),
            "You've exceeded the value that you can mint per day"
        );
        require(buyer[msg.sender] < 3, "limit Excess");
        uint256 total = totalSupply() +1;
        uint256 tokenId = uint256(keccak256(abi.encodePacked(msg.sender,total,block.timestamp))) % 60;
        getRandomNum(tokenId);
        emit nftTokenList(msg.sender,tokenId);
        payable(Ownable.owner()).transfer(msg.value);
        _mint(msg.sender, tokenId);
        tokenId++;
        buyer[msg.sender]++;
    }

    // function getRandomNum(uint256 randomNum) private {
    //     // 토큰의 데이터를 저장할 변수
    //     for(uint i = randomNum; i<tokenCount.length -1; i++){
    //             tokenCount[i] = tokenCount[i+1];
    //     }
    //     tokenCount.pop();
    // }
    // 민팅하기 위해서 필요한 URI들을 리턴
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory _tokenIdString = string(Strings.toString(_tokenId));
        return
            string(abi.encodePacked(metadataURI, "/", _tokenIdString, ".json"));
    }
    // 메타데이터의 주소값을 얻는 함수
    function setMetadataURI(string memory _uri) public {
        metadataURI = _uri;
    }

    function mint(uint256 _tokenId) public {
        _mint(msg.sender, _tokenId);
    }
    // 민트 발행 자동화
    function mintArr(uint256 _tokenId) public {
        for (uint256 i = 1; i < _tokenId; i++) {
            _mint(msg.sender, i);
        }
    }
    // 가지고 있는 토큰을 삭제하는것
    function burn(uint256 _tokenId) public {
        _burn(_tokenId);
    }
    // 민트 발행의 삭제 자동화
    function burnArr(uint256 _tokenId) public {
        for (uint256 i = 1; i < _tokenId; i++) {
            _burn(i);
        }
    }
    // 토큰의 발행 개수 확인하는 것
    function getTokenCount() public view returns (uint256[] memory) {
        return tokenCount;
    }
}
