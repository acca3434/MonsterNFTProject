import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3/dist/web3.min";
import NFT_Shop from "../../contract/NFT_Shop.json"; // Import the contract JSON file
import MintNFT from "../../contract/MintNFT.json";
import {
  Mypage_Wrap,
  Account_Title,
  Mypage_Have_NFT,
  NFT_Wrap,
  NFT_Img,
  NFT_Title,
  NFT_Sell_Price,
  NFT_Sell_Btn,
} from "./styledCom";

const Mypage = ({ isLogin }) => {
  const [userAccount, setUserAccount] = useState(null);
  const [deployedShop, setDeployedShop] = useState(null);
  const [deployedMint, setDeployedMint] = useState(null);
  const [tokenImg, setTokenImg] = useState([]);
  const [tokenInfo, setTokenInfo] = useState([{}]);
  const [_web3, set_web3] = useState();
  const [_ca, set_Ca] = useState();
  const [mintCa, setMintCa] = useState();
  const [mintAbi, setMintAbi] = useState();
  const [_NFT_Price, set_NFT_Price] = useState(100000000000000);

  const selltoken = (e) => {
    deployedMint.methods
      .setApprovalForAll(_ca, true)
      .send({ from: userAccount });
    console.log(e.edition);
    deployedShop.methods
      .SellsToken(e.edition, _NFT_Price)
      .send({ from: userAccount });
  };
  useEffect(() => {
    const fetchData = async () => {
      const web3 = new Web3(window.ethereum);
      set_web3(web3);
      await web3.eth.getAccounts().then((accounts) => {
        setUserAccount(accounts[0]);
      });
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const MintCA = MintNFT.networks[networkId].address;
      setMintCa(MintCA);

      const MintABI = MintNFT.abi;
      setMintAbi(MintABI);

      const CA = NFT_Shop.networks[networkId].address;
      set_Ca(CA);

      const abi = NFT_Shop.abi;

      const deployedMint = new web3.eth.Contract(MintABI, MintCA);
      setDeployedMint(deployedMint);

      const deployedShop = new web3.eth.Contract(abi, CA);
      setDeployedShop(deployedShop);

      const ownerinfo = await deployedShop.methods
        .getTokenInforOrAccount(userAccount)
        .call();

      const fetchImages = async () => {
        let a = [];
        for (let i = 0; i < ownerinfo.length; i++) {
          a.push(await fetch(ownerinfo[i]).then((res) => res.json()));
        }
        setTokenInfo(a.map((data) => data));
      };

      fetchImages();
    };

    fetchData();
  }, [userAccount]);

  return (
    <Mypage_Wrap>
      {isLogin ? (
        <Mypage_Have_NFT>
          <Account_Title> &nbsp;&nbsp;내 지갑 : {userAccount}</Account_Title>
          {tokenImg
            ? tokenInfo.map((e) => {
                return (
                  <NFT_Wrap>
                    <NFT_Title>{`${e.name}`}</NFT_Title>
                    <NFT_Img src={e.image} />
                    <NFT_Sell_Price
                      placeholder="판매 가격(eth)"
                      type="number"
                      onChange={(e) => {
                        set_NFT_Price(e.target.value);
                      }}
                    />
                    <NFT_Sell_Btn
                      onClick={() => {
                        selltoken(e);
                      }}
                    >
                      판매등록
                    </NFT_Sell_Btn>
                  </NFT_Wrap>
                );
              })
            : null}
        </Mypage_Have_NFT>
      ) : (
        <div>로그인 해주세요.</div>
      )}
    </Mypage_Wrap>
  );
};

export default Mypage;
