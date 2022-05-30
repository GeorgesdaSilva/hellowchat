class AppError {
  public readonly message: string;

  public readonly statusCode: number;
  
  public readonly user?:string;

  constructor(message: string, statusCode = 400,user?:string) {
    this.message = message;
    this.statusCode = statusCode;
    this.user=user;

  }
}

export default AppError;
