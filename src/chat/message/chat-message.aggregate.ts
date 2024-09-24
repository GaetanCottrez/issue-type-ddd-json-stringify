import { Aggregate, Result, UID } from '@type-ddd/core';

export interface ChatMessageProps {
  id?: UID;
  content: string;
  sender: SenderProps;
  attachment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SenderProps {
  id: string;
  name: string;
}

export class ChatMessage extends Aggregate<ChatMessageProps> {
  private constructor(props: ChatMessageProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: ChatMessageProps): Result<ChatMessage> {
    return Result.Ok(
      new ChatMessage({
        ...props,
        attachment: ChatMessage.validUrl(props.attachment),
      }),
    );
  }

  static validUrl(url: string | undefined) {
    if (url === undefined) return undefined;
    return url;
  }

  addAttachment(attachment: string) {
    this.props.attachment = ChatMessage.validUrl(attachment);
  }
}

export default ChatMessage;
