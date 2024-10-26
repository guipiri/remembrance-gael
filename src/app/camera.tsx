"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import { Camera } from "react-camera-pro";

type CameraComponentProps = {
  setFinalImage: Dispatch<SetStateAction<string | null>>;
  setShowCameraComponent: Dispatch<SetStateAction<boolean>>;
};
export default function CameraComponent({
  setFinalImage,
  setShowCameraComponent,
}: CameraComponentProps) {
  const camera = useRef({
    takePhoto: () => "",
  });

  return (
    <div>
      <div className="w-[100%] flex items-center">
        <Camera ref={camera} errorMessages={{}} />
      </div>
      <button
        className="z-10 absolute bottom-24 rounded-full bg-white size-12"
        onClick={() => {
          setFinalImage(camera.current.takePhoto());
          setShowCameraComponent(false);
        }}
      ></button>
    </div>
  );
}
