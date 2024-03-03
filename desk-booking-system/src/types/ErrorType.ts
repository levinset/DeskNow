export interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}
