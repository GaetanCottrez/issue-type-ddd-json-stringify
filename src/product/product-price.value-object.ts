import { Fail, IResult, Result, ValueObject } from 'types-ddd';

export class ProductPrice extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static isValidProps(value: number): boolean {
    const { number } = this.validator;
    return number(value).isPositive();
  }

  public static create(value: number): IResult<ProductPrice> {
    const message = 'value must be positive';

    if (!this.isValidProps(value)) return Fail(message);

    return Result.Ok(new ProductPrice(value));
  }
}

export default ProductPrice;
