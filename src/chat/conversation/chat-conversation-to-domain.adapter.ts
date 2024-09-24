import { IAdapter, ID, IResult } from '@type-ddd/core';
import {
  ChatConversationModel,
  ChatMessageModel,
} from './chat-conversation.repository.interface';
import ChatConversation from './chat-conversation.aggregate';
import User from '../../user/user.aggregate';
import ChatMessage from '../message/chat-message.aggregate';
import UserToDomainAdapter from '../../user/user-to-domain.adapter';
import ChatMessageToDomainAdapter from '../message/chat-message-to-domain.adapter';
import { UserModel } from '../../user/user.repository.interface';

export class ChatConversationToDomainAdapter
  implements IAdapter<ChatConversationModel, ChatConversation>
{
  build(target: ChatConversationModel): IResult<ChatConversation> {
    const userAdapter = new UserToDomainAdapter();
    const chatMessageAdapter = new ChatMessageToDomainAdapter();

    const users = target.users.reduce((acc: User[], user: UserModel) => {
      const userResult = userAdapter.build(user);
      if (userResult.isOk()) acc.push(userResult.value());
      return acc;
    }, []);

    const messages = target.messages.reduce(
      (acc: ChatMessage[], message: ChatMessageModel) => {
        const messageResult = chatMessageAdapter.build(message);
        if (messageResult.isOk()) acc.push(messageResult.value());
        return acc;
      },
      [],
    );

    const id = ID.create(target.id);
    const { createdAt, updatedAt, isReadByUserId } = target;

    return ChatConversation.hydrate({
      id,
      users,
      messages,
      isReadByUserId,
      createdAt,
      updatedAt,
    });
  }
}

export default ChatConversationToDomainAdapter;
