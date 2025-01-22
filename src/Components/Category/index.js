import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash, FaEye } from "react-icons/fa";

export const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold the category list
  const [showCategoryList, setShowCategoryList] = useState(false); // Toggle category list visibility

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) {
      alert("Category Name is required!");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      vehicleType: "Bike", // Example value; replace with input field if needed
      date: new Date().toISOString().split("T")[0],
      updateDate: new Date().toISOString().split("T")[0],
    };

    setCategories([...categories, newCategory]);

    // Reset form
    setCategoryName("");
    setDescription("");
    setImage(null);
  };

  // Handle category deletion
  const handleDelete = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
  };

  return (
    <Root>
      <div className="header">
        <button onClick={() => setShowCategoryList(!showCategoryList)}>
          {showCategoryList ? "Hide Category List" : "All Category List"}
        </button>
      </div>

      {showCategoryList && (
        <div className="category-table">
          <h3>All Categories</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Vehicle Type</th>
                <th>Date</th>
                <th>Update Date</th>
                <th>Images</th>
                <th>View More</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.vehicleType}</td>
                  <td>{category.date}</td>
                  <td>{category.updateDate}</td>
                  <td>
                    <button className="icon-button">
                      <FaEye />
                    </button>
                  </td>
                  <td>
                    <button className="view-button">View</button>
                  </td>
                  <td>
                    <button
                      className="icon-button delete"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </Root>
  );
};

const Root = styled.section`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  .header {
    text-align: left;
    margin-bottom: 20px;

    button {
      padding: 10px 20px;
      font-size: 14px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .category-table {
    margin-bottom: 20px;

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th,
      td {
        padding: 10px;
        border: 1px solid #ddd;
      }

      th {
        background-color: #f1f1f1;
        color: #007bff;
      }

      .icon-button {
        background-color: #00c853;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;

        &.delete {
          background-color: #dc3545;
        }
      }

      .view-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 5px 15px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .field {
    margin-bottom: 15px;
  }

  input,
  textarea {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  textarea {
    height: 80px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
