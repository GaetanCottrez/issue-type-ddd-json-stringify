import {
  ChatConversationModel,
  ChatMessageModel,
} from 'domain/chat/conversation/chat-conversation.repository.interface';
import { UserModel } from 'domain/user/user.repository.interface';
import ChatConversationToDomainAdapter from 'domain/chat/conversation/chat-conversation-to-domain.adapter';

describe('adapter', () => {
  const adapter = new ChatConversationToDomainAdapter();
  const date = new Date('2022-01-01 01:00:00');

  const userModel: UserModel = {
    id: 'valid_user_id',
    name: 'John Doe',
    email: 'john@doe.com',
    createdAt: date,
    updatedAt: date,
  };

  const chatMessageModel: ChatMessageModel = {
    id: 'valid_id',
    content: 'Hello Unit Test',
    sender: {
      id: 'valid_user_id',
      name: 'John Doe',
    },
    createdAt: date,
    updatedAt: date,
  };

  const data: ChatConversationModel = {
    id: 'valid_conversation_id',
    users: [userModel],
    isReadByUserId: ['valid_user_id'],
    messages: [chatMessageModel],
    createdAt: date,
    updatedAt: date,
  };

  it('should create a domain from a model', () => {
    const build = adapter.build(data);
    const chatConversation = build.value();
    expect(build.isOk()).toBeTruthy();
    expect(chatConversation.toObject()).toEqual(data);
  });
});
