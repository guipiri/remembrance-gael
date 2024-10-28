"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Camera } from "react-camera-pro";

type CameraComponentProps = {
  setFinalImage: Dispatch<SetStateAction<string | null>>;
  setShowCameraComponent: Dispatch<SetStateAction<boolean>>;
};
export default function CameraComponent({
  setFinalImage,
  setShowCameraComponent,
}: CameraComponentProps) {
  const camera = useRef({ takePhoto: () => "", switchCamera: () => {} });
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  return (
    <div>
      <div className="w-[100%] flex items-center">
        <Camera
          ref={camera}
          errorMessages={{}}
          numberOfCamerasCallback={setNumberOfCameras}
        />
      </div>
      <button
        className="z-10 absolute bottom-24 rounded-full bg-white size-12"
        onClick={() => {
          setFinalImage(camera.current.takePhoto());
          setShowCameraComponent(false);
        }}
      ></button>
      <button
        className="z-10 absolute bottom-0 rounded-full bg-white size-12"
        hidden={numberOfCameras <= 1}
        onClick={() => {
          camera.current.switchCamera();
        }}
      />
    </div>
  );
}
