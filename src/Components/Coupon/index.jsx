import React from "react";
import styled from "styled-components";
import { MainButton } from "../Global";

export const Coupon = () => {
  return (
    <CouponStyled>
      <FormGroup>
        <Label>Amount off products</Label>
        <TabContainer>
          <Tab active>Automatic discount</Tab>
        </TabContainer>
        <Input type="text" placeholder="Title" />
      </FormGroup>

      <FormGroup>
        <Label>Discount Value</Label>
        <Row>
          <Input value="Fixed Amount"
          
          />
          <Input type="number" placeholder="Enter Amount" />
        </Row>
        <Row>
          <Select>
            <option value="specific-collections">Specific collections</option>
            <option value="all-products">All products</option>
          </Select>
          <Select>
            <option value="one-time">One-time purchase</option>
            <option value="subscription">Subscription</option>
          </Select>
        </Row>
      </FormGroup>

      <FormGroup>
        <Label>Minimum purchase requirements</Label>
        <RadioContainer>
          <RadioInput type="radio" name="min-purchase" checked />
          <Input type="number" placeholder="₹ 0.00" />
        </RadioContainer>
      </FormGroup>

      <FormGroup>
        <Label>Active dates</Label>
        <Row>
          <Input type="date" />
          <Input type="time" />
        </Row>
        <CheckboxContainer>
          <Checkbox type="checkbox" />
          <Label>Set end date</Label>
        </CheckboxContainer>
      </FormGroup>
      <div className="submit_btn">
        <MainButton type="submit">Submit Now</MainButton>
      </div>
    </CouponStyled>
  );
};

// Styles
const CouponStyled = styled.section`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2ca5d6;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: 2px solid #2ca5d6;
    outline-color: #2ca5d6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
  &:focus {
    border-color: 2px solid #2ca5d6;
    outline-color: #2ca5d6; /* This sets the outline color */
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  gap: 16px;
  @media (max-width: 999px) {
    flex-wrap: wrap;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const Tab = styled.button`
  background: ${(props) => (props.active ? "#2ca5d6" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  label {
    margin: 0;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;
