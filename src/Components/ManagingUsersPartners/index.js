import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainButton, RedirectButton } from "../Global";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { FcNext, FcPrevious } from "react-icons/fc";

export const ManagingUsersPartners = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [columns, setColumns] = useState([
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "Mobile", accessor: "mobile_number" },
  ]);

  const [columns2, setColumns2] = useState([
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Mobile", accessor: "mobile_number" },
    { header: "Status", accessor: "is_approved" },
    { header: "Role", accessor: "role" },
    { header: "View", accessor: "view" },
    { header: "Block", accessor: "block" },
  ]);

  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    if (selectedButton === 1) {
      axios
        .get(`${EXCHNAGE_URL}/all_users`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            limit,
            offset,
          },
        })
        .then((response) => {
          if (response.data.status) {
            setData(response.data.data);
            setTotalRecords(response.data.totalRecords); // Ensure your API returns the total number of records
          } else {
            console.error("Failed to fetch data:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else if (selectedButton === 2) {
      axios
        .get(`${EXCHNAGE_URL}/all_vendors`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            limit,
            offset,
          },
        })
        .then((response) => {
          if (response.data.status) {
            setData2(response.data.data);
            setTotalRecords(response.data.totalRecords); // Ensure your API returns the total number of records
          } else {
            console.error("Failed to fetch data:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedButton, limit, offset]);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    setOffset(0); // Reset offset when switching buttons
  };

  const handleBlockUser = (userId) => {

  }

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  // Map is_approved value to text
  const mapApprovalStatus = (status) =>
    status === 1 ? "Approved" : "Not Approved";

  return (
    <Root>
      <div className="managing_main_div">
        <div className="butt_div">
          <MainButton
            className={selectedButton === 1 ? "selected" : ""}
            onClick={() => handleButtonClick(1)}
          >
            User
          </MainButton>

          <MainButton
            className={selectedButton === 2 ? "selected" : ""}
            onClick={() => handleButtonClick(2)}
          >
            Partner
          </MainButton>

        </div>

        <div className="content_div">

          {selectedButton === 1 && (
            <div className="user_div">
              <table>
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex}>{row[column.accessor]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedButton === 2 && (
            <div className="user_div">
              <table>
                <thead>
                  <tr>
                    {columns2.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data2.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns2.map((column, colIndex) => (
                        <td key={colIndex}>
                          {column.accessor === "is_approved" ? (
                            mapApprovalStatus(row[column.accessor])
                          ) : column.accessor === "view" ? (
                            <RedirectButton
                              onClick={() => navigate(`/all-details/${row.id}`)}
                            >
                              View More
                            </RedirectButton>
                          ) : column.accessor === "block" ? (
                            <RedirectButton onClick={() => handleBlockUser(row.id)}>
                              Block
                            </RedirectButton>
                          ) : (
                            row[column.accessor]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(Math.max(offset - limit, 0))}
            disabled={offset === 0}
          >
            <FcPrevious />
          </button>
          <button
            onClick={() => handlePageChange(offset + limit)}
            disabled={offset + limit >= totalRecords}
          >
            <FcNext />
          </button>
        </div>
      </div>
    </Root>
  );
};
const Root = styled.section`
  .managing_main_div {
    display: flex;
    gap: 20px;
    flex-direction: column;

    .butt_div {
      display: flex;
      gap: 20px;
    }

    .selected {
      background-color: #034833; /* Update with your selected button color */
      color: white;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      overflow-x: auto;
      tr {
        border-bottom: 1px solid #e6eff5;
      }
      th {
        font-size: 14px;
        font-weight: 500;
        color: #2ca5d6;
      }
      td {
        font-size: 14px;
        font-weight: 400;
      }

      th,
      td {
        text-align: left;
        padding: 15px;
        text-align: center;
      }
    }

    .content_div {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      height: 500px;
      width: 100%;
      .partner_div {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .but_div {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .content_div::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 567px) {
    .managing_main_div .content_div {
      height: 600px;
    }
  }
`;
