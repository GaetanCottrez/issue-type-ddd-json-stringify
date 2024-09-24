import { EventHandler } from '@type-ddd/core';
import Product from './product.aggregate';

export class ProductCreated extends EventHandler<Product> {
  constructor() {
    super({ eventName: 'ProductCreated' });
  }

  dispatch(aggregate: Product): void {
    console.log(`EVENT DISPATCH: PRODUCT CREATED`);
    aggregate
      .context()
      .dispatchEvent(this.params.eventName, aggregate.toObject());
  }
}

export default ProductCreated;
