
import React from 'react';
import { formatEther } from '@ethersproject/units'

export default function InputTokenEther({setInputEther,inputEther,style,className,maxWadBn,minWadBn,precision,step,label}) {
  return(<>
  <div className="level is-mobile m-0 p-0">
    <input type="number" className={'input level-item'+ className} step={step}
      style={style}
      value={inputEther}
      onChange={(event)=>{
        let inputNum = Number(event.target.value);
        if(!Number.isFinite(inputNum)) return;
        let minNum = !!minWadBn ? Number(formatEther(minWadBn)) : 0;
        if(!!minWadBn && (inputNum < minNum)) inputNum = minNum;
        let maxNum = !!maxWadBn ? Number(formatEther(maxWadBn)) : 100;
        if(!!maxWadBn && (inputNum > maxNum)) inputNum = maxNum;
        console.log({precision})
        if(precision > 1) {
          inputNum = Math.floor(inputNum*precision/precision);
        } else {
          inputNum = Math.floor(inputNum * (1/precision))/(1/precision);
        }
        setInputEther(inputNum);
      }} />
    <span className="level-item ml-2 " style={{justifyContent:"start"}}>{label}</span>
  </div>
      
  </>);
}