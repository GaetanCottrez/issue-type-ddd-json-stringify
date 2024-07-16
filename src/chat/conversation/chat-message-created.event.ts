import { EventHandler } from 'types-ddd';
import ChatConversation from './chat-conversation.aggregate';

export class ChatMessageCreated extends EventHandler<ChatConversation> {
  constructor() {
    super({ eventName: 'CHAT MESSAGE CREATED' });
  }

  dispatch(aggregate: ChatConversation): void {
    console.log('Domain Event Called');
    aggregate
      .context()
      .dispatchEvent(this.params.eventName, aggregate.toObject());
  }
}

export default ChatMessageCreated;
