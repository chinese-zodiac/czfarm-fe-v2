import React from 'react';

export default function CollapsibleCardTitleItem({className,style,title,children,width}) {
  return (
  <div className={'is-inline-block has-text-weight-light  m-0 p-0 '+className} style={{...style,lineHeight:"1.2em",whiteSpace:"nowrap",width}}>
    <span className='is-size-7 has-text-grey-light'>{title}</span><br/>
    <span className='is-size-6'>{children}</span>
  </div>);
}