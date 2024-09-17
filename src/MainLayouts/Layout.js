import React, { useEffect } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");

  useEffect(() => {}, [dispatch]);

  return (
    <Root>

      <div className="top_bar">
        <Navbar/>
      </div>

      <div className="main_bar">
        {userCheck && token && (
          <div className="sideBar">
            <SideBar />
          </div>
        )}
        <div className="main_body">{children}</div>
      </div>
      
    </Root>
  );
}

const Root = styled.section`
  display:flex;
  min-height:100vh;
  height:100%;
  flex-direction: column;
  .top_bar {
    display: flex;
    position: static;
    height: 80px;
    color: #000;
  }
  .main_bar {
    display: flex;
    flex: 1;
    overflow: hidden;
    justify-content: center;
    .sideBar {
      width: 15%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      color: #000;
      display: flex;
      justify-content: center;
    }

    .main_body {
      height: 90%;
      width: 86%;
      padding: 20px;
    }
  }

  @media (max-width: 567px) {
    .main_bar .sideBar {
      width: 15%;
    }

    .main_bar .main_body {
      width: 85%;
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .main_bar .sideBar {
      width: 10%;
    }

    .main_bar .main_body {
      width: 90%;
    }
  }

  @media (min-width: 992px) and (max-width: 1024px) {
    .main_bar .sideBar {
      width: 10%;
    }

    .main_bar .main_body {
      width: 90%;
    }
  }

`;
