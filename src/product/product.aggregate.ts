import { Aggregate, Ok, Result, UID } from '@type-ddd/core';
import ProductName from './product-name.value-object';
import ProductPrice from './product-price.value-object';

export interface ProductProps {
  id?: UID;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Aggregate<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }

  public static create(props: ProductProps): Result<Product> {
    const name = ProductName.create(props.name);
    const price = ProductPrice.create(props.price);

    return Ok(
      new Product({
        ...props,
        name: name.value().get('value'),
        price: price.value().get('value'),
      }),
    );
  }
}

export default Product;
