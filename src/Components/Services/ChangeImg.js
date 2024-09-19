import React, { useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { EXCHNAGE_URL } from "../../url/Url";

export default function ChangeImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { rowData } = location.state || {};
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("id", id);

    try {
      const response = await axios.put(
        `${EXCHNAGE_URL}/serviceupdate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        navigate("/services");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <img
          src={`https://api-carwash.phanomprofessionals.com/uploads/${rowData?.image}`}
          alt="Service Image"
           
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview"   />
        )}
        <button type="submit">Upload Image</button>
      </form>
    </StyledDiv>
  );
}

// Styled component for the form
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  img {
    border: 2px solid #ddd;
    border-radius: 8px;
    width: 60%;
    height:auto;
    object-fit: cover;
  }

  input {
    margin-bottom: 10px;
    text-align: center;
  }

  button {
    margin: 0px 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
