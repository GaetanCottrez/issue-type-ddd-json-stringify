import { IAdapter, ID, IResult } from 'types-ddd';
import ChatMessage from './chat-message.aggregate';
import { ChatMessageModel } from '../conversation/chat-conversation.repository.interface';

export class ChatMessageToDomainAdapter
  implements IAdapter<ChatMessageModel, ChatMessage>
{
  build(target: ChatMessageModel): IResult<ChatMessage> {
    const id = ID.create(target.id);

    const { createdAt, updatedAt, content, sender } = target;

    return ChatMessage.create({
      id,
      content,
      sender,
      createdAt,
      updatedAt,
    });
  }
}

export default ChatMessageToDomainAdapter;
