import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import setJWTToken from "../../../SecurityUtils/setJWTToken";
export const login = (LoginRequest) => async (dispatch) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(LoginRequest.username + ":" + LoginRequest.password),
    };

    const res = await axios.get("http://localhost:8080/api/user/login", {
      headers: headers,
    });
    let data = res.data;
    let token = data.token;
    console.log(token);
    //store the token in the local storage
    localStorage.setItem("jwtToken", token);

    let toeknToSetInSession = localStorage.getItem("jwtToken");
    if (toeknToSetInSession != undefined) {
      sessionStorage.setItem("jwtToken", toeknToSetInSession);
      localStorage.clear();
    }

    //set out token in Header**
    setJWTToken(token);

    //dispatch to your loginSecurityReducer

    dispatch({
      type: SET_CURRENT_USER,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("jwtToken");
  // sessionStorage.removeItem("insuranceList");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
