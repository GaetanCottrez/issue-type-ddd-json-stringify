import { Aggregate, Ok, Result, UID, UserNameValueObject } from 'types-ddd';

export interface UserProps {
  id?: UID;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Aggregate<UserProps> {
  private constructor(props: UserProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: UserProps): Result<User> {
    const name = UserNameValueObject.create(props.name);
    return Ok(new User(props));
  }

  public changeName(name: string): void {
    const valueName = UserNameValueObject.create(name);

    this.props.name = valueName.value().get('value');
    this.props.updatedAt = new Date();
  }
}

export default User;
