import React from 'react';
import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Fullscreen from 'react-full-screen';
import * as Icon from 'react-feather';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import imgMale from '../male.png';
import imgFemale from '../female.png';
import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_fr';
import './style.scss';
export default function Selfie(props) {
    const [isFrCameraOpen, setIsFrCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const Selfie1 = localStorage.getItem('imgData');
    const [isFull, setIsFull] = useState(false);
    // console.log(isFull);
    // const who = ;
    const who1 = JSON.parse(localStorage.getItem('data'));
    function handleChange_close() {
        setIsFrCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
    }
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        return (
            <div className="selfie_page">
                <div className="popi">
                    <span>
                        <Icon.Info id="Popover1" type="button" />
                        Tips
                    </span>
                    <Popover
                        placement="bottom"
                        isOpen={popoverOpen}
                        target="Popover1"
                        toggle={toggle}
                    >
                        <PopoverHeader>Selfie Tips</PopoverHeader>
                        <PopoverBody>
                            1. Look Straight into the screen.<br></br> 2. Try to
                            keep things looking natural.
                            <br></br> 3.Fit your face in the oval shaped overlay
                            <br></br> 4. Click the selfie and save it or you can
                            retake.
                        </PopoverBody>
                    </Popover>
                </div>
                <div style={{ color: 'green', textAlign: 'center' }}>
                    <h5 style={{ marginLeft: 70 }}> Take a Selfie</h5>
                    <h6 style={{ marginLeft: 70, color: 'Gray' }}>
                        Please upload a selfie for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                        Make sure face is clearly visible without any blur
                    </div>
                </div>
                <Fragment>
                    {Selfie1 ? (
                        <div className="imgMale_div">
                            <img
                                className="selpic_selfiepage"
                                src={`data:image/jpeg;base64,${Selfie1}`}
                                height="250"
                                width="220"
                                alt="selpic_selfiepage"
                                style={{ marginTop: 50, marginLeft: -100 }}
                            />
                        </div>
                    ) : (
                        <div className="imgMale_div">
                            <img
                                className="imgMale"
                                src={
                                    who1 && who1.details.gender === 'Female'
                                        ? imgFemale
                                        : imgMale
                                }
                                alt="imgMale"
                            ></img>
                        </div>
                    )}
                    <Fragment>
                        <div className="">
                            <Root>
                                <Fullscreen
                                    enabled={isFull}
                                    onChange={(isFull) => setIsFull(isFull)}
                                >
                                    {isFrCameraOpen && isFull && (
                                        <Camera
                                            onCapture={(blob) =>
                                                setCardImage(blob)
                                            }
                                            onClear={() =>
                                                setCardImage(undefined)
                                            }
                                            // fullhaikya={isFull}
                                            changekaru={handleChange_close}
                                        />
                                    )}
                                    {cardImage && (
                                        <div>
                                            <h2>Preview</h2>
                                            <Preview
                                                src={
                                                    cardImage &&
                                                    URL.createObjectURL(
                                                        cardImage
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                    {/* <button
                                    className="button"
                                    onClick={() => {
                                        setIsFrCameraOpen(false);
                                        setCardImage(undefined);
                                        setIsFull(false);
                                    }}
                                >
                                    Close Camera
                                </button> */}
                                </Fullscreen>
                                <div className="camera-btn">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setIsFrCameraOpen(true);
                                            setIsFull(true);
                                        }}
                                        style={{ marginLeft: 35 }}
                                    >
                                        Selfie Camera
                                    </button>
                                    <Link
                                        to="/govtid"
                                        onClick={
                                            Selfie1
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <button className="button">
                                            Next Page
                                        </button>
                                    </Link>
                                </div>
                            </Root>
                            <GlobalStyle />
                        </div>
                    </Fragment>
                    <br />
                </Fragment>
            </div>
        );
    }
}
