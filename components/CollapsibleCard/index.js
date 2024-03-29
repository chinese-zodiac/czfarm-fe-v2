import React, { Component, useState } from 'react';
import styles from "./index.module.scss";


function CollapsibleCard({ children, title, className }) {

  const [isOpen, setIsOpen] = useState(false);
  return (<>
    <div className={"has-text-white card " + styles.CollapsibleCard + " " + className}>
      <div className={"has-text-white card-header pl-3 pr-3 " + styles.CollapsibleCard_Header} onClick={() => { setIsOpen(!isOpen) }}>
        <div className="card-header-title p-0 pb-1">
          {title}
        </div>
        <div className='card-header-icon pr-2 pl-1'>
          <span className="icon has-text-primary">
            {isOpen ? (
              <i className="fa-solid fa-angle-up" ></i>
            ) : (
              <i className="fa-solid fa-angle-down" ></i>
            )}
          </span>
        </div>
      </div>
      <div className={"card-content p-2 has-text-white " + (isOpen ? "" : "is-hidden")}>
        {isOpen && (children)}
      </div>
    </div>
  </>)
}

export default CollapsibleCard;