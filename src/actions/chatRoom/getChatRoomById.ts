import { db } from "@/libs/firebaseAdmin";
import { ChatRoom } from "@/types";

export async function getChatRoomById(
  yohakuId: string
): Promise<ChatRoom | null> {
  try {
    const snapshot = await db.collection("yohakus").doc(yohakuId).get();
    console.log("snapshot", snapshot);

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data();
    if (!data) {
      return null;
    }

    let chatRoom: ChatRoom = {
      chatRoomId: "unknown",
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
        console.error("Error fetching chat room:", error);
        return null;
      }
    }

    return chatRoom;
  } catch (error) {
    console.error("Error fetching chat room:", error);
    return null;
  }
}
