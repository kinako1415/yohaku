"use server";

import { db } from "@/libs/firebaseAdmin";
import { JoinedYohaku, User, Yohaku } from "@/types";

export async function getAllUsers() {
  try {
    const snapshot = await db.collection("users").get();

    const users = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();

        // friendsの参照を一括取得（空チェック追加）
        const friendRefs = data.friends || [];
        const friendSnaps = friendRefs.length > 0 ? await db.getAll(...friendRefs) : [];
        const friends = friendSnaps.map((snap) => ({
          id: snap.id,
          ...snap.data(),
        }));

        // joinedYohakusの取得
        const joinedYohakusSnap = await db
          .collection("users")
          .doc(doc.id)
          .collection("joinedYohakus")
          .get();

        if (joinedYohakusSnap.empty) {
          return {
            userId: doc.id,
            name: data.name || "",
            email: data.email || "",
            avatar: data.avatar || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            friends,
            joinedYohakus: [], // 空配列を返す
          };
        }

        const joinedYohakusDocs = joinedYohakusSnap.docs;
        const yohakuRefs = joinedYohakusDocs
          .map((doc) => doc.data().yohakuRef)
          .filter(Boolean); // undefinedや nullをフィルタリング

        const yohakuSnaps = yohakuRefs.length > 0 ? await db.getAll(...yohakuRefs) : [];

        const joinedYohakus = await Promise.all(
          joinedYohakusDocs.map(async (joinedDoc, index) => {
            const joinedData = joinedDoc.data();
            const yohakuData = yohakuSnaps[index]?.data() || {};
            console.log("Yohaku Data:", joinedData);

            // 参加者の参照を処理（空チェック追加）
            console.log("Yohaku Data:", yohakuData);
            const participantRefs = yohakuData?.participants || [];
            const participantSnaps = participantRefs.length > 0 
              ? await db.getAll(...participantRefs)
              : [];

            const participants = participantSnaps.map((snap) => ({
              userId: snap.id,
              ...snap.data(),
              joinedAt: joinedData.joinedAt?.toDate(),
            }));

            return {
              yohakuId: joinedDoc.id,
              ...yohakuData,
              participants,
              joinedAt: joinedData.joinedAt?.toDate() || new Date(),
            };
          })
        );

        return {
          userId: doc.id,
          name: data.name || "",
          email: data.email || "",
          avatar: data.avatar || "",
          createdAt: data.createdAt?.toDate() || new Date(),
          friends,
          joinedYohakus,
        };
      })
    );

    return users;
  } catch (e) {
    console.error("Error fetching users:", e);
    return [];
  }
}