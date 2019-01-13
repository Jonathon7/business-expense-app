import axios from "axios";

const initialState = {
  employees: []
};

const GET_EMPLOYEES = "GET_EMPLOYEES";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    default:
      return state;
  }
}

export function getEmployees() {
  return {
    type: GET_EMPLOYEES,
    payload: axios("/api/employees")
  };
}
