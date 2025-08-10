export type { ISendOtp, ILogin, IVerifyOtp } from './auth.type'


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}