import React from "react";
import styles from "./employees.module.scss";

export default function Employees(props) {
  return (
    <div className={styles.employeeCont}>
      <div>
        <h1>Name: </h1>
        <h3>{props.name}</h3>
      </div>
      <div>
        <h1>Requested: </h1>
        <h3>{props.amountRequested}</h3>
      </div>
      <div>
        <h1>Recieved: </h1>
        <h3>{props.amountRecieved}</h3>
      </div>
    </div>
  );
}
