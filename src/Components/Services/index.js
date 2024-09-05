import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BlackBorderButton,
  MainButton,
  RedirectButton,
  Subdiv,
} from "../Global";
import axios from "axios";
import { EXCHNAGE_URL, EXCHNAGE_URL_USERS } from "../../url/Url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FcNext, FcPrevious } from "react-icons/fc";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .max(200, "Description must be less than 200 characters"),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1 minute")
    .max(30, "Duration cannot exceed 30 minutes"),
  selectedService: Yup.string().required("Service selection is required"),
  price: Yup.number().required("Price is required"),
  images: Yup.mixed().required("At least one image is required"),
  service: Yup.array()
    .of(Yup.string().required("Feature is required"))
    .min(1, "At least one feature must be added"),
});

export const Services = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState([]);
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [datalist, setDatalist] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    axios
      .get(`${EXCHNAGE_URL_USERS}/postdataget`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          setServices(response.data.data);
          setDatalist(response.data.data);
          setTotalRecords(response.data.totalRecords);
        } else {
          console.error("Failed to fetch services:", response.data.message);
          setServices([]);
          setDatalist([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setServices([]);
        setDatalist([]);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }
    if (!duration) {
      toast.error("Duration is required");
      return;
    }
    if (isNaN(duration) || duration > 30) {
      toast.error("Duration must be a number less than or equal to 30 minutes");
      return;
    }
    if (!selectedService) {
      toast.error("You must select a service");
      return;
    }
    if (!price) {
      toast.error("Price is required");
      return;
    }
    if (service.length === 0) {
      toast.error("At least one feature is required");
      return;
    }
    if (images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("service_type", selectedService);
      formData.append("price", price);
      formData.append("service", JSON.stringify(service));

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await axios.post(
        `${EXCHNAGE_URL_USERS}/vehicle-datalist`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;

      if (result.status) {
        toast.success("Data Added Successfully");
        navigate("/dashboard-overview");
      } else {
        toast.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong");
    }
  };

  const handleDelete = async (serviceId) => {};
  const handleAddService = () => {
    setService([...service, ""]);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleServiceChangesss = (index, event) => {
    const { value } = event.target;

    const updatedServices = [...service];

    if (index >= 0 && index < updatedServices.length) {
      updatedServices[index] = value;
      setService(updatedServices);
    } else {
      console.error(`Invalid index ${index} for service array.`);
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = service.filter((_, i) => i !== index);
    setService(updatedServices);
  };

  const servicelist = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "service_name" },
    { header: "Vehicle Type", accessor: "vehicle_type" },
    { header: "Date", accessor: "create_date" },
    { header: "Update Date", accessor: "update_date" },
    { header: "Delete", accessor: "delete" },
    { header: "View More", accessor: "view" },
  ];

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };
  const vehicledetails = [
    { header: "ID", accessor: "id" },
    { header: "Vehicle", accessor: "vehicle" },
    { header: "Date", accessor: "date" },
  ];

  const datavehicle = [
    {
      id: 1,
      name: "Avineet ",
      vehicle: "Car",
      date: "18 August ",
    },
    {
      id: 1,
      name: "Avineet ",
      vehicle: "Bike",
      date: "18 August ",
    },
  ];
  const handleApproval = async (id, isApproved) => {
    try {
      const response = await axios.post(
        `${EXCHNAGE_URL}/servicedeleted`, // Replace with your actual API endpoint
        {
          id: id, // Pass the ID dynamically
          is_deleted: isApproved, // 1 for approved, 0 for not approved
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === true) {
        const message = response.data.message;
        navigate("/managing_users_partners");
        toast.success(message);
      } else if (response.data.status === false) {
        const message = response.data.message;
        navigate("/managing_users_partners");
        toast.success(message);
      }
    } catch (error) {
      console.error("Error updating vendor approval status:", error);
      toast.error(
        error.response?.data?.message ||
          "Error updating vendor approval status."
      );
    }
  };
  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };
  return (
    <Root>
      <div className="services_main_div">
        <div className="butt_div">
          <MainButton
            className={selectedButton === 1 ? "selected" : ""}
            onClick={() => handleButtonClick(1)}
          >
            Add Services
          </MainButton>

          <MainButton
            className={selectedButton === 2 ? "selected" : ""}
            onClick={() => handleButtonClick(2)}
          >
            Service List
          </MainButton>

          <MainButton
            className={selectedButton === 3 ? "selected" : ""}
            onClick={() => handleButtonClick(3)}
          >
            Vehicle Details
          </MainButton>
        </div>

        <div className="content_div">
          {selectedButton === 1 && (
            <div className="add_ser_div">
              <form onSubmit={handleSubmit}>
                <div className="add_first_div">
                  <div className="title_div">
                    <Subdiv>Title</Subdiv>
                    <input
                      type="text"
                      placeholder="Lorem Ipsum"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="desc_div">
                    <Subdiv>Description</Subdiv>
                    <input
                      type="text"
                      placeholder="Lorem Ipsum"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="duration_div">
                    <Subdiv>Duration (min)</Subdiv>
                    <input
                      type="text"
                      placeholder="30"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>

                  <div className="service_div">
                    <Subdiv>Available Services</Subdiv>
                    <select
                      value={selectedService}
                      onChange={handleServiceChange}
                    >
                      <option value="">Select a service</option>
                      {services.map((serviceItem) => (
                        <option key={serviceItem.id} value={serviceItem.id}>
                          {serviceItem.service_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="add_second_div">
                  <div className="price_div">
                    <Subdiv>Price</Subdiv>
                    <input
                      type="text"
                      placeholder="2000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="image_div">
                    <Subdiv>Image</Subdiv>
                    <div className="photo_choose">
                      <div className="upload_btn">
                        <BlackBorderButton>Upload Images</BlackBorderButton>
                        <input
                          type="file"
                          className="file_input"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="features_div">
                    <Subdiv>Features</Subdiv>
                    <div className="feat_div">
                      {service.map((serv, index) => (
                        <div key={index} className="service_input_wrapper">
                          <input
                            type="text"
                            placeholder="Service"
                            value={serv || ""}
                            onChange={(e) => handleServiceChangesss(index, e)}
                          />
                          <RxCross2
                            onClick={() => handleRemoveService(index)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                    <BlackBorderButton type="button" onClick={handleAddService}>
                      Add Another Service
                    </BlackBorderButton>
                  </div>
                </div>
                <div className="submit_btn">
                  <MainButton type="submit">Submit Now</MainButton>
                </div>
              </form>
            </div>
          )}

          {selectedButton === 2 && (
            <>
              <div className="partner_div">
                <table>
                  <thead>
                    <tr>
                      {servicelist.map((column, index) => (
                        <th key={index}>{column.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datalist.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {servicelist.map((column, colIndex) => (
                          <td key={colIndex}>
                            {column.accessor === "image" ? (
                              <img
                                src={row[column.accessor]}
                                alt="Image"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : column.accessor === "vehicle_type" ? (
                              row[column.accessor] === 1 ? (
                                "Bike"
                              ) : row[column.accessor] === 2 ? (
                                "Car"
                              ) : (
                                "Unknown"
                              )
                            ) : column.accessor === "create_date" ||
                              column.accessor === "update_date" ? (
                              new Date(row[column.accessor])
                                .toISOString()
                                .split("T")[0]
                            ) : column.accessor === "delete" ? (
                              <RedirectButton
                                onClick={() => handleApproval(row.id, 1)}
                              >
                                <MdDelete />
                              </RedirectButton>
                            ) : column.accessor === "view" ? (
                              <RedirectButton
                                onClick={() =>
                                  navigate(`/service-details/${row.id}`)
                                }
                              >
                                View
                              </RedirectButton>
                            ) : (
                              row[column.accessor]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(Math.max(offset - limit, 0))}
                  disabled={offset === 0}
                >
                  <FcPrevious />
                </button>
                <button
                  onClick={() => handlePageChange(offset + limit)}
                  disabled={offset + limit >= totalRecords}
                >
                  <FcNext />
                </button>
              </div>
            </>
          )}
          {selectedButton === 3 && (
            <>
              <div className="partner_div">
                <table>
                  <thead>
                    <tr>
                      {vehicledetails.map((column, index) => (
                        <th key={index}>{column.header}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {datavehicle.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {vehicledetails.map((column, colIndex) => (
                          <td key={colIndex}>
                            {column.accessor === "image" ? (
                              <img
                                src={row[column.accessor]}
                                alt="vehicle img"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }} // adjust size as needed
                              />
                            ) : (
                              row[column.accessor]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(Math.max(offset - limit, 0))}
                  disabled={offset === 0}
                >
                  <FcPrevious />
                </button>
                <button
                  onClick={() => handlePageChange(offset + limit)}
                  disabled={offset + limit >= totalRecords}
                >
                  <FcNext />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 20px 0px;
    button {
      border-radius: 50px;
      background-color: #fff;
      border: 2px solid lightgray;
    }

    button:not(:disabled) {
      cursor: pointer;
      border: 2px solid #2ca5d6;
    }
  }
  .services_main_div {
    display: flex;
    gap: 20px;
    flex-direction: column;

    .butt_div {
      display: flex;
      gap: 20px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      overflow-x: auto;
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
        padding: 15px;
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

    .content_div {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      height: 500px;
      width: 100%;
      .add_ser_div {
        display: flex;
        gap: 20px;
        flex-direction: column;
        margin-top: 40px;
        .add_first_div {
          display: flex;
          gap: 20px;
          .title_div {
            height: 100px;
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }
          }

          .desc_div {
            height: 100px;
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }
          }

          .duration_div {
            height: 100px;
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }
          }

          .service_div {
            height: 100px;
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            select {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              width: 90%;
              color: #8b8989;
            }
          }
        }
        .add_second_div {
          display: flex;
          gap: 20px;
          .price_div {
            height: 100px;
            width: 30%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }
          }

          .image_div {
            height: 100px;
            width: 30%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            .photo_choose {
              .upload_btn {
                display: flex;
                justify-content: center;
                position: relative;

                .file_input {
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

          .features_div {
            height: 100px;
            width: 30%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            .feat_div {
              display: flex;
              flex-direction: column;
              .service_input_wrapper {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                margin-left: 20px;
                svg {
                  color: #9b9393;
                }
              }
            }
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }
          }
        }
        .submit_btn {
          display: flex;
          justify-content: center;
        }
      }
    }

    .content_div::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 567px) {
    .services_main_div .content_div {
      padding-bottom: 20px;
    }
    .services_main_div .butt_div {
      flex-wrap: wrap;
      justify-content: center;
    }

    .services_main_div .content_div .add_ser_div {
      flex-wrap: wrap;
    }
    .services_main_div .content_div .add_ser_div .add_first_div {
      flex-wrap: wrap;
      gap: 0;
      padding: 0 10px;
      .title_div {
        width: 100%;
        input {
          width: 100%;
        }
      }
      .desc_div {
        width: 100%;
        input {
          width: 100%;
        }
      }
      .duration_div {
        width: 100%;
        input {
          width: 100%;
        }
      }
      .service_div {
        width: 100%;
        select {
          width: 100%;
        }
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div {
      flex-wrap: wrap;
      gap: 0;
      padding: 0 10px;
      .price_div {
        width: 100%;
        input {
          width: 100%;
        }
      }
      .image_div {
        width: 100%;
        .photo_choose {
          width: 100%;
          button {
            width: 100%;
          }
        }
      }
      .features_div {
        width: 100%;
        button {
          width: 100%;
        }
      }
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .services_main_div .content_div {
      padding-bottom: 20px;
    }
    .services_main_div .content_div .add_ser_div .add_first_div {
      flex-wrap: wrap;
      gap: 2px;
    }

    .services_main_div .content_div .add_ser_div {
      gap: 0px;
      margin-top: 20px;
      padding: 0 20px;
    }

    .services_main_div .content_div .add_ser_div .add_first_div .title_div {
      width: 48%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .desc_div {
      width: 48%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .duration_div {
      width: 48%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .service_div {
      width: 48%;
      select {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div {
      flex-wrap: wrap;
      gap: 2px;
    }

    .services_main_div .content_div .add_ser_div .add_second_div .price_div {
      width: 48%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div .image_div {
      width: 48%;
      input {
        width: 100%;
      }
      .photo_choose {
        width: 100%;
        .upload_btn {
          button {
            width: 100%;
          }
        }
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div .features_div {
      width: 48%;
      input {
        width: 100%;
      }
      button {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .submit_btn {
      justify-content: flex-end;
    }

    .services_main_div
      .content_div
      .add_ser_div
      .add_second_div
      .features_div
      .feat_div {
      width: 100%;
      .service_input_wrapper {
        margin-left: 0px;
      }
    }
  }
`;
