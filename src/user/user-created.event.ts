import { EventHandler } from '@type-ddd/core';
import User from './user.aggregate';

export class UserCreated extends EventHandler<User> {
  constructor() {
    super({ eventName: 'USER CREATED' });
  }

  dispatch(aggregate: User): void {
    console.log('Domain Event Called');
    aggregate
      .context()
      .dispatchEvent(this.params.eventName, aggregate.toObject());
  }
}

export default UserCreated;
