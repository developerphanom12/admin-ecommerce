import React from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

const Dashboard = () => {
  // Line Chart for User Registrations Over Time
  const userRegistrationsOptions = {
    chart: {
      type:"line",
      height:350,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "User Registrations Over Time",
      align: "left",
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#2ca5d6'
      },
    },
  };
  const userRegistrationsSeries = [
    {
      name: "Registrations",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 160, 170],
    },
  ];

  // Bar Chart for Bookings by Category
  const bookingsOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: ["Event A", "Event B", "Service A", "Service B"],
    },
    title: {
      text: "Monthly Booking",
      align: "left",
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#2ca5d6'
      },
    },
  };
  const bookingsSeries = [
    {
      name: "Bookings",
      data: [30, 40, 45, 50],
    },
  ];

  // Pie/Donut Chart for Payment Methods Usage
  const paymentMethodsOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Credit Card", "PayPal", "Bank Transfer"],
    title: {
      text: "Payment Methods Usage",
      align: "left",
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#2ca5d6'
      },
    },
  };

  const paymentMethodsSeries = [55, 35, 10];

  // Area Chart for Revenue Over Time
  const revenueOptions = {
    chart: {
      type: "area",
      height: 350,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Revenue Over Time",
      align: "left",
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#2ca5d6'
      },
    },
  };

  const revenueSeries = [
    {
      name: "Revenue",
      data: [
        1000, 2000, 1500, 3000, 2000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
      ],
    },
  ];

  // Heatmap for User Engagement
  const engagementOptions = {
    chart: {
      type: "heatmap",
      height: 350,
    },
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    yaxis: {
      categories: ["Morning", "Afternoon", "Evening", "Night"],
    },
    title: {
      text: "User Engagement Heatmap",
      align: "left",
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        color: '#2ca5d6'
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 30,
              color: "#00A100",
              name: "Low",
            },
            {
              from: 31,
              to: 70,
              color: "#128FD9",
              name: "Medium",
            },
            {
              from: 71,
              to: 100,
              color: "#FFB200",
              name: "High",
            },
            {
              from: 101,
              to: 200,
              color: "#FF0000",
              name: "Very High",
            },
          ],
        },
      },
    },
  };
  const engagementSeries = [
    {
      name: "Engagement",
      data: [
        { x: "Monday", y: [10, 20, 50, 80] },
        { x: "Tuesday", y: [15, 25, 45, 70] },
        { x: "Wednesday", y: [30, 40, 60, 9] },
        { x: "Thursday", y: [20, 14, 26, 79] },
        { x: "Friday", y: [37, 21, 17, 66] },
        { x: "Saturday", y: [14, 18, 50, 100] },
        { x: "Sunday", y: [23, 37, 88, 22] },

        
      ],
    },
  ];

  return (
    <DashboardContainer>
      <ChartWrapper>
        <Chart
          options={userRegistrationsOptions}
          series={userRegistrationsSeries}
          type="line"
          height={350}
        />
      </ChartWrapper>
      <ChartWrapper>
        <Chart
          options={bookingsOptions}
          series={bookingsSeries}
          type="bar"
          height={350}
        />
      </ChartWrapper>
      <ChartWrapper>
        <Chart
          options={paymentMethodsOptions}
          series={paymentMethodsSeries}
          type="donut"
          height={350}
        />
      </ChartWrapper>
      <ChartWrapper>
        <Chart
          options={engagementOptions}
          series={engagementSeries}
          type="heatmap"
          height={350}
        />
      </ChartWrapper>
      <ChartWrapperDiv>
        <Chart
          options={revenueOptions}
          series={revenueSeries}
          type="area"
          height={350}
        />
      </ChartWrapperDiv>
    </DashboardContainer>
  );
};

export default Dashboard;
// Styled Components for Layout
const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 567px){
    padding:0;

  }
  @media (min-width: 567px) and (max-width: 992px) {
    padding:0;

  }

  .apexcharts-toolbar {
    display: none;
}

text#SvgjsText21001 {
    font-size: 14px!important;
    font-family: poppins!important;
    font-weight: 600!important;
    color: #2ca5d6!important;
}
`;

const ChartWrapper = styled.div`
  width: 48%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ChartWrapperDiv = styled.div`
width: 100%;
margin-bottom: 20px;


`;
