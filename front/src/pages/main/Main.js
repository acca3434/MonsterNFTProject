import React, { useRef, useEffect, useState } from "react";
import { useSlideScroll } from "../../hooks/useSlideScroll";
import {
  Main_wrap,
  Main_contents_wrap,
  Main_New,
  Main_New_ul,
  Main_New_li,
  Main_Contents_Img,
} from "./styledCom";
import Web3 from "web3/dist/web3.min.js";

const Main = ({}) => {
  const scrollRef = useSlideScroll();

  const rendering = () => {
    const result = [];
    for (let i = 1; i < 60; i++) {
      result.push(
        <Main_New_li>
          <Main_Contents_Img
            src={`https://gateway.pinata.cloud/ipfs/QmaSHzGMtmQttk7gjdwUoCzvRDkqnA7TaYkmfZMYxErQDs/${i}.png`}
          />
        </Main_New_li>
      );
    }
    return result;
  };

  return (
    <Main_wrap>
      <Main_contents_wrap>
        <h1>OUR MONSTER!!</h1>
        <Main_New>
          <Main_New_ul ref={scrollRef}>{rendering()}</Main_New_ul>
        </Main_New>
      </Main_contents_wrap>
    </Main_wrap>
  );
};

export default Main;
