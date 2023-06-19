import * as db from "../repositories/index";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import sharp, { bool } from "sharp";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = "individualbucket";
const region = "eu-north-1";
const accessKeyId = "AKIA4KVU4TXFQKSL3H53";
const secretAccessKey = "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";

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

export async function GetPosts() {
  const posts = await db.GetPosts();

  for (const post of posts) {
    if (!post.picture) {
      // Skip this iteration if picture is null
      continue;
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: post.picture,
    };

    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.picture = url;
  }

  return posts;
}

export async function GetPostById(id: string) {
  const post = await db.GetPostById(id);

  return post;
}

export async function CreatePost(data: any, file: any) {
  let imageName;
  const now = new Date();

  if (file) {
    imageName = `${now.toISOString()}-${file.originalname}`;
    const resizedBuffer = await sharp(file.buffer).toBuffer();
    const buffer = await sharp(resizedBuffer).jpeg({ quality: 50 }).toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  const postData = {
    ...data,
    picture: imageName || null,
  };

  console.log("tuka service", postData, file);

  const post = await db.CreatePost(postData);

  return post;
}

export async function DeletePosts(id: string) {
  const post = await db.DeletePost(id);

  return post;
}

export function GetPostsByUserId(userId: string) {
  const posts = db.GetPostsByUserId(userId);

  return posts;
}

export async function updatePostUsernames(userId: string, newUsername: string) {
  try {
    await db.updatePostUsernames(userId, newUsername);
    return true;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function LikePost(postId: string, userId: string) {
  const post = await db.LikePost(postId, userId);

  return post;
}

export async function GetPostLikes(postId: string) {
  const post = await db.GetPostLikes(postId);

  return post;
}

export async function UnlikePost(postId: string, userId: string) {
  const post = await db.UnlikePost(postId, userId);

  return post;
}
