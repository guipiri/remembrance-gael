"use server";

import { readdirSync, readFileSync } from "fs";
import { createDirIfNotExists, Post } from "./createPost";
import path from "path";

export async function getPosts() {
  await createDirIfNotExists();
  const postsPath = path.join(__dirname, "posts");
  const fileList = readdirSync(postsPath);

  const posts: Post[] = [];

  fileList.forEach((fileName) => {
    const fileContent = readFileSync(path.join(postsPath, fileName)).toString();
    posts.push(JSON.parse(fileContent));
  });

  return posts;
}
