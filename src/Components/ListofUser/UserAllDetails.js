import React from "react";
import styled from "styled-components";
import { Heading, RedirectButton } from "../Global";

export const UserAllDetails = () => {
  const columnsOne = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Address", accessor: "address" },
    { header: "Document Verify", accessor: "documentverify" },
    { header: "Member Since", accessor: "membersince" },
  ];

  const columnsTwo = [
    { header: "ID", accessor: "id" },
    { header: "Order Id", accessor: "orderid" },
    { header: "Price", accessor: "price" },
    { header: "Payment", accessor: "payment" },
    { header: "Service Id", accessor: "serviceid" },
  ];

  const columnsThree = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Status", accessor: "status" },
    { header: "Create  Date", accessor: "createdate" },
    { header: "Update  Date", accessor: "updatedate" },
  ];

  const staticDataOne = {
    id: "1",
    name: "1231",
    email: "4000",
    mobile: "2000",
    address: "1234",
    documentverify: "Pending",
    membersince: "2 year ago",
  };

  const staticDataTwo = {
    id: "1",
    orderid: "1231",
    price: "4000",
    payment: "2000",
    serviceid: "1234",
  };

  const staticDataThree = {
    id: "1",
    name: "Sagar & Avineet",
    phone: "1236547890",
    status: "Approved",
    createdate: "12 September",
    updatedate: "12 September",
  };

  return (
    <Root>
      <div className="detail_main_div">
        <Heading style={{ textAlign: "left" }}>Basic Details</Heading>

        <div className="basic_detail">
          <table>
            <thead>
              <tr>
                {columnsOne.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {columnsOne.map((column, colIndex) => (
                  <td key={colIndex}>
                    {staticDataOne[column.accessor] || "No Data"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="total_referral">
          <div className="sub_referral_one">
            <Heading style={{ textAlign: "left" }}>Total Booking List</Heading>
            <div className="basic_detail_two">
              <table>
                <thead>
                  <tr>
                    {columnsTwo.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {columnsTwo.map((column, colIndex) => (
                      <td key={colIndex}>
                        {staticDataTwo[column.accessor] || "No Data"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub_referral_two">
            <Heading style={{ textAlign: "left" }}>Referral & Earn List</Heading>
            <div className="basic_detail_two">
              <table>
                <thead>
                  <tr>
                    {columnsThree.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {columnsThree.map((column, colIndex) => (
                      <td key={colIndex}>
                        {staticDataThree[column.accessor] || "No Data"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="approved_btn">
          <RedirectButton>Approve</RedirectButton>
          <RedirectButton>Not Approve</RedirectButton>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  .detail_main_div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .basic_detail {
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      display: flex;
      gap: 20px;
      flex-direction: column;
      margin-bottom: 20px;
      height: 150px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .basic_detail::-webkit-scrollbar {
      display: none;
    }

    .total_referral {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .sub_referral_one{
        width:40%;
      }

     
      .basic_detail_two {
        width: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        display: flex;
        gap: 20px;
        flex-direction: column;
        margin-bottom: 20px;
        height: 250px;
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .basic_detail_two::-webkit-scrollbar {
        display: none;
      }
    }

    .approved_btn {
      display: flex;
      gap: 20px;
      justify-content: flex-end;
      margin-top: 20px;
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
  }

  @media (max-width: 567px){
    .detail_main_div .total_referral .sub_referral_one {
    width: 100%;
}
.detail_main_div .total_referral .sub_referral_two {
    width: 100%;
}
  }
  
  @media (min-width: 567px) and (max-width: 992px){
    .detail_main_div .total_referral .sub_referral_one {
    width: 100%;
}
  }
`;
