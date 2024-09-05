import React from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaCog,
  FaHourglassHalf,
  FaShoppingCart,
} from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineClipboardList, HiOutlineZoomIn } from "react-icons/hi";
import { MdBarChart, MdDateRange } from "react-icons/md";
import styled from "styled-components";

const Dashboard = () => {
  const orders = [
    {
      invoiceNo: 11210,
      orderTime: "5 Sep, 2024 6:38 AM",
      customerName: "Johin Lo",
      method: "Cash",
      amount: "₹789.84",
      status: "Delivered",
      action: "Delivered",
    },
    {
      invoiceNo: 11255,
      orderTime: "5 Sep, 2024 12:20 AM",
      customerName: "john jkj ",
      method: "Cash",
      amount: "₹860.98",
      status: "Pending",
      action: "Pending",
    },
    {
      invoiceNo: 11211,
      orderTime: "4 Sep, 2024 11:36 PM",
      customerName: "Johin Lo",
      method: "Cash",
      amount: "₹946.98",
      status: "Processing",
      action: "Processing",
    },
    {
      invoiceNo: 11254,
      orderTime: "4 Sep, 2024 11:11 PM",
      customerName: "john jkj",
      method: "Cash",
      amount: "₹250.00",
      status: "Pending",
      action: "Pending",
    },
    {
      invoiceNo: 11254,
      orderTime: "4 Sep, 2024 11:11 PM",
      customerName: "avi",
      method: "Cash",
      amount: "₹250.00",
      status: "cancel",
      action: "cancel",
    },
    // Add more orders as needed
  ];
  return (
    <DashboardContainer>
      <CardsContainer>
        <Card color="#00796b">
          <>
            <MdBarChart />
          </>

          <CardTitle>User Registrations Over Time</CardTitle>
          <CardValue>₹789.84</CardValue>
        </Card>
        <Card color="#ffa726">
          <>
            <HiOutlineClipboardList />
          </>

          <CardTitle>Total Bookings</CardTitle>
          <CardValue>₹0.00</CardValue>
        </Card>
        <Card color="#42a5f5">
          <>
            <GiMoneyStack />
          </>
          <CardTitle> Payment Type</CardTitle>
          <CardValue>₹1320.77</CardValue>
          <CardDetail>Cash: ₹789.84 | Card: ₹0.00 | Credit: ₹0.00</CardDetail>
        </Card>
        <Card color="#26c6da">
          <>
            <MdDateRange />
          </>
          <CardTitle>Last Month Payment</CardTitle>
          <CardValue>₹23347.85</CardValue>
          <CardDetail>Cash: ₹0.00 | Card: ₹0.00 | Credit: ₹0.00</CardDetail>
        </Card>
        <Card color="#2e7d32">
          <>
            <FaChartLine />
          </>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardValue>₹178224.57</CardValue>
        </Card>
      </CardsContainer>

      <StatsContainer>
        <StatBox>
          <LogoBox>
            <FaShoppingCart />
          </LogoBox>
          <TextBox>
            <StatTitle>Total Order</StatTitle>
            <StatValue>251</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox>
            <FaHourglassHalf />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Pending</StatTitle>
            <StatValue color="red">68 (₹36651.52)</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox>
            <FaCog />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Processing</StatTitle>
            <StatValue>26</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox>
            <FaCheckCircle />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Delivered</StatTitle>
            <StatValue>129</StatValue>
          </TextBox>
        </StatBox>
      </StatsContainer>
      <Table>
        <thead>
          <tr>
            <th>INVOICE NO</th>
            <th>ORDER TIME</th>
            <th>CUSTOMER NAME</th>
            <th>METHOD</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
            <th>INVOICE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.invoiceNo}</td>
              <td>{order.orderTime}</td>
              <td>{order.customerName}</td>
              <td>{order.method}</td>
              <td>{order.amount}</td>
              <td className={order.status.toLowerCase()}>
                <p>{order.status}</p>
              </td>
              <td>
                <select value={order.action}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </td>
              <td>
                <i className="fa fa-print" aria-hidden="true">
                  <FiPrinter />
                </i>
                <i className="fa fa-eye" aria-hidden="true">
                  <HiOutlineZoomIn />
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardValue = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CardDetail = styled.p`
  font-size: 14px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  svg {
    width: 40px;
    height: 40px;
    padding: 10px;
  }
`;
const LogoBox = styled.div``;
const StatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  color: ${({ color }) => (color ? color : "black")};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  padding: 10px;
  overflow-x: scroll;
  svg {
    width: 20px;
    height: 20px;
    color: gray;
  }
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    font-size: 14px;
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
`;
