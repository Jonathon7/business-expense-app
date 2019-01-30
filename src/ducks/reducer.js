import axios from "axios";

const initialState = {
  employees: [],
  userInfo: {}, //session object
  reports: [], //new reports
  approved: [], //approved reports
  denied: [] //denied reports
};

const GET_EMPLOYEES = "GET_EMPLOYEES";
const GET_USERINFO = "GET_USERINFO";
const GET_REPORTS = "GET_REPORTS";
const GET_APPROVED = "GET_APPROVED";
const GET_DENIED = "GET_DENIED";

export default function(state = initialState, action) {
  switch (action.type) {
    case `${GET_EMPLOYEES}_FULFILLED`:
      return {
        ...state,
        employees: action.payload.data
      };
    case `${GET_EMPLOYEES}_REJECTED`:
      return console.log("Error", action.payload);
    case GET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case `${GET_REPORTS}_FULFILLED`:
      return {
        ...state,
        reports: action.payload
      };
    case `${GET_REPORTS}_REJECTED`:
      return console.log("Error", action.payload);
    case `${GET_APPROVED}_FULFILLED`:
      return {
        ...state,
        approved: action.payload
      };
    case `${GET_APPROVED}_REJECTED`:
      return console.log("Error", action.payload);
    case `${GET_DENIED}_FULFILLED`:
      return {
        ...state,
        denied: action.payload
      };
    case `${GET_DENIED}_REJECTED`:
      return console.log("Error: ", action.payload);
    default:
      return state;
  }
}

export function getEmployees() {
  return {
    type: "GET_EMPLOYEES",
    payload: axios.get("/api/employees")
  };
}

export function getUserInfo(userinfo) {
  return {
    type: "GET_USERINFO",
    payload: userinfo
  };
}

export function getReports() {
  return {
    type: "GET_REPORTS",
    payload: axios.get("/api/reports/")
  };
}

export function getApproved() {
  return {
    type: "GET_APPROVED",
    payload: axios.get("/api/approved")
  };
}

export function getDenied() {
  return {
    type: "GET_DENIED",
    payload: axios.get("/api/denied")
  };
}
