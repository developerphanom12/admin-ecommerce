import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

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

export default function TextEditor (){
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    console.log('Current value:', content); // Log the current value to the console
    setValue(content);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], 
      [{ 'size': [] }],               
    ],
  };

  const formats = [
    'bold', 'italic', 'underline', 'size'
  ];

  return (
    <EditorWrapper>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Start typing..."
      />
    </EditorWrapper>
  );
};
