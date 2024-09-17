import React, { useEffect } from "react";
import styled from "styled-components";
import "./loader.css";
const Loader = () => {
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    // Clean up to re-enable scroll when loader is removed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <LoaderContainer>
      <div class="loader"></div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  backdrop-filter: blur(1px);
  z-index: 1111;
  top: 0;
  bottom: 0;
  left: 0;
`;

export default Loader;
