import User from './user.aggregate';

export class UserModel {
  id!: string;

  name!: string;

  email!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  getUsers(): Promise<UserModel[]>;
  getUserById(id: string): Promise<UserModel | null>;
  getUserByEmail(email: string): Promise<UserModel | null>;
  update(user: User): Promise<void>;
}

export default UserRepositoryInterface;
