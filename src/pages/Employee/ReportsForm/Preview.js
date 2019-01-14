import React from "react";

export default function Preview(props) {
  return (
    <div>
      <h1>{props.expenseType}</h1>
      <h1>{props.amount}</h1>
      <h1>{props.date}</h1>
    </div>
  );
}
