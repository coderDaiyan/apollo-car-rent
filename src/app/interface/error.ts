export type TErrorMessages = {
  path: string;
  message: string | 'Something went wrong';
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TErrorMessages;
};
