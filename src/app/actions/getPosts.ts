"use server";

import { readdirSync, readFileSync } from "fs";
import { createDirIfNotExists, Post } from "./createPost";
import path from "path";

export async function getPosts() {
  const [, postsDirectory] = await createDirIfNotExists();
  const fileList = readdirSync(postsDirectory);

  const posts: Post[] = [];

  fileList.forEach((fileName) => {
    const fileContent = readFileSync(
      path.join(postsDirectory, fileName)
    ).toString();
    posts.push(JSON.parse(fileContent));
  });

  return posts;
}
