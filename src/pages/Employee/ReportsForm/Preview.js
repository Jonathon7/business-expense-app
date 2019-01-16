import React from "react";
import styles from "./preview.module.scss";

export default function Preview(props) {
  return (
    <div className={styles.previewCont}>
      {(props.expenseType || props.amount || props.date) && !props.title ? (
        <h1 className={styles.previewTitle}>New Expense</h1>
      ) : props.title ? (
        <div>
          <h1 className={styles.previewTitle}>{props.title}</h1>
        </div>
      ) : null}
      <div className={styles.preview}>
        <div>
          {props.expenseType ? (
            <h1 className={styles.default}>Expense Type:</h1>
          ) : (
            <div />
          )}
          {props.amount ? (
            <h1 className={styles.default}> Amount: </h1>
          ) : (
            <div />
          )}
          {props.date ? <h1 className={styles.default}> Date:</h1> : <div />}
        </div>
        <div className={styles.values}>
          <h1 className={styles.valueH1}>{props.expenseType}</h1>
          {props.amount ? (
            <h1 className={styles.valueH1}>${props.amount}</h1>
          ) : null}

          <h1 className={styles.valueH1}>{props.date}</h1>
        </div>
      </div>
      {props.comments ? (
        <div className={styles.commentsCont}>
          <h1 className={styles.commentsH1}>Comments</h1>
          <textarea name="" id="" value={props.comments} rows="6" readOnly>
            {props.comments}
          </textarea>
          {props.isPersonal ? (
            <p className={styles.isPersonal}>
              Personal Expense (Do not reimburse me)
            </p>
          ) : null}
        </div>
      ) : null}
      <div className={styles.saveButtonCont}>
        {props.expenseType && props.amount && props.date ? (
          <button className={styles.saveButton} onClick={props.saveForm}>
            Save
          </button>
        ) : null}
      </div>
    </div>
  );
}
