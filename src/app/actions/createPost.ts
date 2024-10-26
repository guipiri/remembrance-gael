"use server";

import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function createDirIfNotExists() {
  if (!existsSync(__dirname + "/photos")) mkdirSync(__dirname + "/photos");
  if (!existsSync(__dirname + "/posts")) mkdirSync(__dirname + "/posts");
}

export async function createPost(image: string | null, textContent: string) {
  if (!image) return textContent;
  const id = uuidv4();

  await createDirIfNotExists();

  const imagePath = path.join(__dirname, "photos", id + ".jpeg");
  const buffer = Buffer.from(image.split(",")[1], "base64");
  writeFileSync(imagePath, buffer);

  const postJson = {
    id,
    text: textContent,
    image: image,
  };
  writeFileSync(path.join(__dirname, "posts", id), JSON.stringify(postJson));
}

export type Post = {
  id: string;
  text: string;
  image: string;
};
