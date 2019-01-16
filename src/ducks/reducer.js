import axios from "axios";

const initialState = {
  employees: [],
  userInfo: {},
  reports: []
};

const GET_EMPLOYEES = "GET_EMPLOYEES";
const GET_USERINFO = "GET_USERINFO";
const GET_REPORTS = "GET_REPORTS";

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
