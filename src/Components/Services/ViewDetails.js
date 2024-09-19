import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";


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
          setServiceDetails(response.data.data);
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

  return (
    <div className="service-view-container">
      {serviceDetails ? (
        <div className="service-details">
          {/* {/ Service Information Section /} */}
          <div className="service-info-section">
            <h1 className="service-title">{serviceDetails.title}</h1>
            <p className="service-description">{serviceDetails.description}</p>
            <div className="service-info">
              <p><strong>Price:</strong> ₹{serviceDetails.price}</p>
              <p><strong>Duration:</strong> {serviceDetails.duration} minutes</p>
              <p><strong>Date:</strong> {new Date(serviceDetails.create_date).toLocaleDateString()}</p>
            </div>
          </div>

          {/* {/ Images Section /} */}
          <div className="service-images-section">
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
          </div>

          {/* {/ Included Services Section /} */}
          <div className="included-services-section">
            <h3>Included Services:</h3>
            <ul>
              {serviceDetails.includeServices && serviceDetails.includeServices.length > 0 ? (
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
  );
};
