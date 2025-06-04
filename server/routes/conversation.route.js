import { Router } from "express";
import { getConversation } from "../helpers/conversation.helper.js";
import { Conversation } from "../models/conversation.model.js";
import User from "../models/users.model.js";

const router = Router();

router.get("/chats", async (req, res) => {
  try {
    const userId = req.user._id; // Assuming passport attaches user to req.user

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch all conversations (private and group) where the user is a participant
    const conversations = await Conversation.find({ participants: userId })
      .populate({
        path: "participants",
        select: "name username avatar _id",
      })
      .lean();

    const privateChats = [];
    const groupChats = [];

    for (const conv of conversations) {
      // Calculate unread count for the current user
      let unreadCount = 0;
      const unreadInfo = conv.unreadMsgCount?.find((uc) =>
        uc.receivers.some((r) => r.equals(userId))
      );
      if (unreadInfo) {
        unreadCount = unreadInfo.unreadCount;
      }

      if (conv.isGroup) {
        // Format Group Chat
        groupChats.push({
          id: conv._id.toString(),
          name: conv.groupName,
          avatar: conv.groupAvatar,
          description: conv.groupDescription,
          participants: conv.participants.map((p) => ({
            id: p._id.toString(),
            name: p.name,
            username: p.username,
            avatar: p.avatar,
          })),
          unreadCount: unreadCount,
          type: "group",
        });
      } else {
        // Format Private Chat
        const otherParticipant = conv.participants.find(
          (p) => !p._id.equals(userId)
        );
        if (otherParticipant) {
          // Ensure there is another participant
          privateChats.push({
            id: conv._id.toString(),
            // For private chats, name/avatar come from the other user
            name: otherParticipant.name,
            avatar: otherParticipant.avatar,
            otherUser: {
              id: otherParticipant._id.toString(),
              name: otherParticipant.name,
              username: otherParticipant.username,
              avatar: otherParticipant.avatar,
            },
            unreadCount: unreadCount,
            isBlocked: conv.isBlocked,
            blockedByMe: conv.blockedBy?.equals(userId), // Check if current user blocked
            amIBlocked: conv.isBlocked && !conv.blockedBy?.equals(userId), // Check if blocked by other
            type: "private",
          });
        }
      }
    }

    res.status(200).json({ privateChats, groupChats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal server error fetching chats" });
  }
});

router.post("/get-conversation", async (req, res) => {
  const senderId = req.user._id;
  let { conversationId } = req.body;
  console.log("senderId", senderId, "conversationId", conversationId);

  try {
    // Find the conversation directly by its ID
    const findConversation = await Conversation.findById(conversationId);

    if (!findConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Check if the user is actually a participant in this conversation
    if (!findConversation.participants.includes(senderId)) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this conversation" });
    }

    console.log("findConversation", findConversation._id);
    if (findConversation) {
      if (findConversation.messages.length === 0) {
        return res.status(200).json({
          messages: [],
          isBlocked: findConversation.isBlocked,
          blockedBy: findConversation.blockedBy,
          senderId: senderId,
        });
      } else {
        try {
          // Reset unread count for the other participant's messages
          const otherParticipant = findConversation.participants.find(
            (p) => !p.equals(senderId)
          );

          findConversation.unreadMsgCount.forEach((obj) => {
            if (
              otherParticipant &&
              obj.senderId.toString() === otherParticipant.toString()
            ) {
              obj.unreadCount = 0;
            }
          });

          await findConversation.save();
          const conversation = await getConversation(findConversation.messages);

          return res.status(200).json({
            messages: conversation,
            isBlocked: findConversation.isBlocked,
            blockedBy: findConversation.blockedBy,
            senderId: senderId,
          });
        } catch (error) {
          console.log("Error getting conversation: ", error.message);
          return res.status(500).json({
            message: "Error processing conversation",
            error: error.message,
          });
        }
      }
    } else {
      return res
        .status(200)
        .json({ messages: [], isBlocked: false, blockedBy: null });
    }
  } catch (error) {
    console.log("Error getting conversation: ", error.message);
    return res
      .status(500)
      .json({ message: "Error fetching conversation", error: error.message });
  }
});

router.post("/user-details", async (req, res) => {
  const { username } = req.body;
  // console.log('inside /user-details username', username)
  // console.log('inside /user-details username type', typeof username)
  try {
    let user = await User.findOne(
      { username },
      {
        _id: 1,
        name: 1,
        username: 1,
        gender: 1,
        avatar: 1,
      }
    ).lean();

    if (user) {
      console.log("inside /user-details", user.username);
      return res.status(200).json(user);
    }

    return res.status(400).json({ error: "User not found" });
  } catch (err) {
    console.log("Error getting user details: ", err.message);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
