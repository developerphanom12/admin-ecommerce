import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading } from "../Global";
import { useLocation } from "react-router-dom";
import { LoaderAction } from "../../redux/users/action";
import { EXCHNAGE_URL } from "../../url/Url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader";

export const UserAllDetails = () => {
  const isLoading = useSelector((state) => state?.users?.isLoading);
  const location = useLocation();
  const { userData, usernumber } = location.state || {};
  const [referralData, setReferralData] = useState([]);
  const [particularData, setParticularData] = useState([]);
  const dispatch = useDispatch();
  console.log("ddddd", userData, usernumber);
  const columnsOne = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile_number" },
    { header: "Member Since(Days)", accessor: "days_since_contact" },
  ];

  const columnsTwo = [
    { header: "ID", accessor: "order_id" },
    { header: "Time Slot", accessor: "time_slot" },
    { header: "Status", accessor: "status" },
    { header: "Price(Rs.)", accessor: "bikecar.price" },
    { header: "Service", accessor: "bikecar.title" },
  ];

  const columnsThree = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "user_mobileno" },
    { header: "Referral Phone", accessor: "referal_mobileno" },
    { header: "Status", accessor: "status" },
    { header: "Create  Date", accessor: "create_date" },
    { header: "Update  Date", accessor: "update_date" },
  ];

  useEffect(() => {
    const referralData = async () => {
      dispatch(LoaderAction(true));
      try {
        const response = await axios.get(
          `${EXCHNAGE_URL}/user-referalget?usernumber=${usernumber}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          setReferralData(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        dispatch(LoaderAction(false));
      }
    };
    const particularData = async () => {
      dispatch(LoaderAction(true));
      const id = userData?.id;
      try {
        const response = await axios.get(
          `${EXCHNAGE_URL}/particular-userorder?id=${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response?.status === 200) {
          setParticularData(response.data.data);
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(LoaderAction(false));
      }
    };
    particularData();
    if (usernumber) {
      referralData();
    }
  }, [usernumber, dispatch, userData?.id]);

  const getNestedValue = (obj, accessor) => {
    return (
      accessor.split(".").reduce((value, key) => value?.[key], obj) || "No Data"
    );
  };
  const formatDate = (dateValue) => {
    if (dateValue) {
      return new Date(dateValue).toISOString().split("T")[0];
    }
    return "Invalid Date";
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
                {columnsOne.map((column, index) => (
                  <th key={index}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {columnsOne.map((column, colIndex) => (
                  <td key={colIndex}>
                    {userData[column.accessor] || "No Data"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>{" "}
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
                  {particularData?.map((dataRow, rowIndex) => (
                    <tr key={rowIndex}>
                      {columnsTwo?.map((column, colIndex) => (
                        <td key={colIndex}>
                          {getNestedValue(dataRow, column.accessor)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub_referral_two">
            <Heading style={{ textAlign: "left" }}>
              Referral & Earn List
            </Heading>
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
                  {referralData &&
                    referralData.map((dataRow, rowIndex) => (
                      <tr key={rowIndex}>
                        {columnsThree?.map((column, colIndex) => (
                          <td key={colIndex}>
                            {column.accessor === "create_date" ||
                            column.accessor === "update_date" ? (
                              formatDate(dataRow[column.accessor])
                            ) : (
                              <>{dataRow[column.accessor] || "No Data"}</>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
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
      max-height: 250px;
      height: 100%;
      overflow: auto;
   
    }

   

    .total_referral {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 20px;

      .sub_referral_one,
      .sub_referral_two {
        width: 100%;
      }

      .basic_detail_two {
        position: relative;
        width: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        display: flex;
        gap: 20px;
        flex-direction: column;
        margin-bottom: 20px;
        max-height: 250px;
        overflow: auto;
    
      }
      
    }

    .approved_btn {
      display: flex;
      gap: 20px;
      justify-content: flex-end;
      margin-top: 20px;
    }

    table {
      position: relative;
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

  @media (max-width: 567px) {
    .detail_main_div .total_referral .sub_referral_one {
      width: 100%;
    }
    .detail_main_div .total_referral .sub_referral_two {
      width: 100%;
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .detail_main_div .total_referral .sub_referral_one {
      width: 100%;
    }
  }
`;
