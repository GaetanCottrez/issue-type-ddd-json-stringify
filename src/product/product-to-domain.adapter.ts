import {ProductModel} from "../product/product.repository.interface";
import { Class, IAdapter, ID, IResult, Result, ValueObject } from '@type-ddd/core';
import ProductName from './product-name.value-object';
import ProductPrice from './product-price.value-object';
import Product from './product.aggregate';

export class ProductToDomainAdapter implements IAdapter<ProductModel, Product> {
  build(target: ProductModel): IResult<Product> {
    const { result, data } = ValueObject.createMany([
      Class<string>(ProductName, target.name),
      Class<number>(ProductPrice, target.price),
    ]);

    if (result.isFail()) return Result.fail(result.error());

    const name = data.next().value() as ProductName;
    const price = data.next().value() as ProductPrice;

    const id = ID.create(target.id);
    const { createdAt, updatedAt } = target;

    return Product.create({
      id,
      name: name.get('value'),
      price: price.get('value'),
      createdAt,
      updatedAt,
    });
  }
}

export default ProductToDomainAdapter;
