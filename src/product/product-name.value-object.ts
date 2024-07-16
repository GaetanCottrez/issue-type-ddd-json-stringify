import { IResult, Result, ValueObject } from 'types-ddd';

export class ProductName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  validation(value: string): boolean {
    return ProductName.isValidProps(value);
  }

  public static isValidProps(value: string): boolean {
    const { string } = this.validator;
    return string(value).hasLengthBetweenOrEqual(3, 30);
  }

  public static create(value: string): IResult<ProductName> {
    const message = 'value must have length min 3 and max 30 char';

    if (!this.isValidProps(value)) return Result.fail(message);

    return Result.Ok(new ProductName(value));
  }
}

export default ProductName;
