import React, { useState, useRef } from 'react';
import Measure from 'react-measure';
import { useUserMedia } from '../hooks_fr/use-user-media';
import { useOffsets } from '../hooks_fr/use-offsets';
import '../components/style.scss';
import '../components/style1.css';
import { Canvas, Wrapper, Container, Flash, Overlay1, Video1 } from './styles';

const CAPTURE_OPTIONS1 = {
    audio: false,
    video: {
        width: window.innerHeight,
        height: window.innerWidth,
        facingMode: 'user',
    },
};

export function Camera({ onCapture, onClear, changekaru }) {
    const canvasRef = useRef();
    const videoRef = useRef();
    const [container, setContainer] = useState({ width: 0, height: 0 });
    const [isFrVideoPlaying, setIsFrVideoPlaying] = useState(false);
    const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);
    const mediaStream = useUserMedia(CAPTURE_OPTIONS1);
    // const [aspectRatio, calculateRatio] = useCardRatio(1.586);
    const offsets = useOffsets(
        videoRef.current && videoRef.current.videoWidth,
        videoRef.current && videoRef.current.videoHeight,
        container.width,
        container.height
    );
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    function handleChange_close() {
        changekaru();
    }

    function handleResize(contentRect) {
        setContainer({
            width: CAPTURE_OPTIONS1.video.height,
            height: CAPTURE_OPTIONS1.video.width,
        });
    }

    function handleCanPlay() {
        setIsFrVideoPlaying(true);
        videoRef.current.play();
    }

    function handleCapture() {
        const context = canvasRef.current.getContext('2d');
        context.translate(container.width, 0);
        context.scale(-1, 1);
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
        var dataURL = canvasRef.current.toDataURL('image/jpeg');
        var imgData = dataURL.replace(/^data:image\/(png|jpeg);base64,/, '');
        localStorage.setItem('imgData', imgData);
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
                        <Video1
                            ref={videoRef}
                            hidden={!isFrVideoPlaying}
                            onCanPlay={handleCanPlay}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                top: `-${offsets.y}px`,
                                left: `-${offsets.x}px`,
                            }}
                        />
                        <Overlay1 hidden={!isFrVideoPlaying} />
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

                    {isFrVideoPlaying && (
                        <div className="frcamera_bts">
                            <button
                                className="button_selfie"
                                onClick={
                                    isCanvasEmpty ? handleCapture : handleClear
                                }
                            >
                                {isCanvasEmpty ? 'Click Selfie' : 'ReTake'}
                            </button>

                            <button
                                className="button_selfie"
                                onClick={handleChange_close}
                            >
                                {isCanvasEmpty ? 'Close it' : 'Looks Good!'}
                            </button>
                            {/* )} */}
                        </div>
                    )}
                </Wrapper>
            )}
        </Measure>
    );
}
