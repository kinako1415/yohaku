"use server";

import { db } from "@/libs/firebaseAdmin";
import { JoinedYohaku, User, Yohaku, YohakuParticipant } from "@/types";
import { join } from "path";

export async function getAllUsers() {
  try {
    const snapshot = await db.collection("users").get();

    const users: User[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();

        // friendsの参照を一括取得（空チェック追加）
        const friendRefs = data.friends || [];
        const friendSnaps =
          friendRefs.length > 0 ? await db.getAll(...friendRefs) : [];

        const friends: User[] = friendSnaps.map((snap) => {
          const friendData = snap.data() || {};
          return {
            userId: snap.id,
            name: friendData.name,
            email: friendData.email,
            avatar: friendData.avatar || "",
            createdAt: friendData.createdAt?.toDate() || new Date(),
            joinedYohakus: friendData.joinedYohakus || [],
            friends: friendData.friends || [],
          };
        });

        // joinedYohakusの取得
        const joinedYohakuSnaps = await db
          .collection("users")
          .doc(doc.id)
          .collection("joinedYohakus")
          .get();

        if (joinedYohakuSnaps.empty) {
          return {
            userId: doc.id,
            name: data.name || "",
            email: data.email || "",
            avatar: data.avatar || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            friends: friends || [],
            joinedYohakus: [],
          };
        }

        // 余白の参照とjoinedAtを一緒に保持
        const joinedYohakuData = joinedYohakuSnaps.docs.map((doc) => ({
          ref: doc.data().yohakuRef,
          joinedAt: doc.data().joinedAt,
        }));

        // 余白データの取得
        const yohakuSnaps =
          joinedYohakuData.length > 0
            ? await db.getAll(...joinedYohakuData.map((data) => data.ref))
            : [];

        const joinedYohakus: JoinedYohaku[] = joinedYohakuSnaps.docs
          .map((doc, index) => {
            const joinedData = doc.data();
            const joinedYohakuData = yohakuSnaps[index]?.data() || {};

            return {
              yohakuId: doc.id,
              title: joinedYohakuData.title || "無題の余白",
              startDate: joinedYohakuData.startDate?.toDate() || new Date(),
              endDate: joinedYohakuData.endDate?.toDate() || new Date(),
              author: joinedYohakuData.authorRef,
              participants: joinedYohakuData.participants || [],
              chatRoom: joinedYohakuData.chatRoomRef,
              place: joinedYohakuData.place || "",
              createdAt: joinedYohakuData.createdAt?.toDate() || new Date(),
              joinedAt: joinedData.joinedAt?.toDate() || new Date(),
            };
          })
          .filter((yohaku): yohaku is JoinedYohaku => yohaku !== null);

        return {
          userId: doc.id,
          name: data.name || "",
          email: data.email || "",
          avatar: data.avatar || "",
          createdAt: data.createdAt?.toDate() || new Date(),
          friends: friends || [],
          joinedYohakus: joinedYohakus || [],
        };
      })
    );

    return users;
  } catch (e) {
    console.error("Error fetching users:", e);
    return [];
  }
}