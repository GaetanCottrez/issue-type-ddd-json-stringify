import ChatConversation from './chat-conversation.aggregate';
import { UserModel } from '../../user/user.repository.interface';

export class ChatConversationModel {
  id!: string;

  users!: UserModel[];

  messages!: ChatMessageModel[];

  isReadByUserId!: string[];

  createdAt!: Date;

  updatedAt!: Date;
}

export class ChatMessageModel {
  id!: string;

  content!: string;

  sender!: {
    id: string;
    name: string;
  };

  createdAt!: Date;

  updatedAt!: Date;
}

export interface ChatConversationRepositoryInterface {
  create(conversation: ChatConversation): Promise<void>;
  update(conversation: ChatConversation): Promise<void>;
  getChatConversationByUserIds(
    userIds: string[],
  ): Promise<ChatConversationModel | null>;
  getAllChatConversationByUserId(
    userId: string,
  ): Promise<ChatConversationModel[]>;
  getAllChatConversationByUserEmail(
    email: string,
  ): Promise<ChatConversationModel[]>;
  getChatConversationById(id: string): Promise<ChatConversationModel | null>;
}

export default ChatConversationRepositoryInterface;
