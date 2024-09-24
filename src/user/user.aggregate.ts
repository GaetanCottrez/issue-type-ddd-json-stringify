import {Aggregate, Ok, Result, UID} from '@type-ddd/core';

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
    const name = props.name;
    return Ok(new User(props));
  }

  public changeName(name: string): void {

    this.props.name = name;
    this.props.updatedAt = new Date();
  }
}

export default User;
