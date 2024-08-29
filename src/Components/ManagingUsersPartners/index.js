import React, { useState } from "react";
import styled from "styled-components";
import { MainButton, RedirectButton } from "../Global";
import { useNavigate } from "react-router-dom";


export const ManagingUsersPartners = () => {

  const [selectedButton, setSelectedButton] = useState(1);

  const navigate = useNavigate();

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  const columns = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "Name" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile", accessor: "Mobile" },
  ];

  const data = [
    {
      ID: 1,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
    },

    {
      ID: 2,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
    },

    {
      ID: 3,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
    },

    {
      ID: 4,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
    },

    {
      ID: 5,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
    },
  ];

  const columnstwo = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "Name" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile", accessor: "Mobile" },
    { header: "Status", accessor: "Status" },
    { header: "View", accessor: "View" },
  ];

  const datatwo = [
    {
      ID: 1,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
    {
      ID: 2,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
    {
      ID: 3,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
    {
      ID: 4,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
    {
      ID: 5,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
    {
      ID: 6,
      Name: "Avineet Singh",
      Email: "avineetsingh@gmail.com",
      Mobile: 1236547890,
      Status: "Pending",
      View: <RedirectButton  onClick={ () => navigate("/all-details")}>View More</RedirectButton>,
    },
  ];

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
            <div className="partner_div">
              <table>
                <thead>
                  <tr>
                    {columnstwo.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {datatwo.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columnstwo.map((column, colIndex) => (
                        <td key={colIndex}>{row[column.accessor]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
      th{
        font-size:14px;
        font-weight:500;
        color: #2ca5d6

      }
      td{
        font-size: 14px;
        font-weight:400;
      }

      th,
      td {
        text-align: left;
        padding: 15px;
        text-align: center;
      }
    }

    .content_div {
    box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    overflow:auto;
    scrollbar-width:none; 
    -ms-overflow-style:none;
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

  
@media(max-width: 567px){

 .managing_main_div .content_div {
    height: 600px;
}


}
`;
