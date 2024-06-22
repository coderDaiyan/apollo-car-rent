import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, resData: TResponse<T>) => {
  const { statusCode, success, message, data } = resData;
  res.status(statusCode).json({
    success: success,
    statusCode: statusCode,
    message: message,
    data: data,
  });
};

export default sendResponse;
