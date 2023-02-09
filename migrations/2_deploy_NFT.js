const MintNFT = artifacts.require("MintNFT");
const NFT_Shop = artifacts.require("NFT_Shop");

module.exports = async function (deployer) {
  await deployer.deploy(
    MintNFT,
    "https://gateway.pinata.cloud/ipfs/QmUDGgUf8jmD1Ckqqh6Pe9K1P68NjMbVCM7dgoKqURt7LJ"
  );
  const token = await MintNFT.deployed();
  await deployer.deploy(NFT_Shop, token.address);
  const sellToken = await NFT_Shop.deployed();
};
