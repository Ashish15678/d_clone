export const runtime = "nodejs";
import { auth } from "@clerk/nextjs";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const hadnleauth = async () => {
  const userId = await auth();
  if (!userId) {
    throw new Error("Unauthorised");
  }
  return { userid: userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await hadnleauth())
    .onUploadComplete((file) => {
      console.log(file);
    }),

  messageFile: f(["image", "pdf"])
    .middleware(async () => await hadnleauth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
