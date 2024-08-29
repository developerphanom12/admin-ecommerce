import React from "react";
import styled from "styled-components";
import { Heading, RedirectButton } from "../Global";

export const AllDetails = () => {
  const columns = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "Name" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile", accessor: "Mobile" },
    { header: "Address", accessor: "Address" },
    { header: "Document Verify", accessor: "DocumentVerify" },
  ];

  const data = [
    {
      ID: 1,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
      Address: "Lorem Ipsum",
      DocumentVerify: "Pending",
    },

    {
      ID: 2,
      Name: "Sagar Sharma",
      Email: "sagarsharma@gmail.com",
      Mobile: 7817466986,
      Address: "Lorem Ipsum",
      DocumentVerify: "Pending",
    },

  ];

  const columnstwo = [
    { header: "ID", accessor: "ID" },
    { header: "Bank Holder", accessor: "BankHolder" },
    { header: "Account Number", accessor: "AccountNumber" },
    { header: "Bank Name", accessor: "BankName" },
    { header: "IFSC Code", accessor: "IFSCCode" },
  ];

  const datatwo = [
    {
      ID: 1,
      BankHolder: "Sagar Sharma",
      AccountNumber: "67456211789",
      BankName: "CBI",
      IFSCCode: "Lorem Ipsum",
    },

    {
      ID: 2,
      BankHolder: "Sagar Sharma",
      AccountNumber: "67456211789",
      BankName: "CBI",
      IFSCCode: "Lorem Ipsum",
    },

   

  
  ];

  const columnsthree = [
    { header: "Aadhaar Front", accessor: "AadhaarFront" },
    { header: "Aadhaar Back", accessor: "AadhaarBack" },
    { header: "License Front", accessor: "LicenseFront" },
    { header: "License Back", accessor: "LicenseBack" },
  ];

  const datathree = [
    {
      AadhaarFront: <RedirectButton>View </RedirectButton>,
      AadhaarBack: <RedirectButton>View </RedirectButton>,
      LicenseFront: <RedirectButton>View </RedirectButton>,
      LicenseBack: <RedirectButton>View </RedirectButton>,
    },
  ];

  return (
    <Root>
      <div className="detail_main_div">
        <Heading style={{ textAlign: "left" }}>Basic Details</Heading>

        <div className="basic_detail">
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

        <Heading style={{ textAlign: "left" }}>Vendor Bank Details</Heading>
        <div className="vendor_bank_detail">
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

        <Heading style={{ textAlign: "left" }}>Vendor Documents</Heading>
        <div className="vendor_document">
          <table>
            <thead>
              <tr>
                {columnsthree.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datathree.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columnsthree.map((column, colIndex) => (
                    <td key={colIndex}>{row[column.accessor]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="approved_btn">
          <RedirectButton>Approved</RedirectButton>
          <RedirectButton>Not Approved</RedirectButton>
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
      height: 260px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .basic_detail::-webkit-scrollbar {
      display: none;
    }

    .vendor_bank_detail {
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      height: 260px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .vendor_bank_detail::-webkit-scrollbar {
      display: none;
    }

    .vendor_document {
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      height: 260px;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .vendor_document::-webkit-scrollbar {
      display: none;
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
`;
