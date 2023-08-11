import React from "react";
import styles from "./styles.module.css";

const AgendaItem = ({ agenda }) => {
  return (
    <div className="row">
      <div className="col-12">
        <ul className={`ul ${styles.ul}`}>
          {agenda?.map((item) => {
            return (
              <li key={item._id}>
                <span className="ktn-text-primary fw-bold">&#x2713;</span> {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AgendaItem;
