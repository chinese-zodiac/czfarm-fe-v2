
import React, {useEffect, useState} from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import CZFLogo from "../../public/static/assets/logo192.png"
import { utils, Contract, BigNumber } from 'ethers'
const { formatEther, parseEther, Interface } = utils;

export default function ManageChronoPool({account,pool,czfBal}) {
  const [inputEther,setInputEther] = useState(0);
  return(<>
  <CollapsibleCard className="mb-3" key={pool.pid} 
    title={(<div className='has-text-white pb-2 pt-2 level is-mobile'>
      <div className="column is-narrow is-mobile level-item level m-0 p-0 pt-1 mr-2">
        <figure className="image is-32x32 is-inline-block m-0 p-0 level-item">
            <img src={CZFLogo} />
        </figure>
        <span className='icon m-0 p-0 level-item' style={{width:"0.6em"}}><i className="fa-solid fa-angle-right level-item"></i></span>
        <figure className="image is-32x32 is-inline-block m-0 p-0 level-item">
            <img src={CZFLogo} />
        </figure>
      </div>
      <div className='column has-text-weight-light level-item m-0 p-0' style={{lineHeight:"1.2em",whiteSpace:"nowrap",width:"8.5em"}}>
        <span className='is-size-7 has-text-grey'>DURATION</span><br/>
        <span className='is-size-5'>{pool.title}</span>
      </div>
      <div className='column has-text-weight-light level-item m-0 p-0' style={{lineHeight:"1.2em"}}>
        <span className='is-size-7 has-text-grey'>APR</span><br/>
        <span className='is-size-5'>0.00%</span>
      </div>
    </div>)}>
    {!account ? (<>
      <ConnectOrLearn />
    </>) : (<>
      <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block m-2"
        style={{maxWidth:"10em",width:"100%"}}
        step="1000000"
        precision={1}
        label="CZF"
        minWadBn={BigNumber.from(0)} maxWadBn={czfBal}
        {...{setInputEther,inputEther}}
      />
      <div class="field has-addons ml-2">
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
              if(!czfBal || czfBal.lt(parseEther("1"))){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(czfBal.div(4)))));
            }}
          >
            <span>25%</span>
          </button>
        </p>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              if(!czfBal || czfBal.lt(parseEther("1"))){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(czfBal.div(2)))));
            }}
          >
            <span>50%</span>
          </button>
        </p>
        <p class="control">
          <button class="button is-dark has-background-special"
            onClick={()=>{
              if(!czfBal || czfBal.lt(parseEther("1"))){
                setInputEther(0);
                return;
              }
              setInputEther(Math.floor(Number(formatEther(czfBal))));
            }}
          >
            <span>100%</span>
          </button>
        </p>
      </div>
    </>)}
  </CollapsibleCard>
      
  </>);
}