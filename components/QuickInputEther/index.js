
import React from 'react';
import { formatEther } from '@ethersproject/units'

export default function QuickInputEther({setInputEther,style,className,maxTokenWad}) {
  return(<>
  <div class={"field has-addons "+className} style={style}>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              setInputEther(0);
            }}
          >
            <span>0%</span>
          </button>
        </p>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              if(!maxTokenWad){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(maxTokenWad.div(4)))));
            }}
          >
            <span>25%</span>
          </button>
        </p>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              if(!maxTokenWad){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(maxTokenWad.div(2)))));
            }}>
            <span>50%</span>
          </button>
        </p>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              if(!maxTokenWad){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(maxTokenWad))));
            }}>
            <span>100%</span>
          </button>
        </p>
      </div>
      
  </>);
}