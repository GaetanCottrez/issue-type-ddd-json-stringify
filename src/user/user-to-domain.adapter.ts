import {
  EmailValueObject,
  IAdapter,
  ID,
  IResult,
  Result,
  UserNameValueObject,
} from 'types-ddd';
import { UserModel } from './user.repository.interface';
import User from './user.aggregate';

export class UserToDomainAdapter implements IAdapter<UserModel, User> {
  build(target: UserModel): IResult<User> {
    const userNameValueObject = UserNameValueObject.create(target.name);
    const emailValueObject = EmailValueObject.create(target.email);

    if (userNameValueObject.isFail())
      return Result.fail(userNameValueObject.error());
    if (emailValueObject.isFail()) return Result.fail(emailValueObject.error());

    const name = userNameValueObject.value().get('value');
    const email = emailValueObject.value().get('value');

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
