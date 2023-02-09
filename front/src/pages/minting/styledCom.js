import styled from "styled-components";

const Minting_Wrap = styled.div`
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

const Minting_Image_Wrap = styled.div`
  width: calc(100% - 150px);
  height: 500px;
  /* border: 1px solid pink; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Minting_Button = styled.button`
  font-size: 50px;
  width: 400px;
  height: 100px;
  border-radius: 20px;
  border: 3px solid blueviolet;
  box-shadow: 0 0 5px blueviolet, 0 0 10px blueviolet;
  background-color: inherit;
  cursor: pointer;
`;

const Cube_Wrap = styled.div`
  position: relative;
  top: -120px;
  width: 220px;
  height: 220px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: animate 10s linear infinite;
  @keyframes animate {
    0% {
      transform: rotateX(-30deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(-30deg) rotateY(360deg);
    }
  } ;
`;

const Cube_Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const Cube_Box_Top = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: #151515;
  transform: rotateX(90deg) translateZ(100px);
`;

const Cube_Shadow = styled.div`
  position: absolute;
  top: -40px;
  left: -40px;
  width: 300px;
  height: 300px;
  background: rgb(228, 69, 94);
  transform: rotateX(90deg) translateZ(-150px);
  animation: fire 1s linear infinite;
  @keyframes fire {
    0% {
      transform: rotateX(90deg) translateZ(-150px) scale(1);
    }
    50% {
      transform: rotateX(90deg) translateZ(-150px) scale(1.2);
    }
    100% {
      transform: rotateX(90deg) translateZ(-150px) scale(1);
    }
  }
  filter: blur(30px);
  box-shadow: 0 0 120px rgba(228, 69, 94, 0.2), 0 0 200px rgba(228, 69, 94, 0.4),
    0 0 300px rgba(228, 69, 94, 0.6), 0 0 400px rgba(228, 69, 94, 0.8),
    0 0 500px rgba(228, 69, 94, 1);
`;

const Cube_Box_Mesh = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: linear-gradient(#151515, rgb(228, 69, 94));
  transform: rotateY(calc(90deg * ${(props) => props.ii})) translateZ(109px);
`;

const MINT_NFT_Wrap = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`;

export {
  Minting_Wrap,
  Minting_Image_Wrap,
  Cube_Wrap,
  Cube_Box,
  Cube_Box_Top,
  Cube_Shadow,
  Cube_Box_Mesh,
  Minting_Button,
  MINT_NFT_Wrap,
};
