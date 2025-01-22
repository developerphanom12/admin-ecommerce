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
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FcNext, FcPrevious } from "react-icons/fc";

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
  const [selectedVehicle, setSelectedVehicle] = useState("");

  // Handler for radio button change
  const handleVehicleChange = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
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

  // const handleDelete = async (serviceId) => {};
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

  const productlist = [
  {
    title: "Product 1",
    status: "Active",
    inventory: 20,
    category: "Electronics",
    vendor: "Vendor A",
  },
  {
    title: "Product 2",
    status: "Draft",
    inventory: 15,
    category: "Fashion",
    vendor: "Vendor B",
  },
];


  const servicelist = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "service_name" },
    { header: "Vehicle Type", accessor: "vehicle_type" },
    { header: "Date", accessor: "create_date" },
    { header: "Update Date", accessor: "update_date" },
    { header: "Images", accessor: "icon" },
    { header: "View More", accessor: "view" },
    { header: "Delete", accessor: "delete" },
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
        `${EXCHNAGE_URL}/servicedeleted`,
        {
          id: id,
          is_deleted: isApproved,
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
            Add Products
          </MainButton>

          <MainButton
            className={selectedButton === 4 ? "selected" : ""}
            onClick={() => handleButtonClick(4)}
          >
            All Products
          </MainButton>

          <MainButton
            className={selectedButton === 2 ? "selected" : ""}
            onClick={() => handleButtonClick(2)}
          >
            Category List
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
            <>
              <div className="add_service_div">
                <form onSubmit={handleSubmit}>
                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>Title</Subdiv>
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="inp_col">
                      <Subdiv>Description</Subdiv>
                      <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>Price</Subdiv>
                      <input
                        type="text"
                        placeholder="₹ 0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="inp_col">
                      <Subdiv>Available Categories</Subdiv>
                      <select
                        value={selectedService}
                        onChange={handleServiceChange}
                      >
                        <option value="">Select Categories</option>
                        {services.map((serviceItem) => (
                          <option key={serviceItem.id} value={serviceItem.id}>
                            {serviceItem.service_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>Compare-at-price</Subdiv>
                      <input
                        type="text"
                        placeholder="₹ 0.00"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                    <div className="inp_col">
                      <Subdiv>Image</Subdiv>
                      <div className="photo_choose">
                        <div className="upload_btn">
                          <BlackBorderButton>Upload Media</BlackBorderButton>
                          <input
                            type="file"
                            className="file_input"
                            multiple
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>SKU (Stock Keeping Unit)</Subdiv>
                      <input
                        type="text"
                        placeholder="sku-123"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="inp_col">
                      <Subdiv>Inventory</Subdiv>
                      <input
                        type="number"
                        placeholder="20"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="inp_row">
                    <div className="inp_col">
                      <h5> Product Variations</h5>
                      <form id="variationForm">
                        <div className="variation_row">
                          <div className="inp_row">
                            <input
                              type="text"
                              name="variationName"
                              placeholder="Variation Name (e.g., Size, Color)"
                              className="variation_input"
                            />

                            <input
                              type="text"
                              name="variationValue"
                              placeholder="Variation Value (e.g., Large, Red)"
                              className="variation_input"
                            />

                            <button
                              type="button"
                              className="add_variation_btn"
                              onClick={() =>
                                alert("Add variation functionality goes here.")
                              }
                            >
                              Add Variation
                            </button>
                          </div>
                        </div>
                      </form>
                      <div id="variationList">
                        {/* Dynamically added variations will appear here */}
                      </div>
                    </div>
                  </div>

                  <div className="seo">
                    <h5>Search Engine Optimization (SEO) </h5>
                  </div>

                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>Meta Title</Subdiv>
                      <input
                        type="text"
                        placeholder="Enter Meta Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="inp_col">
                      <Subdiv>Meta Description</Subdiv>
                      <textarea
                        type="textarea"
                        placeholder="Enter Meta Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv className="submit_btn">
                        <input
                          type="radio"
                          name="vehicle"
                          value="Bike"
                          onChange={() => handleVehicleChange("Bike")}
                        />
                        -Open Bike List
                      </Subdiv>
                      <select>
                        <option value="">Select to show List</option>
                        {selectedVehicle === "Bike" && (
                          <>
                            <option value="Cruiser">Cruiser</option>
                            <option value="Sportbike">Sportbike</option>
                            <option value="Bullet Bike">Bullet Bike</option>
                            <option value="Adventure">
                              Adventure / Dual-Sport
                            </option>
                            <option value="Standard">
                              Standard / Naked Bike
                            </option>
                            <option value="Touring">Touring</option>
                            <option value="Bobber">Bobber</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Electric">
                              Electric Motorcycle
                            </option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="inp_col">
                      <Subdiv className="submit_btn">
                        <input
                          type="radio"
                          name="vehicle"
                          value="Car"
                          onChange={() => handleVehicleChange("Car")}
                        />
                        -Open Car List
                      </Subdiv>
                      <select>
                        <option value="">Select to show List</option>
                        {selectedVehicle === "Car" && (
                          <>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">
                              SUV (Sport Utility Vehicle)
                            </option>
                            <option value="Compact SUV">Compact SUV</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Sports Car">Sports Car</option>
                            <option value="Crossover">Crossover (CUV)</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Electric Vehicle">
                              Electric Vehicle (EV)
                            </option>
                            <option value="Hybrid Vehicle">
                              Hybrid Vehicle
                            </option>
                            <option value="Van">Van</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div> */}

                  <div className="inp_row">
                    <div className="inp_col">
                      <Subdiv>Features</Subdiv>
                      <div className="feat_div">
                        {service.map((serv, index) => (
                          <div key={index} className="service_input_wrapper">
                            <input
                              type="text"
                              placeholder="Products"
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
                      <BlackBorderButton
                        type="button"
                        onClick={handleAddService}
                      >
                        Add Another Service
                      </BlackBorderButton>
                    </div>

                    <div className="inp_col">
                      <div className="submit_btn">
                        <MainButton type="submit">Submit Now</MainButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
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
                    {datalist && datalist?.length > 0 ? (
                      datalist.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {servicelist.map((column, colIndex) => (
                            <td key={colIndex}>
                              {column.accessor === "image" ? (
                                <img
                                  src={row[column.accessor]}
                                  alt="Service"
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
                              ) : column.accessor === "icon" ? (
                                <RedirectButton
                                  onClick={() =>
                                    navigate(
                                      `/service-details/Upload-images/${row.id}`,
                                      { state: { rowData: row } }
                                    )
                                  }
                                >
                                  <GrView />
                                </RedirectButton>
                              ) : column.accessor === "view" ? (
                                <RedirectButton
                                  onClick={() =>
                                    navigate(`/service-details/${row.id}`)
                                  }
                                >
                                  View
                                </RedirectButton>
                              ) : column.accessor === "delete" ? (
                                <RedirectButton
                                  onClick={() => handleApproval(row.id, 1)}
                                >
                                  <MdDelete />
                                </RedirectButton>
                              ) : (
                                row[column.accessor]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr
                        style={{
                          color: "red",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        <td colSpan="7">
                          ----------------No Data---------------
                        </td>
                      </tr>
                    )}
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
                    {datavehicle && datavehicle?.length > 0 ? (
                      datavehicle.map((row, rowIndex) => (
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
                                  }}
                                />
                              ) : (
                                row[column.accessor]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr
                        style={{
                          color: "red",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        <td colSpan="7">
                          ----------------No Data---------------
                        </td>
                      </tr>
                    )}
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
          {selectedButton === 4 && (
            <>
              <div className="partner_div">
                <table>
                  <thead>
                    <tr>
                      <th>Product Title</th>
                      <th>Status</th>
                      <th>Inventory</th>
                      <th>Category</th>
                      <th>Vendor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productlist && productlist?.length > 0 ? (
                      datalist.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{row.title || "Product 1"}</td>
                          <td>{row.status || "Draft"}</td>
                          <td>{row.inventory || "20"}</td>
                          <td>{row.category || "Electronics"}</td>
                          <td>{row.vendor || "Vendor A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            color: "red",
                            fontWeight: "600",
                          }}
                        >
                          ----------------No Data---------------
                        </td>
                      </tr>
                    )}
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
  .seo {
    padding-top: 27px;
  }
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

    .content_div {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      height: auto;
      width: 100%;
      padding-bottom: 20px;

      .add_service_div {
        padding: 0 20%;
        height: 100%;
        .inp_row {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          align-items: flex-end;
          .inp_col {
            display: flex;
            flex-direction: column;
            flex: 1;
            input,
            select {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
              color: #8b8989;
            }

            .photo_choose {
              .upload_btn {
                display: flex;
                justify-content: center;
                position: relative;
                button {
                  width: 100%;
                }
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

            .feat_div {
              display: flex;
              flex-direction: column;
              .service_input_wrapper {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                margin-left: 20px;
                input {
                  width: 100%;
                }
                svg {
                  color: #9b9393;
                }
              }
            }
          }
        }
      }
    }
    .submit_btn {
      display: flex;
      justify-content: center;
      align-items: center;
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
      gap: 18px;
    }

    .services_main_div .content_div .add_service_div {
      padding: 0 5%;
      height: unset;
      .inp_row {
        align-items: unset;
        flex-direction: column;
      }
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .services_main_div .content_div {
      padding-bottom: 20px;
    }

    .services_main_div .content_div .add_service_div {
      padding: 0 10%;
    }

    /* .services_main_div
      .content_div
      .add_ser_div
      .add_second_div
      .features_div
      .feat_div {
      width: 100%;
      .service_input_wrapper {
        margin-left: 0px;
      }
    } */
  }
`;
