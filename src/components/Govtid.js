import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import Fullscreen from 'react-full-screen';
import idcard from '../id_card.png';
import * as Icon from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { Root, Preview, GlobalStyle } from '../styles';
import './style1.css';
import { Camera } from '../camera_bk';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: 'Gray',
        },
        color: 'Green',
    },
    icon: {
        fill: 'Gray',
    },
}));

export default function Selfie(props) {
    const [isBkCameraOpen, setIsBkCameraOpen] = useState(false);
    const [cardImage, setCardImage] = useState();
    const token = localStorage.getItem('token');
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const classes = useStyles();
    let loggedin = true;
    if (token == null) {
        loggedin = false;
    }
    const idwhich = localStorage.getItem('whichid');
    if (idwhich) {
        console.log(idwhich);
    }

    const id_f = localStorage.getItem('imgId1');
    const id_b = localStorage.getItem('imgId2');
    const [isFull, setIsFull] = useState(false);
    //  const who1 = JSON.parse(localStorage.getItem('data'));
    const [whichId, setWhichId] = useState(idwhich ? idwhich : '');
    function handleChange_close() {
        setIsBkCameraOpen(false);
        setCardImage(undefined);
        setIsFull(false);
    }
    // setWhichId(idwhich);

    useEffect(() => {
        localStorage.setItem('whichid', whichId);
    });
    if (loggedin === false) {
        return <Redirect to="/"></Redirect>;
    } else {
        // console.log(whichId);
        return (
            <Fragment>
                <div style={{ marginTop: -20, marginLeft: 90 }}>
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
                        <PopoverHeader>Id Tips</PopoverHeader>
                        <PopoverBody>
                            1. Place your Id in the given overlay.<br></br> 2.
                            Don't worry about extra space, It would be cropped
                            <br></br>3. Turn off the Auto-Rotate feature of your
                            mobile
                            <br></br> 4. You can always retake it.
                        </PopoverBody>
                    </Popover>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h5
                        style={{
                            textAlign: 'center',
                            color: 'green',
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                    >
                        Upload ID Card
                    </h5>
                    <h6 style={{ color: 'Gray', marginLeft: 90 }}>
                        Please upload a Government ID for KYC verification
                    </h6>
                    <div
                        style={{
                            fontSize: 12,
                            color: 'Gray',
                            textAlign: 'center',
                            marginLeft: 85,
                        }}
                    >
                        Your Name and Photo should be clearly visible
                    </div>
                </div>
                <div
                    className="whichid"
                    style={{ marginLeft: 150, marginTop: 0 }}
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id="demo-simple-select-autowidth-label"
                            style={{ marginLeft: -20, color: 'Gray' }}
                        >
                            Select Id
                        </InputLabel>
                        <Select
                            style={{ marginLeft: -20 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={whichId}
                            onChange={(e) => {
                                setWhichId(e.target.value);
                                localStorage.removeItem('imgId2');
                                localStorage.removeItem('imgId1');
                            }}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="Aadhar">Aadhar Card</MenuItem>
                            <MenuItem value="Driving License">
                                Driving License
                            </MenuItem>
                            <MenuItem value="Voter Id">Voter Id</MenuItem>
                            <MenuItem value="Passport">Passport</MenuItem>
                            <MenuItem value="PAN Card">PAN Card</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="selfie_page">
                    {id_f && id_b ? null : (
                        <div className="id_logo">
                            <img
                                className="idcard"
                                src={idcard}
                                alt="idcard"
                                style={{
                                    marginTop: -35,
                                    marginLeft: 15,
                                }}
                            ></img>
                        </div>
                    )}
                    <div className="">
                        <Root>
                            <Fullscreen
                                enabled={isFull}
                                onChange={(isFull) => setIsFull(isFull)}
                            >
                                {isBkCameraOpen && isFull && (
                                    <Camera
                                        onCapture={(blob) => setCardImage(blob)}
                                        onClear={() => setCardImage(undefined)}
                                        changekaru={handleChange_close}
                                    />
                                )}
                                {cardImage && (
                                    <div>
                                        <h2>Preview</h2>
                                        <Preview
                                            src={
                                                cardImage &&
                                                URL.createObjectURL(cardImage)
                                            }
                                        />
                                    </div>
                                )}
                            </Fullscreen>
                            <div className="camera-btn1">
                                <button
                                    className="button_id"
                                    onClick={() => {
                                        setIsBkCameraOpen(true);
                                        setIsFull(true);
                                    }}
                                    style={{
                                        marginLeft: 35,
                                        fontSize: 16,
                                        width: 120,
                                    }}
                                >
                                    ID Scanner
                                </button>
                                {idwhich && id_f && id_b ? (
                                    <Link
                                        to="/success"
                                        onClick={
                                            idwhich && id_f && id_b
                                                ? null
                                                : (e) => e.preventDefault()
                                        }
                                    >
                                        <button
                                            className="button_id"
                                            style={{
                                                fontSize: 16,
                                                width: 120,
                                            }}
                                            disabled={
                                                idwhich && id_f && id_b
                                                    ? false
                                                    : true
                                            }
                                        >
                                            Next Page
                                        </button>
                                    </Link>
                                ) : null}
                                {/* <button
                                        className="button"
                                        onClick={() => {
                                            setIsBkCameraOpen(false);
                                            setCardImage(undefined);
                                            setIsFull(false);
                                        }}
                                    >
                                        Close Camera
                                    </button> */}
                            </div>
                        </Root>
                        <GlobalStyle />
                    </div>
                    <div className="header">
                        <img
                            className="classid_f"
                            src={`data:image/jpeg;base64,${id_f}`}
                            height="150"
                            width="240"
                            alt="Front"
                        />
                        <br></br>
                        <br></br>

                        <img
                            className="classid_b"
                            src={`data:image/jpeg;base64,${id_b}`}
                            height="150"
                            width="240"
                            alt="Back"
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}
