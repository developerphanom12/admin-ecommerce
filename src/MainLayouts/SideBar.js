import React, { useState } from "react";
import styled from "styled-components";
import { MenuButtonActive } from "../Components/Global";
import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaUser, FaUsersCog } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { MdLocalAtm } from "react-icons/md";

function SideBar() {
  const [selectedLink, setSelectedLink] = useState("dashboard");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <Root>
      <div className="sidebar_div">
        <Link
          to="/dashboard-overview"
          className={selectedLink === "dashboard" ? "selected" : ""}
          onClick={() => handleLinkClick("dashboard")}
        >
          <IoMdHome />
          <span>
            <MenuButtonActive className="s-color">Dashboard</MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/managing_users_partners"
          className={selectedLink === "setting" ? "selected" : ""}
          onClick={() => handleLinkClick("setting")}
        >
          <IoIosSettings />
          <span>
            <MenuButtonActive className="s-color">
              Users & Partners
            </MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/services"
          className={selectedLink === "services" ? "selected" : ""}
          onClick={() => handleLinkClick("services")}
        >
          <FaUsersCog />

          <span>
            <MenuButtonActive className="s-color">Services</MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/reviewing_feedback"
          className={selectedLink === "order" ? "selected" : ""}
          onClick={() => handleLinkClick("order")}
        >
          <RiFeedbackFill />

          <span>
            <MenuButtonActive className="s-color">Feedback</MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/monitoring_payments_transactions"
          className={selectedLink === "profile" ? "selected" : ""}
          onClick={() => handleLinkClick("profile")}
        >
          <MdLocalAtm />
       

          <span>
            <MenuButtonActive className="s-color">Payments</MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/coupon"
          className={selectedLink === "coupon" ? "selected" : ""}
          onClick={() => handleLinkClick("coupon")}
        >
          <FaTicketAlt />

          <span>
            <MenuButtonActive className="s-color">Coupons</MenuButtonActive>
          </span>
        </Link>
        <Link
          to="/about_us"
          className={selectedLink === "about" ? "selected" : ""}
          onClick={() => handleLinkClick("about")}
        >
          <FaUser />

          <span>
            <MenuButtonActive className="s-color">About Us</MenuButtonActive>
          </span>
        </Link>
      </div>
    </Root>
  );
}

export default SideBar;

const Root = styled.section`
  width: 100%;
  .sidebar_div {
    position: sticky;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    height: 100%;
    position: fixed;
    z-index: 1;
    box-shadow: 1px 1px 4px 1px #ebe8e8;
    border-radius: 10px;
    padding: 20px 0;
    background: #fff;
    left: 0;
    overflow-x: hidden;
  }

  .sidebar_div a {
    width: 100%;
    color: #b1b1b1;
    display: flex;
    height: 49px;
    text-decoration: none;
    padding: 0px 15px;
    align-items: center;
    white-space: nowrap;
    border-left: 7px solid #ffffff;

    svg {
      height: 22px;
      width: 22px;
    }

    span {
      color: inherit;
    }

    &:hover {
      color: #2ca5d6;
    }

    &.selected {
      border-left-style: inset;
      border-left: 7px solid #2ca5d6;
      color: #0a06f4;
      border-radius: 7px;
      svg {
        color: #000;
      }
      .s-color {
        color: #2ca5d6;
      }
    }
  }

  @media (max-width: 567px) {
    .sidebar_div {
      a {
        justify-content: center;
        span {
          display: none;
        }
      }
    }

    .sidebar_div {
      &:hover {
        width: 45%;
        transition: width 0.3s ease-in-out;
        a {
          justify-content: flex-start;
          span {
            display: block;
          }
        }
      }
    }

    .sidebar_div {
      width: 15%;
      a {
        gap: 10px;
      }
    }

    svg {
      height: auto;
      width: 100%;
    }

    .sidebar_div a {
      padding: 0px;
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .sidebar_div {
      a {
        span {
          display: none;
        }
      }
    }

    .sidebar_div {
      &:hover {
        width: 35%;
        a {
          span {
            display: block;
          }
        }
      }
    }

    .sidebar_div a {
      gap: 10px;
    }

    svg {
      height: auto;
      width: 100%;
    }
  }

  @media (max-width: 1281px) {
    .sidebar_div a {
      gap: 10px;
    }

    svg {
      height: auto;
      width: 100%;
    }
  }

  @media (min-width: 992px) and (max-width: 1024px) {
    .sidebar_div {
      a {
        span {
          display: none;
        }
      }
    }

    .sidebar_div {
      &:hover {
        width: 35%;
        a {
          span {
            display: block;
          }
        }
      }
    }

    .sidebar_div a {
      gap: 10px;
    }

    svg {
      height: auto;
      width: 100%;
    }
  }
`;
