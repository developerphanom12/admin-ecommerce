import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Heading } from '../Global';
import { EXCHNAGE_URL } from '../../url/Url';

export const ReviewingFeedback = () => {
  const [service, setService] = useState([]);

  const reviewcolumn = [
    { header: "ID", accessor: "review_id" },
    { header: "Name", accessor: "reviewer_name" },
    { header: "Rating", accessor: "rating" },
    { header: "Comment", accessor: "comment" },
    { header: "Date", accessor: "order_date" },
    { header: "Order Id", accessor: "reviewer_orderid" },
    { header: "Vendor Name", accessor: "name" },
    { header: "Service Name", accessor: "title" },

  ];

  useEffect(() => {
    axios
      .get(`${EXCHNAGE_URL}/reviews`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          // Set the service data to the state
          setService(response.data.data.data); // Adjust if needed
        } else {
          console.error("Failed to fetch services:", response.data.message);
          setService([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setService([]);
      });
  }, []);

  return (
    <Root>
      <div className='review_heading'>
        <Heading style={{textAlign: "left"}}>Reviewing Feedback</Heading>
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
              {service.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {reviewcolumn.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.accessor === "order_date" || column.accessor === "time_slot" ? (
                        row[column.accessor] ? new Date(row[column.accessor]).toISOString().split("T")[0] : "Null"
                      ) : (
                        row[column.accessor] || "NULL" // Display "N/A" if the field is empty
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
display:flex;
flex-direction:column;
gap:20px;


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
        display:flex;
        gap:20px;
        flex-direction:column;
        margin-top:40px;
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