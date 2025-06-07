"use server";

import { User } from "@/types";
import { db, auth } from "@/libs/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export async function postYohaku(
  authorId: string,
  title: string,
  endDate: Date,
  startDate: Date,
  place: string
) {
  try {
    const authorRef = await db.collection("users").doc(authorId);
    const chatRoomRef = await db
      .collection("chatRoom")
      .add({ createdAt: Timestamp.fromDate(new Date()) });

    const data = {
      authorRef: authorRef,
      chatRoomRef: chatRoomRef,
      createdAt: Timestamp.fromDate(new Date()),
      endDate: Timestamp.fromDate(endDate),
      place: place || "",
      startDate: Timestamp.fromDate(startDate),
      title: title || "",
    };

    await db.collection("yohakus").add(data);

    return { success: true };
  } catch (e) {
    console.error("Failed to register user:", e);
    return { success: false, error: "ユーザー登録に失敗しました" };
  }
}
