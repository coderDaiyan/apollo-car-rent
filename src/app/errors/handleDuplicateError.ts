import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const msg = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: err.path,
      message: `${msg} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    errorMessages,
    message: 'Invalid ID',
    statusCode,
  };
};

export default handleDuplicateError;
