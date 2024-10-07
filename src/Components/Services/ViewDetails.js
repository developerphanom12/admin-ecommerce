import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";
import styled from "styled-components";

export const ViewDetail = () => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState({});
  const [imagePreview, setImagePreview] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);
  const navigate = useNavigate();

  // Handle image file change
  const handleImageChange = (e, image_id) => {
    const file = e.target.files[0];

    // Set selected image and its preview for the corresponding imageId
    setSelectedImage((prev) => ({
      ...prev,
      [image_id]: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview((prev) => ({
        ...prev,
        [image_id]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e, image_id) => {
    e.preventDefault();

    if (!selectedImage[image_id]) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage[image_id]);
    formData.append("id", image_id);
    try {
      const response = await axios.put(
        `${EXCHNAGE_URL}/servicedata`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Image updated successfully!");

        const updatedServiceResponse = await axios.get(
          `${EXCHNAGE_URL}/detail/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (updatedServiceResponse.data.status) {
          setServiceDetails(updatedServiceResponse.data.data);
        }

        navigate("/services");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update the image.");
    }
  };

  // Fetch service details on mount
  useEffect(() => {
    dispatch(LoaderAction(true));
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${EXCHNAGE_URL}/detail/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.status) {
          toast.success("Service Details Retrieved Successfully");
          setServiceDetails(response?.data?.data);
        } else {
          toast.error("Service not found.");
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("Error fetching service details.");
      } finally {
        dispatch(LoaderAction(false));
      }
    };

    fetchServiceDetails();
  }, [id, dispatch]);

  if (isLoading) return <Loader />;

  const viewDetails = [
    { header: "Title", accessor: "title" },
    { header: "Price ₹", accessor: "price" },
    { header: "Description", accessor: "description" },
    { header: "Duration", accessor: "duration" },
    { header: "Create Date", accessor: "create_date" },
  ];

  return (
    <Root>
      <div className="service-view-container">
        {serviceDetails ? (
          <>
            <div className="partner_div">
              <table>
                <thead>
                  <tr>
                    {viewDetails.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {viewDetails.map((column, colIndex) => (
                      <td key={colIndex}>{serviceDetails[column.accessor]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="image_div">
              <div className="image-gallery">
                {serviceDetails?.images && serviceDetails?.images.length > 0 ? (
                  serviceDetails.images.map((img) => (
                    <div className="image-wrapper" key={img.image_id}>
                      <div className="input-image">
                        <img
                          src={`https://api-carwash.phanomprofessionals.com/uploads/${img.image}`}
                          alt={`it is for ${serviceDetails.title}`}
                          className="service-image"
                        />
                        <input
                          type="file"
                          className="file-input"
                          onChange={(e) => handleImageChange(e, img.image_id)}
                        />
                      </div>
                      <form onSubmit={(e) => handleSubmit(e, img.image_id)}>
                        <>
                          {imagePreview[img.image_id] && (
                            <img
                              src={imagePreview[img.image_id]}
                              alt="upload Preview"
                            />
                          )}
                        </>
                        <>
                          <button type="submit">Upload Image</button>
                        </>
                      </form>
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>

            <div className="included-services-section">
              <h2>Included Services:</h2>
              <ul>
                {serviceDetails?.includeServices?.length > 0 ? (
                  serviceDetails.includeServices.map((service) => (
                    <li key={service.include_id}>{service.service}</li>
                  ))
                ) : (
                  <p>No included services available</p>
                )}
              </ul>
            </div>
          </>
        ) : (
          <p>No service details available</p>
        )}
      </div>
    </Root>
  );
};

const Root = styled.section`
form{
  display: flex;
align-items: center;
justify-content: space-around;
}
  button {
    margin: 20px ;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
  .service-view-container {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    width: 100%;
    padding: 20px;
  }
  .partner_div {
    overflow: auto;
    table {
      border-collapse: collapse;
      width: 100%;

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
        padding: 8px;
        text-align: center;
      }

      input {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  .image_div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    .image-gallery {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      .image-wrapper {
        display: flex;
        position: relative;
   
        img {
          width: 100%;
          max-width: 200px;
          height: auto;
          border-radius: 10px;
          margin: 20px;
        }
        .input-image{
          position: relative;
          width: 30vw;
           img{
            position: relative;
           }
          .file-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }
  }

  .included-services-section {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #2ca5d6;
      text-align: left;
    }
    ul {
      text-align: left;

      li::marker {
        color: #2ca5d6;
      }
    }
  }
`;
