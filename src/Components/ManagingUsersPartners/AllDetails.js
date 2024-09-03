import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, RedirectButton } from "../Global";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const AllDetails = ({ vendorId }) => {
  const [basicDetails, setBasicDetails] = useState({});
  const [bankDetails, setBankDetails] = useState({});
  const [documents, setDocuments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
  }, [id]);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/Vendorbyid/${id}`,{
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },  
        });
        if (response.data.status) {
          toast.success("Vendor Data Retrieved Successfully");
          const vendorData = response.data.data;
          setBasicDetails({
            ID: vendorData.vendor_id,
            Name: vendorData.vendor_name,
            Email: vendorData.email,
            Mobile: vendorData.mobile,
            Address: `${vendorData.longitude}, ${vendorData.latitude}`,
            DocumentVerify: vendorData.documents.length > 0 ? "Verified" : "Pending",
          });
          setBankDetails({
            bankid: vendorData.bank_details.bankid,
            BankHolder: vendorData.bank_details.bank_holder,
            AccountNumber: vendorData.bank_details.account_number,
            BankName: vendorData.bank_details.bank_name,
            IFSCCode: vendorData.bank_details.ifsc_code,
          });
          setDocuments(vendorData.documents);
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  const columns = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "Name" },
    { header: "Email", accessor: "Email" },
    { header: "Mobile", accessor: "Mobile" },
    { header: "Address", accessor: "Address" },
    { header: "Document Verify", accessor: "DocumentVerify" },
  ];

  const columnstwo = [
    { header: "ID", accessor: "bankid" },
    { header: "Bank Holder", accessor: "BankHolder" },
    { header: "Account Number", accessor: "AccountNumber" },
    { header: "Bank Name", accessor: "BankName" },
    { header: "IFSC Code", accessor: "IFSCCode" },
  ];

  const columnsthree = [
    { header: "Aadhaar Front", accessor: "AadhaarFront" },
    { header: "Aadhaar Back", accessor: "AadhaarBack" },
    { header: "License Front", accessor: "LicenseFront" },
    { header: "License Back", accessor: "LicenseBack" },
  ];

  const baseUrl = "http://api-carwash.phanomprofessionals.com/uploads";

  const datathree = documents.map((doc, index) => ({
    AadhaarFront: doc.adarfrontend ? (
      <a href={`${baseUrl}/${doc.adarfrontend}`} target="_blank" rel="noopener noreferrer">
        <img src={`${baseUrl}/${doc.adarfrontend}`} alt="Aadhaar Front" style={{ width: '100px', height: 'auto' }} />
      </a>
    ) : "NO Image",
    AadhaarBack: doc.adarback ? (
      <a href={`${baseUrl}/${doc.adarback}`} target="_blank" rel="noopener noreferrer">
        <img src={`${baseUrl}/${doc.adarback}`} alt="Aadhaar Back" style={{ width: '100px', height: 'auto' }} />
      </a>
    ) : "NO Image",
    LicenseFront: doc.licfront ? (
      <a href={`${baseUrl}/${doc.licfront}`} target="_blank" rel="noopener noreferrer">
        <img src={`${baseUrl}/${doc.licfront}`} alt="License Front" style={{ width: '100px', height: 'auto' }} />
      </a>
    ) : "NO Image",
    LicenseBack: doc.licback ? (
      <a href={`${baseUrl}/${doc.licback}`} target="_blank" rel="noopener noreferrer">
        <img src={`${baseUrl}/${doc.licback}`} alt="License Back" style={{ width: '100px', height: 'auto' }} />
      </a>
    ) : "NO Image",
  }));
  
  const handleApproval = async (isApproved) => {
    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/approveVendor`, // Replace with your actual API endpoint
        {
          id: basicDetails.ID, // Accessing the ID from basicDetails state
          is_approved: isApproved, // 1 for approved, 0 for not approved
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Ensure response.data is the correct object and has the required properties
      if (response.data.status === true) {
        const message = response.data.message;
        navigate('/managing_users_partners')
        toast.success(message);
      } else if(response.data.status === false) {
        const message = response.data.message;
        navigate('/managing_users_partners')
        toast.success(message);
      }
    } catch (error) {
      // Handle errors from the API or other issues
      console.error("Error updating vendor approval status:", error);
      toast.error(error.response?.data?.message || "Error updating vendor approval status.");
    }
  };
  
  
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
              <tr>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{basicDetails[column.accessor]}</td>
                ))}
              </tr>
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
              <tr>
                {columnstwo.map((column, colIndex) => (
                  <td key={colIndex}>{bankDetails[column.accessor]}</td>
                ))}
              </tr>
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
        <RedirectButton onClick={() => handleApproval(1)}>Approve</RedirectButton>
        <RedirectButton onClick={() => handleApproval(0)}>Not Approve</RedirectButton>
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
