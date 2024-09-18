import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Global";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { EXCHNAGE_URL_USERS } from "../../url/Url";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";
import Loader from "../Loader";

export const AllService = ({ vendorId }) => {
  const [basicDetails, setBasicDetails] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);
  useEffect(() => {
    dispatch(LoaderAction(true));
    const fetchVendorDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${EXCHNAGE_URL_USERS}/service-data?id=${id}&skip=0&limit=10`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (response.data.status) {
            toast.success("Vendor Data Retrieved Successfully");
            const vendorData = response.data.data;
            const detailsArray = vendorData.map((vendor) => ({
              ID: vendor.bike_id,
              Name: vendor.title,
              Price: vendor.price,
              Description: vendor.description,
              Image: vendor.image,
            }));
  
            setBasicDetails(detailsArray);
          }
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Error fetching vendor details.");
      }finally {
        dispatch(LoaderAction(false));
      }
    };
  
    fetchVendorDetails();  
  }, [id]);

  const columns = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "Name" },
    { header: "Price", accessor: "Price" },
    { header: "Description", accessor: "Description" },
    { header: "View Image", accessor: "Image" },
  ];

  const baseUrl = "https://api-carwash.phanomprofessionals.com/uploads";

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
              {basicDetails.map((detail, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.accessor === "Image" ? (
                        <a
                          href={`${baseUrl}/${detail.Image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View 
                        </a>
                      ) : (
                        detail[column.accessor]
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
      height: 420px;
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
        max-width: 300px;
        overflow-y: auto;
        a {
          font-size: 14px;
          font-weight: 400;
          border-radius: 40px;
          padding: 5px 20px;
          background: linear-gradient(100deg, #2ca5d6, #32cd32);
          color: #fff;
          border: none;
          text-decoration: none;
        }
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
