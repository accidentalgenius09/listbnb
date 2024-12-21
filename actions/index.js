import {
  AD_API,
  GET_PROFILE,
  REGISTER_USER,
  USER_LOGIN,
} from "../config/api-urls";
import { RestAPI } from "../lib/RestApiWrapper";

export const registerUser = (strObj) => {
  return RestAPI(REGISTER_USER, {
    method: "POST",
    body: JSON.stringify(strObj),
  });
};
export const userLogin = (strObj) => {
  return RestAPI(USER_LOGIN, {
    method: "POST",
    body: JSON.stringify(strObj),
  });
};
export const getUserProfile = (accessToken) => {
  return RestAPI(GET_PROFILE, {
    method: "GET",
    authToken: accessToken,
  });
};
export const updateUserProfile = (accessToken, strObj) => {
  return RestAPI(GET_PROFILE, {
    method: "PUT",
    authToken: accessToken,
    body: JSON.stringify(strObj),
  });
};
export const postAd = (accessToken, strObj) => {
  return RestAPI(AD_API, {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify(strObj),
  });
};
export const getAd = (accessToken) => {
  return RestAPI(AD_API, {
    method: "GET",
    authToken: accessToken,
  });
};
export const deleteAd = (accessToken, id) => {
  const url = `/api/advertisements/${id}`;

  // Call the RestAPI function with method set to DELETE

  return RestAPI(url, {
    method: "DELETE",
    authToken: accessToken,
  });
};
