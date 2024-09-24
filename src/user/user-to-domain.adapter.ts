import {
  IAdapter,
  ID,
  IResult,
  Result,
} from '@type-ddd/core';
import { UserModel } from './user.repository.interface';
import User from './user.aggregate';

export class UserToDomainAdapter implements IAdapter<UserModel, User> {
  build(target: UserModel): IResult<User> {
    const name = target.name;
    const email = target.email;

    const id = ID.create(target.id);
    const { createdAt, updatedAt } = target;

    return User.create({
      id,
      name,
      email,
      createdAt,
      updatedAt,
    });
  }
}

export default UserToDomainAdapter;
