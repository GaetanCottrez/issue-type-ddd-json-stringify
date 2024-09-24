import { Aggregate, Ok, Result, UID } from '@type-ddd/core';
import User from '../../user/user.aggregate';
import ChatMessage from '../message/chat-message.aggregate';

export interface ConversationProps {
  id?: UID;
  users: User[];
  messages: ChatMessage[];
  isReadByUserId: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class ChatConversation extends Aggregate<ConversationProps> {
  private constructor(props: ConversationProps) {
    super(props, { disableSetters: true });
  }

  public static hydrate(props: ConversationProps): Result<ChatConversation> {
    return Ok(new ChatConversation(props));
  }

  public static create(props: ConversationProps): Result<ChatConversation> {
    if (props.users.length < 2)
      throw new Error('At least 2 users are required');

    props.isReadByUserId = props.users.map((user) => user.id.value());
    return Ok(new ChatConversation(props));
  }

  public addReadByUserId(userId: string): void {
    this.props.isReadByUserId.push(userId);
    this.props.isReadByUserId = [...new Set(this.props.isReadByUserId)];
    this.props.updatedAt = new Date();
  }

  hasBeenReadBy(userId: string): boolean {
    return this.props.isReadByUserId.includes(userId);
  }

  public addMessage(message: ChatMessage): void {
    const userExistsInTheConversation = this.props.users
      .map((user) => user.id.value())
      .find((userId) => userId === message.get('sender').id);
    if (userExistsInTheConversation === undefined)
      throw new Error('User not found in the conversation');

    this.props.messages.push(message);
    this.props.isReadByUserId = [];
    this.addReadByUserId(message.get('sender').id);
    this.props.updatedAt = new Date();
  }
}

export default ChatConversation;
