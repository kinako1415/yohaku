import { db } from "@/libs/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export async function joinYohaku(yohakuId: string, joinUserId: string) {
  try {
    const userRef = await db.collection("users").doc(joinUserId);

    const data = {
      joinedAt: Timestamp.fromDate(new Date()),
      userRef: userRef,
    };

    const YohakuRef = await db
      .collection("yohakus")
      .doc(yohakuId)
      .collection("participants")
      .add(data);

    console.log("YohakuRef", YohakuRef);
    return { success: true };
  } catch (e) {
    console.error("Failed to register user:", e);
    return { success: false, error: "ユーザー登録に失敗しました" };
  }
}
