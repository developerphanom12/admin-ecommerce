import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { MainButton } from "../Global";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Customizing behavior for pressing Enter key
const Block = Quill.import('blots/block');
Block.tagName = 'div'; // Changes <p> tags to <div> tags on enter
Quill.register(Block, true);

export default function AboutUs() {
  const [editorValue, setEditorValue] = useState(""); // State for user input in the first editor
  const [apiContent, setApiContent] = useState([]); // State for displaying API content
  const navigate = useNavigate();

  // Handle content change in the first editor
  const handleEditorChange = (description) => {
    setEditorValue(description);
  };

  const modules = {
    toolbar: [["bold", "italic", "underline"], [{ size:  ["small", false, "large", "huge"] }]],
  };

  const formats = ["bold", "italic", "underline", "size"];

  // Clean up unnecessary <br> and empty <p> tags
  const cleanEditorValue = (value) => {
    let cleanedValue = value;

    // Remove <p><br></p>
    cleanedValue = cleanedValue.replace(/<p><br><\/p>/g, "");

    // Optionally, remove empty <p> tags
    cleanedValue = cleanedValue.replace(/<p><\/p>/g, "");

    return cleanedValue;
  };

  // Handle submitting the updated content to the server
  const handleApproval = async () => {
    try {
      const cleanedDescription = cleanEditorValue(editorValue); // Clean the editor value

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `${EXCHNAGE_URL}/about-us`,
        { description: cleanedDescription },
        axiosConfig
      );

      console.log("Server Response:", response.data);
      if (response?.data?.status === true) {
        const message = response?.data?.message;
        navigate("/");
        toast.success(message);
        setEditorValue(response?.data?.content || "");
        console.log(message, "message");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message); // Detailed error logging
      toast.error(error.response?.data?.message || "Error updating Content");
    }
  };

  // Fetch and display API content
  const getApi = async () => {
    const axiosConfig = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get(`${EXCHNAGE_URL}/aboutget`, axiosConfig);
      if (response?.status === 200 && Array.isArray(response?.data?.data)) {
        const entries = response.data.data;
        setApiContent(entries);
      }
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error fetching content", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <EditorWrapper>
      {/* First ReactQuill editor for user input */}
      <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder="Start typing..."
      />
      <div className="submit_btn p-4">
        <MainButton type="submit" onClick={handleApproval}>
          Submit Now
        </MainButton>
      </div>

      {/* Display all fetched descriptions */}
      <Div>
        {apiContent.map((item, index) => (
          <ul
            style={{ listStyleType: "disc", paddingLeft: "20px" }}
            key={item.id || index}
          >
            <li
              dangerouslySetInnerHTML={{
                __html: item.description || "No Description",
              }}
            />
          </ul>
        ))}
      </Div>
    </EditorWrapper>
  );
}
const Div = styled.div`
  border: 2px solid #2ca5d6;
  border-radius: 10px;
  text-align: left;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  p,strong {
    margin: 0;
  }
`;
const EditorWrapper = styled.div`
  margin: 10px;

  .ql-container {
    height: 200px;
    font-size: 14px;
  }

  .ql-toolbar {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .ql-container {
      font-size: 12px;
    }

    .ql-toolbar {
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
`;
