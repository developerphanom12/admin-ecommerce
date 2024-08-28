import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
// import wallet from "../../src/Assets/Images/3dwallet.png";
// import bell from "../../src/Assets/Images/bell.png";
// import logo from "../../src/Assets/Images/logo.png";
// import profile from "../../src/Assets/Images/profile.png";
// import { NavHeader, NavRecharge, WalletBal } from "../Components/Global";

function NavBarr() {
  return (
    <Root>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">
            <a href="logo">
              {" "}
              {/* <img src={logo} alt="log" className="main_logo" />{" "} */}
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="nabspacing">
            <Nav>
              <Nav.Link href="fashion">
                {/* <NavHeader>Overview</NavHeader> */}
                Overview
              </Nav.Link>
            </Nav>

            <div className="right_content">
              <div className="shoot_btn">
                <div className="wallet">
                  <div className="wallet-img">
                    {/* <img src={wallet} alt="" /> */}
                    <div className="wallet-amt">
                      <span>
                        {/* <WalletBal></WalletBal> */}
                        $570
                      </span>
                    </div>
                  </div>
                </div>
                <div className="Recharge">
                  <span>
                    <a href="">
                      {/* <NavRecharge></NavRecharge> */}
                      Recharge Wallet
                    </a>
                  </span>
                </div>
                <a href="">
                  {/* <img src={bell} alt="" /> */}
                </a>
                <div className="profile">
                  <span className="profile-pic circleBase ">
                    {/* <img src={profile} alt="" className="img" /> */}
                  </span>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Root>
  );
}

export default NavBarr;

const Root = styled.section`
  width: 100%;
  .top_bar {
    width: 1252px;
    height: 86.743px;
    flex-shrink: 0;
  }

  .bg-body-tertiary {
    background-color: #ccebf7 !important;
    height: 87px;
    border:1px solid #ccebf7 ;
  }

  a.nav-link {
    font-family: Bayon;
    font-size: 16px;
    font-weight: 400;
    line-height: 28.91px;
    /* letter-spacing: 0.02em; */
    text-align: left;
    color: #6e6e6e;
    padding: 0 26px 0 0 !important;
  }

  .navbar-expand-lg .navbar-nav {
    gap: 30px;
  }
  .navbar-brand {
    margin: 0 13px;
  }
  .nabspacing {
    justify-content: space-between;
    padding: 7px 12px;
    border-left: 1px solid #e6eff5;
  }

  .right_content {
    display: flex;
    gap: 20px;

    .contact_div {
      display: flex;
      gap: 10px;
      align-items: center;

      a {
        font-size: 16px;
        font-weight: 400;
        /* line-height: 28.91px; */
        text-align: left;
        color: #292a36;
        text-decoration: none;
      }
    }

    .social_icon {
      gap: 10px;
      display: flex;
      img {
        width: 28px;
        height: 28px;
      }
    }
    .shoot_btn {
      display: flex;
      gap: 10px;
      align-items: center;

      .wallet {
        width: 126.733px;
        height: 43.371px;
        flex-shrink: 0;
        background-color: #f5f7fa;
        border-radius: 40px;
      }
      .wallet-img {
        padding: 1px 5px;
        background-color: white;
        height: 98%;
        border-radius: 1536px;
        max-width: 55px;
        margin: 1px 9px;
        display: flex;

        .wallet-amt {
          padding: 0px 7px;
        }
      }

      a {
        padding: 13px 15px;
        font-family: Inter;
        font-size: 13px;
        font-weight: 400;
        text-align: left;
        color: #000000;
        border-radius: 4.4px;
        text-transform: uppercase;
        text-decoration: none;
      }
      img {
        max-width: 100%;
        height: 60%;
        width: 40px;
      }
    }
    .Recharge {
      width: 189px;
      height: 43px;
      padding: 10px 0;
      background: #f6f6f6;

      span {
        font-family: Inter;
      }
    }
  }
  .right_content .shoot_btn img {
    max-width: 100%;
    height: auto;
    width: 40px;
  }
  .main_logo {
    padding: 0 17px;
    max-width: 178px;
    width: 100%;
    height: auto;
  }

  .profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-pic {
  width: 40px; 
  height: 40px;
  border-radius: 50%; 
  overflow: hidden; 
  justify-content: center;
  align-items: center;
}

.profile-pic .img {
  width: 100%;
  height: 100%;
object-fit:cover ;
}


  /* .sidebar{
    display: flex;
    flex-direction: column;
    background-color: #FAE9E9;
    gap:30px;
  } */

    @media (max-width: 567px) {
  .top_bar {
    padding: 10px;
    height: auto;
  }

  .navbar-expand-lg .navbar-nav {
    margin-left: 20px;
    gap: 20px;
  }

  a.nav-link {
    font-size: 14px;
    padding: 0 15px;
    border-right: unset;
  }

  .right_content {
    gap: 10px;
    margin: 20px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .right_content .contact_div {
    gap: 5px;
  }

  .right_content .social_icon {
    gap: 5px;
  }

  .main_logo {
    max-width: 150px;
  }

  .profile-pic {
    width: 30px;
    height: 30px;
  }

  .wallet {
    width: 100px;
    height: 35px;
  }
}

@media (min-width: 568px) and (max-width: 992px) {
  .top_bar {
    padding: 10px;
  }

  .navbar-expand-lg .navbar-nav {
    margin-left: 40px;
    gap: 20px;
  }

  a.nav-link {
    font-size: 15px;
    border: unset;
  }

  .right_content {
    gap: 15px;
    margin: 20px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .right_content .contact_div {
    gap: 7px;
  }

  .right_content .social_icon {
    gap: 7px;
  }

  .main_logo {
    max-width: 170px;
    padding: 0 30px;
  }
}

@media (min-width: 993px) {
  .top_bar {
    padding: 0;
    height: 86.743px;
  }

  .navbar-expand-lg .navbar-nav {
    margin-left: 0;
    gap: 30px;
  }

  a.nav-link {
    font-size: 16px;
  }

  .right_content {
    gap: 20px;
    margin: 20px 0;
    flex-direction: row;
  }

  .right_content .contact_div {
    gap: 10px;
  }

  .right_content .social_icon {
    gap: 10px;
  }

  .main_logo {
    max-width: 178px;
    padding: 0 30px;
  }
}

`;
