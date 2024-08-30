import React, { useState } from "react";
import styled from "styled-components";
import { MainButton, Subdiv } from "../Global";
import logo from "../../Assets/logo.png";

export const Services = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  const [adddata, setAddData] = useState([
    {
      title: "",
      description: "",
      duration: "",
      servicetype: "",
      price: "",
      image: "",
      features: "",
    },
  ]);

  const handleInputChange = (e, rowIndex, accessor) => {
    const newData = [...adddata];
    if (accessor === "image") {
      newData[rowIndex][accessor] = e.target.files;
    } else {
      newData[rowIndex][accessor] = e.target.value;
    }
    setAddData(newData);
  };

  const addservice = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Duration (Days)", accessor: "duration" },
    { header: "Service Type", accessor: "servicetype" },
    { header: "Price", accessor: "price" },
    { header: "Image", accessor: "image" },
    { header: "Features", accessor: "features" },
  ];

  const servicelist = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Vehicle Type", accessor: "vehicletype" },
    { header: "Date", accessor: "date" },
    { header: "Image", accessor: "image" },
  ];

  const datalist = [
    {
      id: 1,
      name: "Avineet ",
      vehicletype: "Car",
      date: "18 August ",
      image: "logo.png",
    },
  ];

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
  ];

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
            // <div className="user_div">
            //   <table>
            //     <thead>
            //       <tr>
            //         {addservice.map((column, index) => (
            //           <th key={index}>{column.header}</th>
            //         ))}
            //       </tr>
            //     </thead>
            //     <tbody>
            //       {adddata.map((row, rowIndex) => (
            //         <tr key={rowIndex}>
            //           {addservice.map((column, colIndex) => (
            //             <td key={colIndex}>
            //               {column.accessor === "image" ? (
            //                 <input
            //                   type="file"
            //                   onChange={(e) =>
            //                     handleInputChange(e, rowIndex, column.accessor)
            //                   }
            //                   multiple
            //                 />
            //               ) : column.accessor === "servicetype" ? (
            //                 <select
            //                   value={row[column.accessor]}
            //                   onChange={(e) =>
            //                     handleInputChange(e, rowIndex, column.accessor)
            //                   }
            //                 >
            //                   <option value="car">Car</option>
            //                   <option value="Bike">Bike</option>
            //                 </select>
            //               ) : (
            //                 <input
            //                   type="text"
            //                   value={row[column.accessor]}
            //                   onChange={(e) =>
            //                     handleInputChange(e, rowIndex, column.accessor)
            //                   }
            //                 />
            //               )}
            //             </td>
            //           ))}
            //         </tr>
            //       ))}
            //     </tbody>
            //   </table>
            // </div>
            <div className="add_ser_div">
              <div className="add_first_div">
                <div className="title_div">
                  <Subdiv>Title</Subdiv>
                  <input type="text" placeholder="Lorem Ipsum" />
                </div>
                <div className="desc_div">
                  <Subdiv>Description</Subdiv>

                  <input type="text" placeholder="Lorem Ipsum" />
                </div>
                <div className="duration_div">
                  <Subdiv>Duration (Days)</Subdiv>
                  <input type="text" placeholder="45" />
                </div>
                <div className="service_div">
                  <Subdiv>Service Type</Subdiv>
                  <select name="cars" id="cars">
                    <option value="choose">Choose</option>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                  </select>
                </div>
              </div>
              <div className="add_second_div">
                <div className="price_div">
                  <Subdiv>Price</Subdiv>
                  <input type="text" placeholder="2000" />
                </div>

                <div className="image_div">
                  <Subdiv>Image</Subdiv>
                  <div className="photo_choose">
                    <input type="file" placeholder="Lorem Ipsum" multiple />
                  </div>
                </div>

                <div className="features_div">
                  <Subdiv>Features</Subdiv>
                  <input type="text" placeholder="Lorem Ipsum" />
                </div>
              </div>
              <div className="submit_btn">
                <MainButton type="submit">Submit</MainButton>
              </div>
            </div>
          )}

          {selectedButton === 2 && (
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
          )}

          {selectedButton === 3 && (
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
                              alt="Image"
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
          )}
        </div>
      </div>
    </Root>
  );
};

const Root = styled.section`
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
              input {
                border: 1px solid #ccc;
                border-radius: 4px;
                height: 40px;
                font-size: 14px;
                font-weight: 400;
                padding: 5px 40px;
                width: 100%;
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
            input {
              border: 1px solid #ccc;
              border-radius: 4px;
              height: 40px;
              font-size: 14px;
              font-weight: 400;
              padding: 0 10px;
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
    .services_main_div .butt_div {
      flex-wrap: wrap;
      justify-content: center;
    }

    .services_main_div .content_div .add_ser_div {
    flex-wrap:wrap;
}
 .services_main_div .content_div .add_ser_div .add_first_div {

    flex-wrap: wrap;
}

.services_main_div .content_div .add_ser_div .add_first_div .title_div {
    width: 100%;
   
}
  }

  @media (min-width: 567px) and (max-width: 992px) {
    .services_main_div .content_div .add_ser_div .add_first_div {
      flex-wrap: wrap;
      justify-content: center;
      gap: 2px;
    }

    .services_main_div .content_div .add_ser_div {
      gap: 0px;

      margin-top: 20px;
    }

    .services_main_div .content_div .add_ser_div .add_first_div .title_div {
      width: 45%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .desc_div {
      width: 45%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .duration_div {
      width: 45%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_first_div .service_div {
      width: 45%;
      select {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div {
      flex-wrap: wrap;
      justify-content: center;
      gap: 2px;
    }

    .services_main_div .content_div .add_ser_div .add_second_div .price_div {
      width: 45%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div .image_div {
      width: 45%;
      input {
        width: 100%;
      }
    }

    .services_main_div .content_div .add_ser_div .add_second_div .features_div {
      width: 45%;
      input {
        width: 100%;
      }
    }
  }
`;
