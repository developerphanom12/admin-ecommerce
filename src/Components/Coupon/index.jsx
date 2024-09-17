import React, { useState } from "react";
import styled from "styled-components";
import { MainButton } from "../Global";
import { useNavigate } from "react-router-dom";
import { EXCHNAGE_URL } from "../../url/Url";
import axios from "axios";
import { toast } from "react-toastify";

export const Coupon = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [discountType, setDiscountType] = useState("specific-collections");
  const [purchaseRequirement, setPurchaseRequirement] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!title) {
      errors.title = "Title is required";
      valid = false;
    }
    if (!amount) {
      errors.amount = "Amount is required";
      valid = false;
    }
    if (!purchaseRequirement) {
      errors.purchaseRequirement = "Minimum purchase requirement is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleCoupon = async () => {
    if (!validateForm()) return;

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `${EXCHNAGE_URL}/about-us`,
        {
          title,
          amount,
          discountType,
          purchaseRequirement,
        },
        axiosConfig
      );

      console.log("Server Response:", response.data);
      if (response?.data?.status === true) {
        const message = response?.data?.message;
        navigate("/");
        toast.success(message);
        console.log(message, "message");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error updating Coupon");
    }
  };

  return (
    <CouponStyled>
      <FormGroup>
        <Label>Enter Title & Amount </Label>
        <Row>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <Error>{errors.title}</Error>}

          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && <Error>{errors.amount}</Error>}
        </Row>
      </FormGroup>

      <FormGroup>
        <Label>Discount Value</Label>
        <Row>
          <Div>All products</Div>
          <Div value="one-time">One-time purchase</Div>
        </Row>
      </FormGroup>

      <FormGroup>
        <Label>Minimum purchase requirements</Label>

        <Input
          type="number"
          placeholder="₹ 0.00"
          value={purchaseRequirement}
          onChange={(e) => setPurchaseRequirement(e.target.value)}
        />
        {errors.purchaseRequirement && (
          <Error>{errors.purchaseRequirement}</Error>
        )}
      </FormGroup>
      <div className="submit_btn">
        <MainButton type="submit" onClick={handleCoupon}>
          Submit Now
        </MainButton>
      </div>
    </CouponStyled>
  );
};

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
  margin: 15px 0px 8px 0px;
  color: #2ca5d6;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #2ca5d6;
    outline-color: #2ca5d6;
  }
`;

const Div = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 8px;
  gap: 16px;
  @media (max-width: 999px) {
    flex-wrap: wrap;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
