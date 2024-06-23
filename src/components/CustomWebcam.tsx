import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "../styles.css";

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: { exact: string } | string;
  aspectRatio: number;
}

export const CustomWebcam: React.FC = () => {
  const resolutionConfigs = {
    "320p": { width: 320, height: 240, aspectRatio: 4/3 },
    "480p": { width: 640, height: 480, aspectRatio: 4/3 },
    "720p": { width: 1280, height: 720, aspectRatio: 16/9 }
  };

  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [selectedResolution, setSelectedResolution] = useState<string>("480p");
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    ...resolutionConfigs["480p"],
    facingMode: { exact: "environment" }
  });
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);

  const capture = useCallback((): void => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  const handleResolutionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newResolution = event.target.value;
    setSelectedResolution(newResolution);
    setVideoConstraints({
      ...resolutionConfigs[newResolution as keyof typeof resolutionConfigs],
      facingMode: { exact: "environment" }
    });
  };

  const startCapture = () => {
    setCaptureEnable(true);
    setVideoConstraints({
      ...resolutionConfigs[selectedResolution as keyof typeof resolutionConfigs],
      facingMode: { exact: "environment" }
    });
  };

  return (
    <>
      {!isCaptureEnable && (
        <div>
          <select value={selectedResolution} onChange={handleResolutionChange}>
            <option value="320p">320p</option>
            <option value="480p">480p</option>
            <option value="720p">720p</option>
          </select>
          <button onClick={startCapture}>Start</button>
        </div>
      )}

      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>End</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={videoConstraints.width}
              height={videoConstraints.height}
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