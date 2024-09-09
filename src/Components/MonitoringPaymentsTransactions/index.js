import React, { useState } from "react";
import styled from "styled-components";
import { Heading } from "../Global";
import { FcNext, FcPrevious } from "react-icons/fc";

export const MonitoringPaymentsTransactions = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const reviewcolumn = [
    { header: "Payment ID", accessor: "paymentid" },
    { header: "User Name", accessor: "username" },
    { header: "Status", accessor: "status" },
    { header: "Total Payment", accessor: "totalpayment" },
    { header: "Date", accessor: "date" },
  ];

  const reviewdata = [
    {
      paymentid: 1,
      username: "Avineet",
      status: "Complete",
      totalpayment: "20,000",
      date: "July 27, 2024",
    },
    {
      paymentid: 2,
      username: "Avineet",
      status: "Pending",
      totalpayment: "20,000",
      date: "July 27, 2024",
    },
    {
      paymentid: 3,
      username: "Avineet",
      status: "Processing",
      totalpayment: "20,000",
      date: "July 27, 2024",
    },
  ];
  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };
  return (
    <Root>
      <div className="review_heading">
        <Heading style={{ textAlign: "left" }}>Payments</Heading>
      </div>

      <div className="content_div">
        <div className="partner_div">
          <table>
            <thead>
              <tr>
                {reviewcolumn.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviewdata.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {reviewcolumn.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        color:
                          column.accessor === "status"
                            ? row[column.accessor] === "Complete"
                              ? "#32cd32"
                              : row[column.accessor] === "Pending"
                              ? "red"
                              : row[column.accessor] === "Processing"
                              ? "#2ca5d6"
                              : "black"
                            : "black",
                      }}
                    >
                      {row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </Root>
  );
};

const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 20px 0px;
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

    input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
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
    .add_ser_div {
      display: flex;
      gap: 20px;
      flex-direction: column;
      margin-top: 40px;
      .add_first_div {
        display: flex;
        gap: 20px;
        .title_div {
          height: 100px;
          width: 25%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          input {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
          }
        }

        .desc_div {
          height: 100px;
          width: 25%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          input {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
          }
        }

        .duration_div {
          height: 100px;
          width: 25%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          input {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
          }
        }

        .service_div {
          height: 100px;
          width: 25%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          select {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            width: 90%;
          }
        }
      }
      .add_second_div {
        display: flex;
        gap: 20px;
        .price_div {
          height: 100px;
          width: 30%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          input {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
          }
        }

        .image_div {
          height: 100px;
          width: 30%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          .photo_choose {
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 5px 40px;
              width: 100%;
            }
          }
        }

        .features_div {
          height: 100px;
          width: 30%;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: center;
          input {
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
          }
        }
      }
      .submit_btn {
        display: flex;
        justify-content: center;
      }
    }
  }

  /* Apply styles for mobile devices */

  @media (max-width: 567px) {
  }
`;
