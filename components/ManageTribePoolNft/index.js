import React, { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import fetchRetry from '../../utils/fetchRetry';
import ConnectOrLearn from '../ConnectOrLearn';
import CollapsibleCard from '../CollapsibleCard';
import { getIpfsJson, getIpfsUrl } from '../../utils/getIpfsJson';
import tribePoolNftAbi from "../../abi/TribePoolNft.json";
import IERC721EnumerableAbi from "../../abi/IERC721Enumerable.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal, tokenAmtToShortString, weiTolpCzusdPricedWeiVal } from '../../utils/bnDisplay';
import { useCall, useContractFunction } from '@usedapp/core';
import { ADDRESS_CZR, ADDRESS_CZODIACNFT, ADDRESS_TRIBEPOOLNFT } from "../../constants/addresses";
import { PRICING_LP } from "../../constants/pricingLp";


const { formatEther, parseEther, Interface } = utils;

const CzodiacNftContract = new Contract(ADDRESS_CZODIACNFT, IERC721EnumerableAbi);
const TribePoolNftContract = new Contract(ADDRESS_TRIBEPOOLNFT, tribePoolNftAbi);


export default function ManageTribePoolNft({ czrPrice }) {

    const { account, library, chainId } = useEthers();

    const [nftBalIds, setNftBalIds] = useState([]);
    const [selectedNftBalIds, setSelectedNftBalIds] = useState({});
    const [nftStakedIds, setNftStakedIds] = useState([]);
    const [selectedNftStakedIds, setSelectedNftStakedIds] = useState({});

    const { value: isApprovedForAllResult, error: isApprovedForAllError } = useCall(ADDRESS_CZODIACNFT && {
        contract: CzodiacNftContract,
        method: 'isApprovedForAll',
        args: [account, ADDRESS_TRIBEPOOLNFT]
    }) ?? {}

    const { value: nftBalResult, error: nftBalError } = useCall(ADDRESS_CZODIACNFT && {
        contract: CzodiacNftContract,
        method: 'balanceOf',
        args: [account]
    }) ?? {}

    const { value: rewardPerSecondResult, error: rewardPerSecondError } = useCall(ADDRESS_TRIBEPOOLNFT && {
        contract: TribePoolNftContract,
        method: 'rewardPerSecond',
        args: []
    }) ?? {}

    const { value: totalStakedResult, error: totalStakedError } = useCall(ADDRESS_TRIBEPOOLNFT && {
        contract: TribePoolNftContract,
        method: 'totalStaked',
        args: []
    }) ?? {}

    const { value: stakedBalResult, error: stakedBalError } = useCall(ADDRESS_TRIBEPOOLNFT && {
        contract: TribePoolNftContract,
        method: 'stakedBal',
        args: [account]
    }) ?? {}

    const { value: pendingRewardResult, error: pendingRewardError } = useCall(ADDRESS_TRIBEPOOLNFT && {
        contract: TribePoolNftContract,
        method: 'pendingReward',
        args: [account]
    }) ?? {}

    const { state: stateSetApprovalForAll, send: sendSetApprovalForAll } = useContractFunction(
        CzodiacNftContract,
        'setApprovalForAll');

    const { state: stateDeposit, send: sendDeposit } = useContractFunction(
        TribePoolNftContract,
        'deposit');

    const { state: stateWithdraw, send: sendWithdraw } = useContractFunction(
        TribePoolNftContract,
        'withdraw');

    const { state: stateClaim, send: sendClaim } = useContractFunction(
        TribePoolNftContract,
        'claim');

    useEffect(() => {
        if (!library || !stakedBalResult?.[0]?.toString() || !totalStakedResult?.[0]?.toString() || !account || !nftBalResult?.[0]?.toString()) {
            return;
        }
        (async () => {
            let newNftBalIds = []
            const CzodiacNftContractConnected = CzodiacNftContract.connect(library);
            for (let i = 0; i < nftBalResult[0].toNumber(); i++) {
                const nftId = await CzodiacNftContractConnected.tokenOfOwnerByIndex(account, i);
                newNftBalIds = [...new Set([...newNftBalIds, nftId])];
                setNftBalIds([...newNftBalIds]);
            }
        })();
        (async () => {
            const TribePoolNftContractConnected = TribePoolNftContract.connect(library);
            let newNftStakedIds = [];
            for (let i = 0; i < stakedBalResult[0].toNumber(); i++) {
                console.log(account)
                const nftId = await TribePoolNftContractConnected.getDepositedIdForAccountAtIndex(account, i);
                newNftStakedIds = [...new Set([...newNftStakedIds, nftId])];
                setNftStakedIds([...newNftStakedIds]);
            }

        })();

    }, [stakedBalResult?.[0]?.toString(), totalStakedResult?.[0]?.toString(), nftBalResult?.[0]?.toString(), account])

    return (<>
        {!account && (<>
            <ConnectOrLearn />
        </>)}
        {!!account && (<>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {!isApprovedForAllResult?.[0] ? (
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <div className='mb-5'>
                            <h3 className="is-size-4">CZodiacNft Tribe Pool</h3>
                            <p className='mb-2'>To stake your CZodiacNft (OG Rabz, Tigz, Oxz NFTs from <a href="https://rabbitcatch.com" target="_blank">RabbitCatch.com</a>) you must approve <code>{ADDRESS_TRIBEPOOLNFT}</code> to stake your NFTs. You can use the button below.</p>
                            <button onClick={() => sendSetApprovalForAll(ADDRESS_TRIBEPOOLNFT, true)} className='button has-background-grey-lighter is-fullwidth'>Approve</button>
                        </div>
                    </div>
                ) : (<>
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <h3 className="is-size-4">Stake NFTs</h3>
                        <p>Stake your CZodiacNft (OG Rabz, Tigz, Oxz NFTs from <a href="https://rabbitcatch.com">RabbitCatch.com</a>) and earn CZR every second. No limits or fees.</p>
                        {!!nftBalIds && !!selectedNftBalIds && (<>
                            {nftBalIds.map((val) => {
                                return (
                                    <div key={"nftBalIds" + val?.toString()} className="m-1" style={{ display: "inline-block", border: "solid 1px #ababab", color: "#ababab" }}>
                                        <label class="checkbox">
                                            <input type="checkbox" checked={selectedNftBalIds?.[val?.toNumber() ?? false]} onChange={() => {
                                                let newSelectedNftBalIds = { ...selectedNftBalIds };
                                                newSelectedNftBalIds[val?.toString()] = !newSelectedNftBalIds[val?.toString()];
                                                setSelectedNftBalIds(newSelectedNftBalIds);
                                            }} />
                                            ID: {val?.toString()}
                                        </label>
                                    </div>)
                            })}
                        </>)}
                        <button onClick={() => sendDeposit(Object.keys(selectedNftBalIds ?? {}).filter((k, i) => selectedNftBalIds[k]) ?? [])} className='button has-background-grey-lighter is-fullwidth'>Stake Selected ({Object.keys(selectedNftBalIds ?? {}).filter((k, i) => selectedNftBalIds[k])?.length ?? 0})</button>
                    </div>
                </>)
                }
                <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                    <h3 className="is-size-4">Unstake NFTs</h3>
                    <p>Unstake your NFTs. Will claim any pending rewards before unstaking.</p>
                    {!!nftStakedIds && !!selectedNftStakedIds && (<>
                        {nftStakedIds.map((val) => {
                            return (
                                <div key={"nftStakedIds" + val?.toString()} className="m-1" style={{ display: "inline-block", border: "solid 1px #ababab", color: "#ababab" }}>
                                    <label class="checkbox">
                                        <input type="checkbox" checked={selectedNftStakedIds?.[val?.toNumber() ?? false]} onChange={() => {
                                            let newSelectedNftStakedIds = { ...selectedNftStakedIds };
                                            newSelectedNftStakedIds[val?.toString()] = !newSelectedNftStakedIds[val?.toString()];
                                            setSelectedNftStakedIds(newSelectedNftStakedIds);
                                        }} />
                                        ID: {val?.toString()}
                                    </label>
                                </div>)
                        })}
                    </>)}
                    <button onClick={() => sendWithdraw(Object.keys(selectedNftStakedIds ?? {}).filter((k, i) => selectedNftStakedIds[k]) ?? [])} className='button has-background-grey-lighter is-fullwidth'>Unstake Selected ({Object.keys(selectedNftStakedIds ?? {}).filter((k, i) => selectedNftStakedIds[k])?.length ?? 0})</button>
                </div>
                <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                    <h3 className="is-size-4">Claim</h3>
                    <p>Claim your CZR Rewards. This will transfer all your pending CZR from this pool only to your wallet.</p>
                    <button onClick={() => sendClaim()} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
                    <p>You will get {weiToShortString(pendingRewardResult?.[0] ?? 0, 3)} CZR.</p>
                </div>
            </div>
        </>)}

    </>)
}