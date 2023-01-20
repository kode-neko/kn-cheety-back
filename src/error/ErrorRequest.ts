/* eslint-disable no-underscore-dangle */
class ErrorRequest extends Error {
  constructor(code: string, msg: string) {
    super(msg);
    this._code = code;
  }

  private _code: string;

  public get code(): string {
    return this._code;
  }

  public set code(val: string) {
    this._code = val;
  }
}
export default ErrorRequest;
