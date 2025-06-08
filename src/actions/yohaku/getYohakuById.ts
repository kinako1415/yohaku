"use server";
import { db } from "@/libs/firebaseAdmin";
import { ChatRoom, User, Yohaku, YohakuParticipant } from "@/types";

export async function getYohakuById(yohakuId: string): Promise<Yohaku | null> {
  try {
    // 指定されたyohakuIdのドキュメントのみを取得
    const yohakuDoc = await db.collection("yohakus").doc(yohakuId).get();

    if (!yohakuDoc.exists) {
      console.log(`Yohaku with ID ${yohakuId} not found`);
      return null;
    }

    const data = yohakuDoc.data();
    if (!data) {
      return null;
    }

    // authorの取得
    let author: User = {
      userId: "unknown",
      name: "不明",
      email: "",
      avatar: "",
      createdAt: new Date(),
      joinedYohakus: [],
      friends: [],
    };

    if (data.authorRef) {
      try {
        const authorSnap = await data.authorRef.get();
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

    //chatRoomの取得
    let chatRoom: ChatRoom = {
      chatRoomId: "unkown",
      chats: [],
      createdAt: new Date(),
    };

    if (data.chatRoomRef) {
      try {
        const chatRoomSnap = await data.chatRoomRef.get();
        if (chatRoomSnap.exists) {
          const chatRoomData = chatRoomSnap.data() || {};
          chatRoom = {
            chatRoomId: chatRoomData.chatRoomId,
            chats: [],
            createdAt: chatRoomData.createdAt?.toDate() || new Date(),
          };

          console.log("chatRoom", chatRoom);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    }

    // participantsの取得
    const participantsSnaps = await db
      .collection("yohakus")
      .doc(yohakuId)
      .collection("participants")
      .get();

    let participants: YohakuParticipant[] = [];

    if (!participantsSnaps.empty) {
      const participantsData = participantsSnaps.docs.map((doc) => ({
        ref: doc.data().userRef,
        joinedAt: doc.data().joinedAt,
      }));

      if (participantsData.length > 0) {
        try {
          const participantSnaps = await db.getAll(
            ...participantsData.map((data) => data.ref)
          );

          participants = participantSnaps.map((snap, index) => {
            const participantsUserData = snap.data() || {};
            return {
              userId: snap.id,
              name: participantsUserData.name || "無名",
              email: participantsUserData.email || "",
              avatar: participantsUserData.avatar || "",
              createdAt: participantsUserData.createdAt?.toDate() || new Date(),
              friends: [], // 循環参照を避けるため空配列
              joinedYohakus: [], // 循環参照を避けるため空配列
              joinedAt:
                participantsData[index].joinedAt?.toDate() || new Date(),
            };
          });
        } catch (error) {
          console.error("Error fetching participants:", error);
          participants = [];
        }
      }
    }

    const yohaku: Yohaku = {
      yohakuId: yohakuDoc.id,
      title: data.title || "",
      startDate: data.startDate?.toDate() || new Date(),
      endDate: data.endDate?.toDate() || new Date(),
      author: author,
      participants: participants,
      chatRoom: data.chatRoomRef?.id || "", // DocumentReferenceのIDのみを取得
      place: data.place || "",
      createdAt: data.createdAt?.toDate() || new Date(),
    };
    return yohaku;
  } catch (error) {
    console.error("Error fetching yohaku:", error);
    return null;
  }
}
