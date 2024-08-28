import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import styled from "styled-components";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


export const FrequentlyAskedQuestion = () => {
  return (
    <Root>
   
      <div className="container mt-3">    
        <div className="row">
          <div className="col-lg-2 col-md-12 col-12"></div>
          <div
            className="col-lg-8 col-md-12 col-12 text_div"
            data-aos="fade-up"
          >
            <span>Frequently </span>
            <span className="text">Asked </span> <span>Questions</span>
          </div>
          <div className="col-lg-2 col-md-12 col-12"></div>
        </div>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              2.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>    
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              3.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              {" "}
              4.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              5.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>
              6. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Root>
  );
};

const Root = styled.section`
  background-color: #ffffffd4;


  .css-1edfpdg-MuiTypography-root {
    margin: 0;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.5px;
}
  .MuiAccordionSummary-content.MuiAccordionSummary-contentGutters.css-eqpfi5-MuiAccordionSummary-content
    p {
    font-size: 14px;
    font-weight:400;  }

  .MuiAccordionDetails-root.css-15v22id-MuiAccordionDetails-root p {
    font-size: 15px;
    text-align: left;
  }

  .css-eqpfi5-MuiAccordionSummary-content.Mui-expanded {
    margin: 10px 0 0px 0;
  }

  .css-15v22id-MuiAccordionDetails-root {
    padding: 0px 10px 10px;
  }

  .MuiAccordionSummary-expandIconWrapper.css-yw020d-MuiAccordionSummary-expandIconWrapper {
    color: #2ca5d6;
  }

  .text_div {
    margin-bottom: 0.7em;
    padding: 30px;
    text-align: center;
    .text {
      background:linear-gradient(100deg, #2CA5D6, #32CD32);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: black;
      font-weight: bold;
      font-size: 25px;
      line-height: 1.3em;
    }
    span {
      font-weight: bold;
      font-size: 25px;
      line-height: 1.3em;
    }
  }

  @media (max-width: 567px) {
    padding: 0;
    .text_div {
      padding: 0;
    }
  }

  @media (min-width: 567px) and (max-width: 992px) {
    padding: 0;
    .text_div {
      padding: 0;
    }
  }
`;

