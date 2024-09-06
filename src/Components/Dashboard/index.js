import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaHourglassHalf,
  FaShoppingCart,
  FaTimesCircle,
} from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdBarChart, MdDateRange } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [order, setOrder] = useState(null);

  const getApi = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/today`, axiosConfig);
      if (response.status === 200) {
        setData(response.data.data);
        console.log("setData", response.data.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const getOrderApi = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(
        `${EXCHNAGE_URL}/orderlist`,
        axiosConfig
      );
      if (response.status === 200) {
        setOrder(response.data.data);
        console.log("setData", response.data.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getApi();
    getOrderApi();
  }, []);

  // const orders = [
  //   {
  //     orderNo: 11210,
  //     orderTime: "5 Sep, 2024 6:38 AM",
  //     customerName: "Johin Lo",
  //     method: "Cash",
  //     amount: "₹789.84",
  //     status: "Delivered",
  //   },
  //   {
  //     orderNo: 11255,
  //     orderTime: "5 Sep, 2024 12:20 AM",
  //     customerName: "john jkj ",
  //     method: "Card",
  //     amount: "₹860.98",
  //     status: "Pending",
  //   },
  //   {
  //     orderNo: 11211,
  //     orderTime: "4 Sep, 2024 11:36 PM",
  //     customerName: "Johin Lo",
  //     method: "Cash",
  //     amount: "₹946.98",
  //     status: "Processing",
  //   },
  //   {
  //     orderNo: 11254,
  //     orderTime: "4 Sep, 2024 11:11 PM",
  //     customerName: "john jkj",
  //     method: "Cash",
  //     amount: "₹250.00",
  //     status: "Pending",
  //   },
  //   {
  //     orderNo: 11254,
  //     orderTime: "4 Sep, 2024 11:11 PM",
  //     customerName: "avi",
  //     method: "Cash",
  //     amount: "₹250.00",
  //     status: "cancel",
  //   },
  //   // Add more orders as needed
  // ];

  return (
    <DashboardContainer>
      <CardsContainer>
        <Card color="#00796b">
          <>
            <MdBarChart />
          </>

          <CardTitle>User Registrations Over Time</CardTitle>
          <CardValue>
            {" "}
            {data
              ? `Today: ${data.users.Today}, Total: ${data.users.Total}`
              : "Loading..."}
          </CardValue>
        </Card>
        <Card color="#ffa726">
          <>
            <HiOutlineClipboardList />
          </>
          <CardTitle>Total Bookings</CardTitle>

          <CardValue>
            {" "}
            {data
              ? `Today: ${data.bookings.Today}, Total: ${data.bookings.Total}`
              : "Loading..."}
          </CardValue>
        </Card>
        <Card color="#42a5f5">
          <>
            <GiMoneyStack />
          </>
          <CardTitle> Payment Type</CardTitle>
          <CardValue>
            {data ? `Total: ${data.payment.total} ` : "Loading..."}
          </CardValue>
          <CardDetail>
            {" "}
            {data
              ? `Card: ${data.payment.card}, Credit: ${data.payment.credit}, Cash: ${data.payment.cash}`
              : "Loading..."}
          </CardDetail>
        </Card>
        <Card color="#26c6da">
          <>
            <MdDateRange />
          </>
          <CardTitle>Last Month Payment</CardTitle>
          <CardValue>
            {" "}
            {data ? `Total: ₹${data.lastpayment.total} ` : "Loading..."}
          </CardValue>

          <CardDetail>
            {" "}
            {data
              ? `Card: ₹${data.lastpayment.card}, Credit: ₹${data.lastpayment.credit}, Cash: ₹${data.lastpayment.cash}`
              : "Loading..."}
          </CardDetail>
        </Card>
        <Card color="#2e7d32">
          <>
            <FaChartLine />
          </>
          <CardTitle>Total Vendor</CardTitle>
          <CardValue>
            {data
              ? `Today: ${data.vendors.Today}, Total: ${data.vendors.Total}`
              : "Loading..."}
          </CardValue>
        </Card>
      </CardsContainer>

      <StatsContainer>
        <StatBox>
          <LogoBox className="processing">
            <FaShoppingCart />
          </LogoBox>
          <TextBox>
            <StatTitle> Total Orders</StatTitle>
            <StatValue color="#0a64f8">
              {data ? `${data.bookings.Total}` : "Loading..."}
            </StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox className="cancel">
            <FaTimesCircle />
          </LogoBox>
          <TextBox>
            <StatTitle>Cancelled Orders</StatTitle>
            <StatValue color="#e40707">
              {data ? `${data.bookings.Cancel}` : "Loading..."}
            </StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox className="pending">
            <FaHourglassHalf />
          </LogoBox>
          <TextBox>
            <StatTitle> Pending Orders</StatTitle>
            <StatValue color="#e19903">
              {data ? `${data.bookings.complered}` : "Loading..."}
            </StatValue>
          </TextBox>
        </StatBox>

        <StatBox>
          <LogoBox className="delivered">
            <FaCheckCircle />
          </LogoBox>
          <TextBox>
            <StatTitle> Delivered Orders</StatTitle>
            <StatValue color="#03714f">
              {" "}
              {data ? `${data.bookings.complered}` : "Loading..."}
            </StatValue>
          </TextBox>
        </StatBox>
      </StatsContainer>

      <TableDiv>
        <Table>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Order Time</th>
              <th>Customer Name</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order?.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.userid}</td>
                  <td>{order.is_booked}</td>
                  <td>{order.time_slot}</td>
                  <td>
                    <p className={order.status.toLowerCase()}>{order.status}</p>
                  </td>
                  <td>
                    <p>{order?.comment}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableDiv>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  i {
    cursor: pointer;
    margin-left: 10px;
  }

  .delivered {
    color: #059669;
    background-color: #d1fae5;
  }

  .pending {
    color: #ca8a04;
    background-color: #fef9c3;
  }

  .processing {
    color: #3b82f6;
    background-color: #dbeafe;
  }

  .cancel {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 999px) {
    flex-wrap: wrap;
  }
`;

const Card = styled.div`
  background-color: ${({ color }) => color};
  padding: 20px;
  color: white;
  border-radius: 10px;
  flex: 1;
  margin: 10px;
  min-width: 200px;
  max-height: 230px;
  display: flex;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  /* / justify-content: center; / */
  align-items: center;
  gap: 10px;
`;

const CardTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 0px;
`;

const CardValue = styled.h3`
  font-size: 15px;
  margin-bottom: 0px;
`;

const CardDetail = styled.p`
  font-size: 14px;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  svg {
    width: 42px;
    height: 42px;
    padding: 10px;
  }
`;
const LogoBox = styled.div`
  border-radius: 50%;
`;
const StatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  flex: 1;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StatValue = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: ${({ color }) => (color ? color : "black")};
`;

 
const TableDiv = styled.div`
  @media (max-width: 99px) {
    overflow-x: scroll;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  padding: 10px;
  /* overflow-x: scroll; */
  overflow: auto;
  svg {
    width: 18px;
    height: 18px;
    color: gray;
    @media (max-width: 992px) {
      width: 15px;
      height: 18px;
    }
  }
  .pending,
  .delivered,
  .processing,
  .cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-size: 14px;
    font-weight: 500;
    color: #2ca5d6;
    text-transform: capitalize;
  }

  td {
    font-size: 14px;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
  p {
    display: flex;
    align-items: center;
    margin: 0;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    color: grey;
    cursor: pointer;
    outline: #ef4444;
  }

  i {
    cursor: pointer;
    margin-left: 10px;
  }

  .delivered {
    color: #059669;
    background-color: #d1fae5;
  }

  .pending {
    color: #ca8a04;
    background-color: #fef9c3;
  }

  .processing {
    color: #3b82f6;
    background-color: #dbeafe;
  }

  .cancel {
    color: #ef4444;
    background-color: #fee2e2;
  }
  @media (max-width: 99px) {
    overflow-x: scroll;
  }
`;
