import { Aggregate, Result, UID, UrlValueObject } from 'types-ddd';

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

    const attachmentValueObject = UrlValueObject.create(url);
    return attachmentValueObject.value().get('value');
  }

  addAttachment(attachment: string) {
    this.props.attachment = ChatMessage.validUrl(attachment);
  }
}

export default ChatMessage;
