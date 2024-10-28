"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CameraComponent from "./camera";
import { LuImagePlus } from "react-icons/lu";
import { PiXBold } from "react-icons/pi";
import { createPost, Post } from "./actions/createPost";
import { getPosts } from "./actions/getPosts";

export default function Home() {
  const [textContent, setTextContent] = useState("");
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [showCameraComponent, setShowCameraComponent] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  const savePost = async () => {
    await createPost(finalImage, textContent);
    setFinalImage(null);
    setTextContent("");
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="w-[100%] flex items-center justify-center px-4 mb-96 flex-col">
      {!showCameraComponent && (
        <>
          <h1 className="mt-12 font-bold text-2xl text-center mb-12">
            Chá de bebê do Gael 09/11/2024
          </h1>
          <div className="w-full max-w-3xl border px-4 py-2 rounded-md">
            <textarea
              value={textContent}
              placeholder="Deixe seu recado para o Gael..."
              className="w-full outline-none resize-none"
              onChange={(e) => setTextContent(e.target.value)}
            />
            {finalImage && (
              <div className="w-fit">
                <div className="flex items-center mb-4">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md"
                    onClick={() => setShowCameraComponent(true)}
                  >
                    Trocar
                  </button>
                  <PiXBold
                    className="ml-auto cursor-pointer"
                    size={24}
                    onClick={() => setFinalImage(null)}
                  />
                </div>
                <Image alt="teste" src={finalImage} width={500} height={500} />
              </div>
            )}
            <div className="flex items-center my-4">
              <LuImagePlus
                className="cursor-pointer"
                onClick={() => setShowCameraComponent(true)}
                size={24}
              />
              <div className="ml-auto w-fit">
                <button
                  onClick={() => savePost()}
                  className="ml-auto bg-green-600 text-white px-2 py-1 rounded-md"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showCameraComponent && (
        <CameraComponent
          setFinalImage={setFinalImage}
          setShowCameraComponent={setShowCameraComponent}
        />
      )}
      {!showCameraComponent && (
        <>
          <h1 className="mt-12 font-bold text-2xl">
            Recadinhos para o Gael...
          </h1>
          <div className="w-full max-w-3xl">
            {posts.map((posts) => {
              return (
                <div key={posts.id} className="border mt-12 rounded-md p-4">
                  <p className="mb-4">{posts.text}</p>
                  <Image
                    src={posts.image}
                    width={768}
                    height={0}
                    alt="imagem"
                    className="rounded-sm"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
