import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import logoimg from "../Assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userCheckAction } from "../redux/users/action";

function NavBarr() {
const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    userCheckAction(false);
    navigate("/");
  };

  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  return (
    <Root>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={logoimg}
              alt="Logo Of Site"
              style={{ width: "70px", height: "auto", cursor: "pointer" }}
            />
          </Navbar.Brand>

          <Nav>
          {userCheck && token ?(
            <Nav.Link href="/" className="a" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ):""}
          </Nav>
        </Container>
      </Navbar>
    </Root>
  );
}

export default NavBarr;

const Root = styled.section`
  width: 100%;
  height:100%;
  .bg-body-tertiary {
    box-shadow: 1px 1px 4px 1px #ebe8e8;
}
  .navbar-brand {
    margin: 0 13px;
  }
 
  .nabspacing {
    justify-content: space-between;
    padding: 0px 12px;
    border-left: 1px solid #e6eff5;
  }

  .a {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #2ca5d6;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 2px solid #2ca5d6;
    &:hover {
      background-color: #2ca5d6;
      border: 2px solid #ffffff;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;
