import styledEngine from "@mui/styled-engine";
import styled from "styled-components";

const Mypage_Wrap = styled.div`
  width: calc(100% - 100px);
  height: 100%;
  margin-top: 50px;
  padding-left: 150px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Account_Title = styled.h1``;

const Mypage_Have_NFT = styled.div`
  width: 100%;
`;

const NFT_Wrap = styled.div`
  display: flex;
  padding-top: 30px;
  width: calc(100%-100px);
  padding-right: 100px;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
  border-top: 3px solid gray;
`;

const NFT_Title = styled.div`
  font-size: 30px;
`;

const NFT_Img = styled.img`
  width: 350px;
  border-radius: 40px;
  box-shadow: 0 0 5px gray, 0 0 10px gray;
`;

const NFT_Sell_Price = styled.input`
  width: 220px;
  height: 40px;
  border: none;
  border-bottom: 2px solid hotpink;
  :focus {
    border-bottom: 4px solid hotpink;
    outline: none;
  }
`;

const NFT_Sell_Btn = styled.button`
  width: 150px;
  height: 45px;
  font-size: 20px;
  color: white;
  border: none;
  background-color: blueviolet;
  border-radius: 25px;
  cursor: pointer;
`;

export {
  Mypage_Wrap,
  Account_Title,
  Mypage_Have_NFT,
  NFT_Wrap,
  NFT_Img,
  NFT_Title,
  NFT_Sell_Price,
  NFT_Sell_Btn,
};
