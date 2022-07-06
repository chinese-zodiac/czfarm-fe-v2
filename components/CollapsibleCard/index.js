import React, { Component, useState } from 'react';
import styles from "./index.module.scss";


function CollapsibleCard ({children,title,className}) {

  const [isOpen,setIsOpen] = useState(false);
  return (<>
    <div className={"has-text-white card "+styles.CollapsibleCard+" "+className}>
      <a className="has-text-white card-header pl-3 pr-3" onClick={()=>{setIsOpen(!isOpen)}}>
        <div className="card-header-title pr-0">
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
      </a>
      <div class={"card-content p-2 has-text-white "+(isOpen ? "" : "is-hidden")}>          
        {children}
      </div>
    </div>
  </>)
}

export default CollapsibleCard;