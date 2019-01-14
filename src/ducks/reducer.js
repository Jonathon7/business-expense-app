import axios from "axios";

const initialState = {
  employees: []
};

const GET_EMPLOYEES = "GET_EMPLOYEES";

export default function(state = initialState, action) {
  switch (action.type) {
    case `${GET_EMPLOYEES}_FULFILLED`:
      return {
        ...state,
        employees: action.payload.data
      };
    case `${GET_EMPLOYEES}_REJECTED`:
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
