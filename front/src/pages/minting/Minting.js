import React, { Suspense, useState, useEffect } from "react";
import {
  Minting_Wrap,
  Minting_Image_Wrap,
  Cube_Wrap,
  Cube_Box,
  Cube_Box_Top,
  Cube_Shadow,
  Cube_Box_Mesh,
  Minting_Button,
  MINT_NFT_Wrap,
} from "./styledCom";
import Web3 from "web3/dist/web3.min";
import MintNFT from "../../../src/contract/MintNFT.json";
import NFT_Shop from "../../contract/NFT_Shop.json";

const Minting = ({ isLogin, account, CA, ABI, login }) => {
  const [account1, setAccunt1] = useState(account);
  const [_CA, set_CA] = useState(CA);
  const [_ABI, set_ABI] = useState(ABI);
  const [deployed, setDeployed] = useState(null);
  const [userAccount, setUserAccount] = useState(null);

  const popUp = async () => {
    console.log(account1);
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const CA = MintNFT.networks[networkId].address;
    const abi = MintNFT.abi;
    const Deployed = await new web3.eth.Contract(abi, CA);
    // console.log("!!!!!!!!!!!!!!", await Deployed.methods.mintToken().call({ value: web3.utils.toWei("0.05", "ether") }))
    console.log(account1);
    await Deployed.methods.mintToken().send({
      from: account1,
      value: web3.utils.toWei("0.05", "ether"),
    });
  };

  const [active, setActive] = useState("none");
  const result = async () => {
    const web3 = new Web3(window.ethereum);
    const Deployed = await new web3.eth.Contract(ABI, CA);
    const count = await Deployed.methods.getTokenCount().call();
    const _result = await Deployed.methods.tokenURI(count).call();
    console.log(_result);
    return <MINT_NFT_Wrap>{/* <img src={}/> */}</MINT_NFT_Wrap>;
  };

  useEffect(() => {
    const fetchData = async () => {
      let currentAccount;
      const _web3 = await new Web3(window.ethereum);
      // const Deployed = await new _web3.eth.Contract(_ABI, _CA);
      await _web3.eth.getAccounts().then(function (accounts) {
        currentAccount = accounts[0];
        setUserAccount(currentAccount);
      });
      const networkId = await _web3.eth.net.getId();
      const __CA = NFT_Shop.networks[networkId].address;
      const __abi = NFT_Shop.abi;
      const DeployedShop = await new _web3.eth.Contract(__abi, __CA);
      const _haveNFT = async () => {
        await DeployedShop.methods.getOwnerToken(currentAccount).call({
          from: currentAccount,
          to: __CA,
        });
      };
      _haveNFT();
    };
    fetchData();
  }, []);

  return (
    <Minting_Wrap>
      <div>
        {isLogin ? (
          <Minting_Button
            onClick={() => {
              popUp();
              // result();
            }}
          >
            Minting GO!
          </Minting_Button>
        ) : (
          <Minting_Button onClick={login}>Login GO!</Minting_Button>
        )}
      </div>
      <Minting_Image_Wrap>
        <Cube_Wrap>
          <Cube_Box_Top></Cube_Box_Top>
          <Cube_Box>
            <Cube_Box_Mesh ii={0}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={1}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={2}></Cube_Box_Mesh>
            <Cube_Box_Mesh ii={3}></Cube_Box_Mesh>
          </Cube_Box>
          <Cube_Shadow></Cube_Shadow>
        </Cube_Wrap>
      </Minting_Image_Wrap>
    </Minting_Wrap>
  );
};

export default Minting;
