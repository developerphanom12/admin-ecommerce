import React, { useState } from "react";
import styled from "styled-components";
// import { MenuButtonActive } from "./Components/Global";
import { MenuButtonActive } from "../Global";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { SlBasketLoaded } from "react-icons/sl";
import { IoStatsChart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuBaggageClaim } from "react-icons/lu";

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
            <MenuButtonActive className="s-color">
              Dashboard Overview
            </MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/managing-users_partners"
          className={selectedLink === "setting" ? "selected" : ""}
          onClick={() => handleLinkClick("setting")}
        >
          <IoIosSettings />
          <span>
            <MenuButtonActive className="s-color">
              Managing Users and Partners
            </MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/reviewing_feedback"
          className={selectedLink === "order" ? "selected" : ""}
          onClick={() => handleLinkClick("order")}
        >
          <SlBasketLoaded />
          <span>
            <MenuButtonActive className="s-color">
              Reviewing Feedback
            </MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/monitoring_payments_transactions"
          className={selectedLink === "profile" ? "selected" : ""}
          onClick={() => handleLinkClick("profile")}
        >
          <FaUser />
          <span>
            <MenuButtonActive className="s-color">
              Monitoring Payments and Transactions
            </MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/frequently_asked_question"
          className={selectedLink === "claims" ? "selected" : ""}
          onClick={() => handleLinkClick("claims")}
        >
          <LuBaggageClaim />
          <span>
            <MenuButtonActive className="s-color">FAQs</MenuButtonActive>
          </span>
        </Link>

        <Link
          to="/contact_support"
          className={selectedLink === "history" ? "selected" : ""}
          onClick={() => handleLinkClick("history")}
        >
          <IoStatsChart />
          <span>
            <MenuButtonActive className="s-color">
              Contact Support
            </MenuButtonActive>
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
    border: 1px solid #ebe8e8;
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
    gap: 15px;
    height: 49px;
    text-decoration: none;
    padding: 0px 20px;
    align-items: center;
    white-space: nowrap;
    border-left: 7px solid #fae9e9;

    svg {
      height: 25px;
      width: 25px;
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
        span {
          display: none;
        }
      }
    }

    .sidebar_div {
      &:hover {
        width: 80%;
        transition: width 0.3s ease-in-out;
        a {
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
        width: 50%;
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
`;
