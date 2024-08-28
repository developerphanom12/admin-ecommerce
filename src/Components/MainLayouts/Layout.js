import React from "react";
// import Footer from "./Footer";
import Navbar from "./Navbar";
import styled from "styled-components";
import SideBar from "./SideBar";

// const Mainbar = styled.section`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   width: 100%;
//   overflow: hidden;
//   min-height: 100vh;
//   height: 100%;

//   .top_bar {
//     background: #ffffff;
//     display: flex;
//     height: 80px;
//     width: 100%;
//   }
//   .main_body {
//     height: 90%;
//     width: 100%;
//   }
// `;

function Layout({ children }) {
  return (
    <Root>
      <div className="top_bar">
        <Navbar/>
      </div>

      <div className="main_bar">
        <div className="sideBar">
          <SideBar/>
        </div>

        <div className="main_body">{children}</div>
      </div>

     
    </Root>
  );
}

export default Layout;

const Root = styled.section`
  display: flex;
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
  .top_bar {
    display: flex;
    position: sticky;
    height: 89px;
    color: #000;
    /* border: 1px solid black; */
  }
  .main_bar {
    display: flex;
    /* flex-direction: column; */
    flex: 1;
    overflow: hidden;
    /* background-color: #fae9e9; */
    .sideBar {
      width: 30%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      color: #000;
      display: flex;
      justify-content: center;
     

      /* @media screen and (min-width: 600px) {
        width: 80px;
      } */
    }

    .main_body {
      height: 90%;
      width: 80%;
      border:1px solid black;
    }
  }

  @media (max-width: 567px) {
    .main_bar .sideBar {
    width: 15%;

}

.main_bar .main_body {
    width: 85%;
    border: 1px solid black;
}

  }
  @media (min-width: 567px) and (max-width: 992px) {
    .main_bar .sideBar {
    width: 10%;

}

.main_bar .main_body {
    width: 90%;
    border: 1px solid black;
}
  }
`;
