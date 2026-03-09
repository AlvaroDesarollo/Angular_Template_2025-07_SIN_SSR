export interface IResponseHttp {
  status: string;
  msg: string;
  payload: any;
  accessToken?: string;
  registrationToken?: string;
}
