"use server";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "./uploadFile";

const gaelRemembranceDirectory = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "gael-remembrance"
);

const photosDirectory = path.join(gaelRemembranceDirectory, "photos");
const postsDirectory = path.join(gaelRemembranceDirectory, "posts");

export async function createDirIfNotExists() {
  if (!existsSync(gaelRemembranceDirectory))
    mkdirSync(gaelRemembranceDirectory);
  if (!existsSync(photosDirectory)) mkdirSync(photosDirectory);
  if (!existsSync(postsDirectory)) mkdirSync(postsDirectory);
  return [photosDirectory, postsDirectory];
}

export async function createPost(image: string | null, textContent: string) {
  if (!image) return textContent;
  const id = uuidv4();

  await createDirIfNotExists();

  const imagePath = path.join(photosDirectory, id + ".jpeg");
  const buffer = Buffer.from(image.split(",")[1], "base64");

  await uploadFile(buffer, id + ".jpeg", "jpeg");
  writeFileSync(imagePath, buffer);

  const postJson = {
    id,
    text: textContent,
    image:
      "https://pub-7bb81c696ffe49729a642cee6657b864.r2.dev/" + id + ".jpeg",
  };
  writeFileSync(path.join(postsDirectory, id), JSON.stringify(postJson));
}

export type Post = {
  id: string;
  text: string;
  image: string;
};
