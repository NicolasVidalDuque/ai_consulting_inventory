import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "../styles.css";

interface CustomWebcamProps {
  make_request: (url: string) => void;
}

interface VideoConstraints {
  width: number;
  height: number;
  facingMode: { exact: string } | string;
  aspectRatio: number;
}

export const CustomWebcam: React.FC<CustomWebcamProps> = ({make_request}: CustomWebcamProps) => {
  const resolutionConfigs = {
    "320p": { width: 240, height: 240, aspectRatio: 1 },
    "480p": { width: 480, height: 480, aspectRatio: 1 },
    "720p": { width: 720, height: 720, aspectRatio: 1 }
  };

  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const [selectedResolution, setSelectedResolution] = useState<string>("720");
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>({
    ...resolutionConfigs["720p"],
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
          <div className="result_image_container">
            <Webcam className="result_image"
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
        <div className="result_image_container">
          <div className="button_container">
            <button onClick={() => setUrl(null)}>Delete</button>
          </div>
          <div className="result_image_container">
            <img className="result_image" src={url} alt="Screenshot" />
            <button className="use_button" onClick={() => make_request(url)}>USE IMAGE</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomWebcam;