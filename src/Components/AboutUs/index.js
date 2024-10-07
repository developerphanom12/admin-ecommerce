import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { MainButton } from "../Global";
import axios from "axios";
import { EXCHNAGE_URL } from "../../url/Url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderAction } from "../../redux/users/action";
import Loader from "../Loader";

const Block = Quill.import("blots/block");
Block.tagName = "div";
Quill.register(Block, true);

export default function AboutUs() {
  const [editorValue, setEditorValue] = useState("");
  const [apiContent, setApiContent] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);

  const handleEditorChange = (description) => {
    const cleanedDescription = cleanEditorValue(description);
    if (countWords(cleanedDescription) <= 150) {
      setEditorValue(cleanedDescription);
    } else {
      const trimmedDescription = trimTo150Words(cleanedDescription);
      setEditorValue(trimmedDescription);
    }
  };

  const modules = {
    toolbar: [["bold", "italic", "underline"], [{ size: ["small", false] }]],
  };

  const formats = ["bold", "italic", "underline", "size"];

  const cleanEditorValue = (value) => {
    let cleanedValue = value;
    cleanedValue = cleanedValue.replace(/<p><br><\/p>/g, "");
    cleanedValue = cleanedValue.replace(/<p><\/p>/g, "");
    return cleanedValue;
  };

  const countWords = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
  };

  const trimTo150Words = (text) => {
    const words = text.split(/\s+/).filter(Boolean);
    const trimmedWords = words.slice(0, 150);
    return trimmedWords.join(" ");
  };

  const handleApproval = async () => {
    const cleanedDescription = cleanEditorValue(editorValue);
    if (countWords(cleanedDescription) > 150) {
      toast.error("Description cannot exceed 150 words.");
      return;
    }

    try {
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
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error updating Content");
    }
  };

  const getApi = async () => {
    dispatch(LoaderAction(true));
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
    }finally {
      dispatch(LoaderAction(false));
    }
  };

  useEffect(() => {
    getApi();
  });

  return (
    <>
    {isLoading && <Loader />}
    <EditorWrapper>
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

      {apiContent.map((item, index) => (
        <Div>
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
        </Div>
      ))}
    </EditorWrapper>
    </>
  );
}

const Div = styled.div`
  border: 2px solid #2ca5d6;
  border-radius: 10px;
  text-align: left;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
  margin: 10px 0px;
  p,
  strong {
    margin: 0;
  }
`;

const EditorWrapper = styled.div`
  margin: 10px;

  .ql-size-small {
    font-size: 0.75em;
  }

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
