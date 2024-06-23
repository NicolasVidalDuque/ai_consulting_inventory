import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import "../styles.css";

// Define type for video constraints
interface VideoConstraints {
  width: number;
  height: number;
  facingMode: { exact: string } | string;
  aspectRatio: number;
}

export const CustomWebcam: React.FC = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    width: 320,
    height: 240,
    facingMode: { exact: "environment" },
    aspectRatio: 4/3
  });
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  // Capture screenshot
  const capture = useCallback((): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  // Check for available cameras and set constraints
  useEffect(() => {
    const getCameras = async (): Promise<void> => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === "videoinput");
      const hasRearCamera = videoDevices.some(device => device.label.toLowerCase().includes("back"));
      setVideoConstraints({
        width: 360,
        height: 360,
        aspectRatio: 0.5,
        facingMode: hasRearCamera ? { exact: "environment" } : "user",
      });
    };

    getCameras();
  }, []);

  return (
    <>
      {!isCaptureEnable && (
        <button onClick={() => setCaptureEnable(true)}>Start</button>
      )}

      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>End</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>Capture</button>
        </>
      )}
      
      {url && (
        <>
          <div>
            <button onClick={() => setUrl(null)}>Delete</button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};

export default CustomWebcam;
