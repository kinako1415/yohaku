"use server";
import { db } from "@/libs/firebaseAdmin";
import { User, Yohaku, YohakuParticipant } from "@/types";

export async function deleteYohakuById(yohakuId: string): Promise<void> {	
  try {
    await db.collection("yohakus").doc(yohakuId).delete();
  } catch (error) {
    console.error("Error deleting yohaku:", error);
  }
}
