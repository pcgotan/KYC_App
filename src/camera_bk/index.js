import React, { useState, useRef } from 'react';
import Measure from 'react-measure';
import { useUserMedia } from '../hooks_bk/use-user-media';
import { useOffsets } from '../hooks_bk/use-offsets';
import '../components/style.scss';
import '../components/style1.css';
import { Video, Canvas, Wrapper, Container, Flash, Overlay } from './styles';

const CAPTURE_OPTIONS1 = {
    audio: false,
    video: {
        width: window.innerHeight,
        height: window.innerWidth,
        facingMode: 'environment',
    },
};

export function Camera({ onCapture, onClear, changekaru }) {
    const canvasRef = useRef();
    const videoRef = useRef();
    const [container, setContainer] = useState({ width: 0, height: 0 });
    const [isBkVideoPlaying, setIsBkVideoPlaying] = useState(false);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS1);
    const offsets = useOffsets(
        videoRef.current && videoRef.current.videoWidth,
        videoRef.current && videoRef.current.videoHeight,
        container.width,
        container.height
    );
    const [idcnt, setIdcnt] = useState(true);
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    function handleChange_close() {
        changekaru();
    }

    function handleChange_toback() {
        setIdcnt(!idcnt);
    }

    function handleResize(contentRect) {
        setContainer({
            width: CAPTURE_OPTIONS1.video.height,
            height: CAPTURE_OPTIONS1.video.width,
        });
    }

    function handleCanPlay() {
        setIsBkVideoPlaying(true);
        videoRef.current.play();
    }

    function handleCapture() {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(
            videoRef.current,
            offsets.x,
            offsets.y,
            container.width,
            container.height,
            0,
            0,
            container.width,
            container.height
        );

        if (idcnt === true) {
            var dataURL = canvasRef.current.toDataURL('image/jpeg');
            var imgId1 = dataURL.replace(/^data:image\/(png|jpeg);base64,/, '');
            localStorage.setItem('imgId1', imgId1);
        } else if (idcnt === false) {
            var dataURL = canvasRef.current.toDataURL('image/jpeg');
            var imgId2 = dataURL.replace(/^data:image\/(png|jpeg);base64,/, '');
            localStorage.setItem('imgId2', imgId2);
        }
        canvasRef.current.toBlob((blob) => onCapture(blob), 'image/jpeg', 1);
        setIsCanvasEmpty(false);
        setIsFlashing(true);
    }

    function handleClear() {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        setIsCanvasEmpty(true);
        onClear();
    }

    if (!mediaStream) {
        return null;
    }
    return (
        <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
                <Wrapper>
                    <Container
                        ref={measureRef}
                        maxHeight={
                            videoRef.current && videoRef.current.videoHeight
                        }
                        maxWidth={
                            videoRef.current && videoRef.current.videoWidth
                        }
                        style={{
                            height: `${container.height}px`,
                        }}
                    >
                        <Video
                            ref={videoRef}
                            hidden={!isBkVideoPlaying}
                            onCanPlay={handleCanPlay}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                top: `-${offsets.y}px`,
                                left: `-${offsets.x}px`,
                            }}
                        />

                        <Overlay hidden={!isBkVideoPlaying} />

                        <Canvas
                            ref={canvasRef}
                            width={container.width}
                            height={container.height}
                        />
                        <Flash
                            flash={isFlashing}
                            onAnimationEnd={() => setIsFlashing(false)}
                        />
                    </Container>

                    {isBkVideoPlaying && (
                        <div className="frcamera_bts">
                            <button
                                className="button_ids"
                                onClick={
                                    isCanvasEmpty ? handleCapture : handleClear
                                }
                            >
                                {isCanvasEmpty
                                    ? idcnt === true
                                        ? 'Front Side'
                                        : 'Back Side'
                                    : idcnt === true
                                    ? 'Retake Front'
                                    : 'Retake Back'}
                            </button>

                            {idcnt === true && !isCanvasEmpty ? (
                                <button
                                    className="button_ids"
                                    onClick={() => {
                                        handleChange_toback();
                                        handleClear();
                                    }}
                                >
                                    Next Picture!
                                </button>
                            ) : null}

                            {idcnt === false && !isCanvasEmpty ? (
                                <button
                                    className="button_ids"
                                    onClick={() => {
                                        handleChange_close();
                                        handleChange_toback();
                                    }}
                                >
                                    Looks Good!
                                </button>
                            ) : null}
                        </div>
                    )}
                </Wrapper>
            )}
        </Measure>
    );
}
