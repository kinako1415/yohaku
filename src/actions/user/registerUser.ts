"use server";

import { db, auth } from "@/libs/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export async function registerUser(id: string, name: string) {
    try {
        // ユーザー情報の取得
        const userRecord = await auth.getUser(id);
        
        const data = {
            avatar: userRecord.photoURL || "",
            createdAt: Timestamp.fromDate(new Date()),
            email: userRecord.email || "",
            friends: [],
            name: name,
            joinedYohakus: []
        }

        await db.collection("users").doc(id).set(data);
        return { success: true };
    } catch(e) {
        console.error("Failed to register user:", e);
        return { success: false, error: "ユーザー登録に失敗しました" };
    }
}