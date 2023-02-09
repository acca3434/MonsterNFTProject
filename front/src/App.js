import "./App.css";
import { Main, Minting, Shop, Mypage } from "./pages";
import { Header, Loading } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Web3 from "web3/dist/web3.min.js";
import { Alert, Stack, AlertTitle } from "@mui/material";
import MintNFT from "../src/contract/MintNFT.json";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [getTokenURI, setTokenURI] = useState([]);
  const [getBalance, setGetBalance] = useState();
  const [CA, setCA] = useState(null);
  const [ABI, setABI] = useState(null);
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  //================== 메타마스크 로그인 ====================
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const getAccounts = async () => {
    const _accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(_accounts[0]);
    return _accounts;
  };

  const login = async () => {
    try {
      const [_accounts] = await getAccounts();
      console.log(_accounts);
      const web3 = new Web3(window.ethereum);
      console.log(web3);
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const CA = MintNFT.networks[networkId].address;
      const _abi = MintNFT.abi;
      const Deployed = await new web3.eth.Contract(_abi, CA);
      const count = await Deployed.methods.getTokenCount().call();
      const getOwnerBalance = await web3.eth.getBalance(_accounts);
      if (_accounts) setIsLogin(true);
      setCA(CA);
      setABI(_abi);
      setDeployed(Deployed);
      setWeb3(web3);
      setCount(count);
      setGetBalance(getOwnerBalance);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Header
          isLogin={isLogin}
          theme={theme}
          setTheme={setTheme}
          login={login}
        />
        <Routes>
          <Route
            path="/"
            element={<Main getTokenURI={getTokenURI} isLogin={isLogin} />}
          />
          <Route
            path="/minting"
            element={<Minting account={account} CA={CA} ABI={ABI} isLogin={isLogin} />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/mypage"
            element={<Mypage web3={web3} account={account} isLogin={isLogin} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
