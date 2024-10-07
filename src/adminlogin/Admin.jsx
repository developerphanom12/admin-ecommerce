import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./admin.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EXCHNAGE_URL } from "../url/Url";
import axios from "axios";
import { userCheckAction, userDataAction } from "../redux/users/action";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCarCrash } from "react-icons/fa";


const schema = yup.object().shape({
  username: yup.string().required("Username is required."),
});

function Admin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    try {
      const apiData = {
        name: data.username,  
      };

      const res = await axios.post(`${EXCHNAGE_URL}/admin_login`, apiData);
      if (res?.status === 200) {
        localStorage.setItem("token", res?.data?.data?.token);
        dispatch(userDataAction(res?.data?.data));
        dispatch(userCheckAction(true));
        toast.success("Login Successfully");
        navigate("/dashboard-overview");
      }
    } catch (err) {
      toast.error("Invalid Admin");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
      </>
      <MDBContainer className=" gradient-form">
        <MDBRow>
          <MDBCol col="6" className="mb-2">
            <div className="d-flex flex-column marg_div">
              <div className="text-center">
                
                <FaCarCrash  className="img_div"/>
                <h4 className="mt-1 mb-5 pb-1">We are The Best Team</h4>
              </div>

              <p>Please login to your account</p>

              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="username"
                type="text"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}

              <div className="text-center pt-1 mb-5 pb-1">
                <div className="sign_div">
                <MDBBtn type="submit" className="mb-4  gradient-custom-2 sign_button">
                  Sign in
                </MDBBtn>
                </div>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Admin;
