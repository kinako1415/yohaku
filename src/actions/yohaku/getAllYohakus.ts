"use server";
import { db } from "@/libs/firebaseAdmin";
import { User, Yohaku, YohakuParticipant } from "@/types";

export async function getAllYohakus() {
  try {
    const snapshot = await db.collection("yohakus").get();
    const yohakus: Yohaku[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        // friendsの参照を一括取得（空チェック追加）
        const authorRef = data.authorRef || [];
        const authorSnaps = authorRef ? await db.getAll(...[authorRef]) : [];
        const author: User = authorSnaps.map((snap) => {
          const authorData = snap.data() || {};
          return {
            userId: snap.id,
            name: authorData.name,
            email: authorData.email,
            avatar: authorData.avatar || "",
            createdAt: authorData.createdAt?.toDate() || new Date(),
            joinedYohakus: authorData.joinedYohakus || [],
            friends: authorData.friends || [],
          };
        })[0];
        // participantsの取得
        const participantsSnaps = await db
          .collection("yohakus")
          .doc(doc.id)
          .collection("participants")
          .get();

        if (participantsSnaps.empty) {
          return {
            yohakuId: doc.id,
            title: data.title || "",
            startDate: data.startDate?.toDate() || new Date(),
            endDate: data.endDate?.toDate() || new Date(),
            author: author,
            participants: [],
            chatRoom: data.chatRoomRef,
            place: data.place || "",
            createdAt: data.createdAt?.toDate() || new Date(),
          };
        }

        const participantsData = participantsSnaps.docs.map((doc) => ({
          ref: doc.data().userRef,
          joinedAt: doc.data().joinedAt,
        }));
        // console.log("participantsData", participantsData);
        // console.log("participantsData.length", participantsData.length);

        const participantSnaps =
          participantsData.length > 0
            ? await db.getAll(...participantsData.map((data) => data.ref))
            : [];

        const yohakuParticipant: YohakuParticipant[] = participantSnaps.map(
          (snap, index) => {
            const participantsJoinData = doc.data();
            const participantsUserData = participantSnaps[index]?.data() || {};

            return {
              userId: doc.id,
              name: participantsUserData.name || "",
              email: participantsUserData.email || "",
              avatar: participantsUserData.avatar || "",
              createdAt: participantsUserData.createdAt?.toDate() || new Date(),
              friends: participantsUserData.friends || [],
              joinedYohakus: participantsUserData.joinedYohakus || [],
              joinedAt:
                participantsData[index].joinedAt?.toDate() || new Date(),
            };
          }
        );

        // console.log("yohakuParticipant", yohakuParticipant);

        return {
          yohakuId: doc.id,
          title: data.title || "",
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate() || new Date(),
          author: author,
          participants: yohakuParticipant || [],
          chatRoom: data.chatRoomRef,
          place: data.place || "",
          createdAt: data.createdAt?.toDate() || new Date(),
        };

        console.log("yohakus", yohakus);
      })
    );
    return yohakus;
  } catch (e) {
    console.error("Error fetching yohakus:", e);
    return [];
  }
}
