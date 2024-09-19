import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainButton, RedirectButton } from "../Global";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { LoaderAction } from "../../redux/users/action";

export const ManagingUsersPartners = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);

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
    const fetchData = async () => {
      dispatch(LoaderAction(true)); // Start loading
      try {
        if (selectedButton === 1) {
          const response = await axios.get(`${EXCHNAGE_URL}/all_users`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              limit,
              offset,
            },
          });
          if (response.data.status) {
            setData(response.data.data);
            setTotalRecords(response.data.totalRecords);
          } else {
            console.error("Failed to fetch users:", response.data.message);
          }
        } else if (selectedButton === 2) {
          const response = await axios.get(`${EXCHNAGE_URL}/all_vendors`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              limit,
              offset,
            },
          });
          if (response.data.status) {
            setData2(response.data.data);
            setTotalRecords(response.data.totalRecords);
          } else {
            console.error("Failed to fetch vendors:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(LoaderAction(false)); // Stop loading
      }
    };

    fetchData();
  }, [selectedButton, limit, offset, dispatch]);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    setOffset(0);
  };

  const handleBlockUser = (userId) => {};

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const mapApprovalStatus = (status) =>
    status === 1 ? "Approved" : "Not Approved";

  return (
    <Root>
      {isLoading && <Loader />}
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
                  {data && data?.length > 0 ? (
                    data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <td key={colIndex}>{row[column.accessor]}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr
                      style={{
                        color: "red",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      <td colSpan="7">
                        ----------------No Data---------------
                      </td>
                    </tr>
                  )}
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
                  {data2 && data2?.length > 0 ? (
                    data2.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns2.map((column, colIndex) => (
                          <td key={colIndex}>
                            {column.accessor === "is_approved" ? (
                              mapApprovalStatus(row[column.accessor])
                            ) : column.accessor === "view" ? (
                              <RedirectButton
                                onClick={() =>
                                  navigate(`/all-details/${row.id}`)
                                }
                              >
                                View More
                              </RedirectButton>
                            ) : column.accessor === "block" ? (
                              <RedirectButton
                                onClick={() => handleBlockUser(row.id)}
                              >
                                Block
                              </RedirectButton>
                            ) : (
                              row[column.accessor]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr
                      style={{
                        color: "red",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      <td colSpan="7">
                        ----------------No Data---------------
                      </td>
                    </tr>
                  )}
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
      background-color: #034833;
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
        padding: 8px;
        text-align: center;
      }
    }

    .content_div {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      height: 420px;
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

  .pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    button {
      border-radius: 50px;
      background-color: #fff;
      border: 2px solid lightgray;
    }

    button:not(:disabled) {
      cursor: pointer;
      border: 2px solid #2ca5d6;
    }
  }
`;
