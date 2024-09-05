import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getApi = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/today`,axiosConfig);
        if (response.status === 200){
            setData(response.data.data);     
            console.log("setData", response.data.data);
        }
    } catch (error){
      console.error("error",error);
    }

  };

  useEffect(() => {
    getApi();
  }, []);


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
            <MdBarChart/>
          </>

          <CardTitle>User Registrations Over Time</CardTitle>
          <CardValue> {data ? `Today: ${data.users.Today}, Total: ${data.users.Total}` : "Loading..."}</CardValue>
          {/* <CardValue>₹789.84</CardValue> */}
        </Card>
        <Card color="#ffa726">
          <>
            <HiOutlineClipboardList />
          </>
          <CardTitle>Total Bookings</CardTitle>
          {/* <CardValue>₹0.00</CardValue> */}
          <CardValue> {data ? `Today: ${data.bookings.Today}, Total: ${data.bookings.Total}` : "Loading..."}</CardValue>
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
          <CardTitle>Total Vendor</CardTitle>
          <CardValue>{data ? `Today: ${data.vendors.Today}, Total: ${data.vendors.Total}` : "Loading..."}</CardValue>
        </Card>
      </CardsContainer>

      <StatsContainer>
        <StatBox>
          <LogoBox className="cancel">
            <FaShoppingCart />
          </LogoBox>
          <TextBox>
            <StatTitle>Total Order</StatTitle>
            <StatValue>251</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox className="pending">
            <FaHourglassHalf />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Pending</StatTitle>
            <StatValue color="red">68 (₹36651.52)</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox className="processing">
            <FaCog />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Processing</StatTitle>
            <StatValue>26</StatValue>
          </TextBox>
        </StatBox>
        <StatBox>
          <LogoBox className="delivered">
            <FaCheckCircle />
          </LogoBox>
          <TextBox>
            <StatTitle>Orders Delivered</StatTitle>
            <StatValue>129</StatValue>
          </TextBox>
        </StatBox>
      </StatsContainer>

    <TableDiv>
      <Table>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Order Time</th>
            <th>Customer Name</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            <th>Invoice</th>
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
              <td>
                <p className={order.status.toLowerCase()}>{order.status}</p>
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
  color: ${({ color }) => (color ? color : "black")};
`;

// .table_div {
//   overflow: auto;
// }

const TableDiv = styled.div`
  overflow: auto;
`

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
    @media (max-width: 992px){
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
`;
