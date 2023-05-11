import { useCall, useContractFunction } from '@usedapp/core';
import { BigNumber, Contract, constants, utils } from 'ethers';
import React, { useState } from 'react';
import CzusdNotesAbi from "../../abi/CzusdNotes.json";
import ConnectOrLearn from '../../components/ConnectOrLearn';
import InputTokenEther from '../../components/InputTokenEther';
import QuickInputEther from '../../components/QuickInputEther';
import { ADDRESS_CZUSD, ADDRESS_CZUSDNOTES, ADDRESS_ZERO } from '../../constants/addresses';
import { tokenAmtToShortString } from '../../utils/bnDisplay';
import { czCashBuyLink } from '../../utils/dexBuyLink';


const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageCzusdNotes({
    account, library, currentEpoch, czusdBal
}) {
    const [isDebugOpen, setIsDebugOpen] = useState(false);

    const [inputEtherCzusd, setInputEtherCzusd] = useState(0);
    const [inputLockDurationDays, setInputLockDurationDays] = useState(1);

    const { state: claimPending, send: sendClaimPending } = useContractFunction(
        new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi, library),
        'claimPending');

    const { state: mintNote, send: sendMintNote } = useContractFunction(
        new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi, library),
        'mintNote');

    const { value: getAccount, error: getAccountError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'getAccount',
        args: [account ?? ADDRESS_ZERO]
    }) ?? {}

    const { value: getYieldAtPeriod, error: getYieldAtPeriodError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'getYieldAtPeriod',
        args: [inputLockDurationDays ?? 1]
    }) ?? {}

    const { value: maxLock, error: maxLockError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'maxLock',
        args: []
    }) ?? {}

    const { value: minLock, error: minLockError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'minLock',
        args: []
    }) ?? {}

    const { value: maxNoteSize, error: maxNoteSizeError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'maxNoteSize',
        args: []
    }) ?? {}

    const { value: minNoteSize, error: minNoteSizeError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'minNoteSize',
        args: []
    }) ?? {}

    const { value: outstandingPrinciple, error: outstandingPrincipleError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'outstandingPrinciple',
        args: []
    }) ?? {}

    const { value: maxOutstandingPrinciple, error: maxOutstandingPrincipleError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'maxOutstandingPrinciple',
        args: []
    }) ?? {}

    const { value: overnightRateBasis, error: overnightRateBasisError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'overnightRateBasis',
        args: []
    }) ?? {}

    const { value: maximumRateBasis, error: maximumRateBasisError } = useCall({
        contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
        method: 'maximumRateBasis',
        args: []
    }) ?? {}

    return (<>
        {!account && (<>
            <ConnectOrLearn />
        </>)}
        {!!account && (<>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {!czusdBal || czusdBal?.lte(minNoteSize?.[0] ?? 0) ? (
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <div className='mb-5'>
                            <h3 className="is-size-4">Mint CzusdNote</h3>
                            <p className='mb-2'>To Mint CzusdNotes, you need at least {tokenAmtToShortString(minNoteSize?.[0] ?? 0, 18, 2)} CZUSD.<br />
                                <a className='button is-medium is-rounded is-outlined is-primary m-3' href={czCashBuyLink(ADDRESS_CZUSD)} target="_blank" >Buy CZUSD</a>
                            </p>
                        </div>
                    </div>
                ) : (<>
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <h3 className="is-size-4">Mint CzusdNote NFT</h3>
                        <br />
                        <p>Amount:</p>
                        <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                            style={{ maxWidth: "10em", width: "100%" }}
                            step="1"
                            precision={1}
                            label="CZUSD"
                            minWadBn={BigNumber.from(0)} maxWadBn={czusdBal}
                            setInputEther={setInputEtherCzusd}
                            inputEther={inputEtherCzusd}
                        />
                        <QuickInputEther setInputEther={setInputEtherCzusd} maxTokenWad={czusdBal} />
                        <br />
                        <p>Lock Duration:</p>
                        <div className="level is-mobile m-0 p-0">
                            <input type="number" className='input level-item is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2' step={1}
                                style={{ maxWidth: "10em", width: "100%" }}
                                value={inputLockDurationDays}
                                onChange={(event) => {
                                    let inputNum = Number(event.target.value);
                                    if (!Number.isFinite(inputNum)) return;
                                    let minNum = 1;
                                    if (inputNum < minNum) inputNum = minNum;
                                    let maxNum = 3652;
                                    if (inputNum > maxNum) inputNum = maxNum;
                                    setInputLockDurationDays(inputNum);
                                }} />
                            <span className="level-item ml-2 " style={{ justifyContent: "start" }}>Days</span>
                        </div>
                        <div className="field has-addons" >
                            <p className="control">
                                <button className="button is-dark has-background-special"
                                    onClick={() => {
                                        setInputLockDurationDays(30);
                                    }}
                                >
                                    <span>30d</span>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-dark has-background-special"
                                    onClick={() => {
                                        setInputLockDurationDays(365);
                                    }}>
                                    <span>1y</span>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-dark has-background-special"
                                    onClick={() => {
                                        setInputLockDurationDays(730);
                                    }}>
                                    <span>2y</span>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-dark has-background-special"
                                    onClick={() => {
                                        setInputLockDurationDays(3652);
                                    }}>
                                    <span>10y</span>
                                </button>
                            </p>
                        </div>
                        <button onClick={() => sendMintNote(account, parseEther(inputEtherCzusd.toString()), inputLockDurationDays)} className='button has-background-grey-lighter is-fullwidth'>Mint Note</button>
                        <p>
                            This CzusdNote size <b>{inputEtherCzusd} CZUSD</b> will have a duration of <b>{inputLockDurationDays} days</b>
                            ({(inputLockDurationDays / (365.25)).toPrecision(4)} years) with a yield of{' '}
                            <b>{(getYieldAtPeriod?.[0]?.toNumber() / 111.1111).toPrecision(4)}% APR</b>{' '}
                            ({(getYieldAtPeriod?.[0]?.toNumber() * inputLockDurationDays / 40555).toPrecision(4)}% ROI).{' '}
                            You will earn total interest of <b>{tokenAmtToShortString(getYieldAtPeriod?.[0]?.mul(inputLockDurationDays).mul(parseEther(inputEtherCzusd?.toString() ?? "0")).div("4055555"), 18, 4)} CZUSD</b>.{' '}
                        </p>

                    </div>
                </>)
                }
                <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                    <div className='mb-5'>
                        <h3 className="is-size-4">Claim Pending</h3>
                        <ul>
                            <li>Accumulated Interest To Claim: {tokenAmtToShortString(getAccount?.accYield_, 18, 3)}</li>
                            <li>Expired Principle To Claim: {tokenAmtToShortString(getAccount?.accPrinciple_, 18, 3)}</li>
                            <li>Account Total Notes: {getAccount?.totalNotes_?.toNumber()}</li>
                        </ul>
                        <button onClick={() => sendClaimPending(account, 0)} className='button has-background-grey-lighter is-fullwidth'>Claim Pending</button><br />
                        <p>Whenever you claim interest, you earn cashback on <a href="https://rewards.cz.cash">rewards.cz.cash</a>. You also earn when your referral claims cashback. If you havent yet registered, ask your friends for an invite and your cashback will be waiting for you. You can also upgrade your tier to increase your cashback rate.</p>
                    </div>
                </div>
            </div>
        </>)}
        <br />
        <p css={{ cursor: "pointer" }} onClick={() => setIsDebugOpen(!isDebugOpen)} >{!isDebugOpen ? "▲" : "▼"} Debug Info Panel</p>
        <code className={isDebugOpen ? "" : "is-hidden"}>
            <br />
            inputEtherCzusd: {inputEtherCzusd} CZUSD <br />
            period: {inputLockDurationDays} Days <br />
            getYieldAtPeriod: {getYieldAtPeriod?.[0]?.toNumber() / 100} % APR <br />
            cashbackInterestFee: 10% <br />
            minLock: {minLock?.[0]?.toNumber() ?? 0} Days <br />
            maxLock: {maxLock?.[0]?.toNumber() ?? 0} Days <br />
            minNoteSize: {tokenAmtToShortString(minNoteSize?.[0], 18, 3)} CZUSD<br />
            maxNoteSize: {tokenAmtToShortString(maxNoteSize?.[0], 18, 3)} CZUSD<br />
            outstandingPrinciple: {tokenAmtToShortString(outstandingPrinciple?.[0], 18, 3)} CZUSD<br />
            maxOutstandingPrinciple: {tokenAmtToShortString(maxOutstandingPrinciple?.[0], 18, 3)} CZUSD<br />
            overnightRateBasis: {overnightRateBasis?.[0]?.toNumber() / 100} % APR <br />
            maximumRateBasis: {maximumRateBasis?.[0]?.toNumber() / 100} % APR <br />
            getAccount.lastUpdateEpoch_: {getAccount?.lastUpdateEpoch_?.toNumber()} <br />
            getAccount.currYieldPerSecond_: {tokenAmtToShortString(getAccount?.currYieldPerSecond_, 18, 3)} <br />
            getAccount.totalYield_: {tokenAmtToShortString(getAccount?.totalYield_, 18, 3)} <br />
            getAccount.totalPrinciple_: {tokenAmtToShortString(getAccount?.totalPrinciple_, 18, 3)} <br />
            getAccount.accYield_: {tokenAmtToShortString(getAccount?.accYield_, 18, 3)} <br />
            getAccount.accPrinciple_: {tokenAmtToShortString(getAccount?.accPrinciple_, 18, 3)} <br />
            getAccount.totalNotes_: {getAccount?.totalNotes_?.toNumber()}
        </code>



    </>)
}