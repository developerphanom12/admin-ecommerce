import React from "react";
import ApexChart from "./charts/ApexChart";
import PieChart from "./charts/PieChart";
import styled from "styled-components";
import BarChart1 from "./charts/BarChart1";
import BarChart2 from "./charts/BarChart2";

export const Dashboard = () => {
  return (
    <Root>
      <div className="chart_div">
        <ApexChart />
        <PieChart />
      </div>
      <div className="bar_charts">
        <BarChart1/>
        <BarChart2/>
      </div>
      <div>
        <h3>overview of platform activity</h3>
      </div>
    </Root>
  );
};
const Root = styled.section`
  display: flex;
  flex-direction: column;
  .chart_div, .bar_charts{
    display: flex;
    align-items: center;
    width: 100%;
    flex: 1;
  }
  .chart-container {
    width: 50%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .chart_div {
      flex-direction: column;
    }
    .chart-container {
      width: 100%;
    }
  }
`;
