import { EventHandler } from '@type-ddd/core';
import ChatConversation from './chat-conversation.aggregate';

export class ChatConversationCreated extends EventHandler<ChatConversation> {
  constructor() {
    super({ eventName: 'CHAT CONVERSATION CREATED' });
  }

  dispatch(aggregate: ChatConversation): void {
    console.log('Domain Event Called');
    aggregate
      .context()
      .dispatchEvent(this.params.eventName, aggregate.toObject());
  }
}

export default ChatConversationCreated;
