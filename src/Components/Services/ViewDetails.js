import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";
import styled from "styled-components";
import bike from "../../Assets/bike.png";

export const ViewDetail = () => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);

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

  const viewdetails = [
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
          <div className="service-details">
          
            

            {/* {/ Service Information Section /} */}
            <div className="partner_div">
              <table>
                <thead>
                  <tr>
                    {viewdetails?.map((column, index) => (
                      <th key={index}>{column.header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    {viewdetails?.map((column, colIndex) => (
                      <td key={colIndex}>{serviceDetails[column.accessor]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* {/ Images Section /} */}
            <div className="image_div">
              <div className="image-gallery">
                {serviceDetails.images && serviceDetails.images.length > 0 ? (
                  serviceDetails.images.map((img) => (
                    //  <img
                    //    key={img.image_id}
                    //    src={`https://api-carwash.phanomprofessionals.com/uploads/${img.image}`}
                    //    alt={`Image for ${serviceDetails.title}`}
                    //    className="service-image"
                    // />

                    <>
                      <img src={bike} alt="img" />
                      <img src={bike} alt="img" />
                    </>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>

            {/* {/ Images Section /} */}
            {/* <div className="service-images-section">
              <h3>Images:</h3>
              <div className="image-gallery">
                {serviceDetails.images && serviceDetails.images.length > 0 ? (
                  serviceDetails.images.map((img) => (
                    <img
                      key={img.image_id}
                      src={`https://api-carwash.phanomprofessionals.com/uploads/${img.image}`}
                      alt={`Image for ${serviceDetails.title}`}
                      className="service-image"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div> */}

            {/* {/ Included Services Section /} */}
            <div className="included-services-section">
              <h2>Included Services:</h2>
              <ul>
                {serviceDetails.includeServices &&
                serviceDetails.includeServices.length > 0 ? (
                  serviceDetails.includeServices.map((service) => (
                    <li key={service.include_id}>{service.service}</li>
                  ))
                ) : (
                  <p>No included services available</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p>No service details available</p>
        )}
      </div>
    </Root>
  );
};

const Root = styled.section`
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
      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
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
