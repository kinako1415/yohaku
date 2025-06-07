"use server";

import { db } from "@/libs/firebaseAdmin";
import { JoinedYohaku, User, YohakuParticipant } from "@/types";

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
            joinedYohakus: [],
            friends: [],
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

        const joinedYohakus: JoinedYohaku[] = await Promise.all(
          joinedYohakuSnaps.docs.map(async (doc, index) => {
            const joinedData = doc.data();
            const joinedYohakuData = yohakuSnaps[index]?.data() || {};

            // participantsの取得（非同期処理を適切に処理）
            const participantRefs = joinedYohakuData.participants || [];
            let participants: YohakuParticipant[] = [];

            if (participantRefs.length > 0) {
              try {
                const participantSnaps = await db.getAll(...participantRefs);
                participants = participantSnaps.map((snap) => {
                  const participantData = snap.data() || {};
                  return {
                    userId: snap.id,
                    name: participantData.name || "無名",
                    email: participantData.email || "",
                    avatar: participantData.avatar || "",
                    createdAt:
                      participantData.createdAt?.toDate() || new Date(),
                    joinedYohakus: [], // 循環参照を避けるため空配列
                    friends: [], // 循環参照を避けるため空配列
                    joinedAt: new Date(), // デフォルト値
                  };
                });
              } catch (error) {
                console.error("Error fetching participants:", error);
                participants = [];
              }
            }

            // authorの取得
            let author = {
              userId: "unknown",
              name: "不明",
              email: "",
              avatar: "",
              createdAt: new Date(),
              joinedYohakus: [],
              friends: [],
            };

            if (joinedYohakuData.authorRef) {
              try {
                const authorSnap = await joinedYohakuData.authorRef.get();
                if (authorSnap.exists) {
                  const authorData = authorSnap.data() || {};
                  author = {
                    userId: authorSnap.id,
                    name: authorData.name || "不明",
                    email: authorData.email || "",
                    avatar: authorData.avatar || "",
                    createdAt: authorData.createdAt?.toDate() || new Date(),
                    joinedYohakus: [], // 循環参照を避けるため空配列
                    friends: [], // 循環参照を避けるため空配列
                  };
                }
              } catch (error) {
                console.error("Error fetching author:", error);
              }
            }

            return {
              yohakuId: doc.id,
              title: joinedYohakuData.title || "無題の余白",
              startDate: joinedYohakuData.startDate?.toDate() || new Date(),
              endDate: joinedYohakuData.endDate?.toDate() || new Date(),
              author: author,
              participants: participants,
              chatRoom: joinedYohakuData.chatRoomRef?.id || "",
              place: joinedYohakuData.place || "",
              createdAt: joinedYohakuData.createdAt?.toDate() || new Date(),
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