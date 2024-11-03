import React from 'react';
import { formatEther } from '@ethersproject/units';

export default function QuickInputEther({
  setInputEther,
  style,
  className,
  maxTokenWad,
}) {
  return (
    <>
      <div className={'field has-addons ' + className} style={style}>
        <p className="control">
          <button
            className="button is-dark has-background-special"
            onClick={() => {
              setInputEther(0);
            }}
          >
            <span>0%</span>
          </button>
        </p>
        <p className="control">
          <button
            className="button is-dark has-background-special"
            onClick={() => {
              if (!maxTokenWad) {
                setInputEther(0);
                return;
              }
              setInputEther(Number(formatEther(maxTokenWad.div(4))));
            }}
          >
            <span>25%</span>
          </button>
        </p>
        <p className="control">
          <button
            className="button is-dark has-background-special"
            onClick={() => {
              if (!maxTokenWad) {
                setInputEther(0);
                return;
              }
              setInputEther(Number(formatEther(maxTokenWad.div(2))));
            }}
          >
            <span>50%</span>
          </button>
        </p>
        <p className="control">
          <button
            className="button is-dark has-background-special"
            onClick={() => {
              if (!maxTokenWad) {
                setInputEther(0);
                return;
              }
              setInputEther(Number(formatEther(maxTokenWad.sub(1))));
            }}
          >
            <span>100%</span>
          </button>
        </p>
      </div>
    </>
  );
}
