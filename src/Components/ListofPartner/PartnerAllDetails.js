import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, RedirectButton } from "../Global";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";
import Loader from "../Loader";

export const PartnerAllDetails = ({ vendorId }) => {
  const [basicDetails, setBasicDetails] = useState({});
  const [bankDetails, setBankDetails] = useState({});
  const [documents, setDocuments] = useState([]);
  const [riding, setRiding] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);

  useEffect(() => {
    dispatch(LoaderAction(true));
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/Vendorbyid/${id}`, {
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
            DocumentVerify:
              vendorData.documents.length > 0 ? "Verified" : "Pending",
          });
          setBankDetails({
            bankid: vendorData.bank_details?.bankid || "N/A",
            BankHolder: vendorData.bank_details?.bank_holder || "N/A",
            AccountNumber: vendorData.bank_details?.account_number || "N/A",
            BankName: vendorData.bank_details?.bank_name || "N/A",
            IFSCCode: vendorData.bank_details?.ifsc_code || "N/A",
          });
          setDocuments(vendorData.documents);
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      } finally {
        dispatch(LoaderAction(false));
      }
    };
    const VendorRinding = async () => {
      try {
        const response = await axios.get(
          `${EXCHNAGE_URL}/vendoridelist?id=${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status) {
          setRiding(response.data.data);
          setWalletBalance(response.data.walletBalance);
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };
    VendorRinding();
    fetchVendorDetails();
  }, [vendorId, dispatch, id]);

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
  const columnTwo = [
    { header: "ID", accessor: "orderid" },
    { header: "Date of Service", accessor: "create_date" },
    { header: "Status", accessor: "status" },
    { header: "Price(Rs.)", accessor: "price" },
  ];

  const columnsthree = [
    { header: "Aadhaar Front", accessor: "AadhaarFront" },
    { header: "Aadhaar Back", accessor: "AadhaarBack" },
    { header: "License Front", accessor: "LicenseFront" },
    { header: "License Back", accessor: "LicenseBack" },
  ];

  const baseUrl = "https://api-carwash.phanomprofessionals.com/uploads";

  const datathree = documents?.map((doc, index) => ({
    AadhaarFront: doc?.adarfrontend ? (
      <a
        href={`${baseUrl}/${doc?.adarfrontend}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${baseUrl}/${doc?.adarfrontend}`}
          alt="Aadhaar Front"
          style={{ width: "100px", height: "auto" }}
        />
      </a>
    ) : (
      "NO Image"
    ),
    AadhaarBack: doc?.adarback ? (
      <a
        href={`${baseUrl}/${doc?.adarback}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${baseUrl}/${doc?.adarback}`}
          alt="Aadhaar Back"
          style={{ width: "100px", height: "auto" }}
        />
      </a>
    ) : (
      "NO Image"
    ),
    LicenseFront: doc?.licfront ? (
      <a
        href={`${baseUrl}/${doc?.licfront}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${baseUrl}/${doc?.licfront}`}
          alt="License Front"
          style={{ width: "100px", height: "auto" }}
        />
      </a>
    ) : (
      "NO Image"
    ),
    LicenseBack: doc?.licback ? (
      <a
        href={`${baseUrl}/${doc?.licback}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${baseUrl}/${doc?.licback}`}
          alt="License Back"
          style={{ width: "100px", height: "auto" }}
        />
      </a>
    ) : (
      "NO Image"
    ),
  }));

  const handleApproval = async (isApproved) => {
    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/approveVendor`,
        {
          id: basicDetails.ID,
          is_approved: isApproved,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === true) {
        const message = response.data.message;
        navigate("/managing_users_partners");
        toast.success(message);
      } else if (response.data.status === false) {
        const message = response.data.message;
        navigate("/managing_users_partners");
        toast.success(message);
      }
    } catch (error) {
      console.error("Error updating vendor approval status:", error);
      toast.error(
        error.response?.data?.message ||
          "Error updating vendor approval status."
      );
    }
  };

  return (
    <Root>
      {isLoading && <Loader />}
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
                  <td key={colIndex}>
                    {basicDetails[column.accessor] || "No Data"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <Heading style={{ textAlign: "left" }}>
          Total Riding List
          <>
            <div className="earning_btn">
              Earning: ₹{walletBalance || 0}
            </div>
          </>
        </Heading>
        <div className="vendor_bank_detail">
          <table>
            <thead>
              <tr>
                {columnTwo?.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riding.length > 0 ? (
                riding.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {columnTwo.map((column, colIndex) => (
                      <td key={colIndex}>
                        {item[column.accessor] || "No Data"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columnTwo.length}>No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Heading style={{ textAlign: "left" }}>Vendor Bank Details</Heading>
        <div className="vendor_bank_detail">
          <table>
            <thead>
              <tr>
                {columnstwo?.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {columnstwo?.map((column, colIndex) => (
                  <td key={colIndex}>
                    {bankDetails[column.accessor] || "No Data"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <Heading style={{ textAlign: "left" }}>Vendor Documents</Heading>
        {documents.length > 0 ? (
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
        ) : (
          <p>No documents available</p>
        )}

        <div className="approved_btn">
          <RedirectButton onClick={() => handleApproval(1)}>
            Approve
          </RedirectButton>
          <RedirectButton onClick={() => handleApproval(0)}>
            Not Approve
          </RedirectButton>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  .earning_btn {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #fff;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 2px solid #2ca5d6;
    background-color: #2ca5d6;
  }
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

    .vendor_bank_detail {
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      margin-bottom: 20px;
      height: 150px;
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
      height: 150px;
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
