import { useState, useEffect } from 'react';
export function useUserMedia(requestedMedia) {
    const [mediaStream, setMediaStream] = useState(null);
    useEffect(() => {
        async function enableVideoStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    requestedMedia
                );
                setMediaStream(stream);
            } catch (err) {
                alert("Can't proceed further\nPlease grant Camera permission");
                // eslint-disable-next-line
            }
        }
        if (!mediaStream) {
            enableVideoStream();
        } else {
            return function cleanup() {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            };
        }
    }, [mediaStream, requestedMedia]);
    return mediaStream;
}
