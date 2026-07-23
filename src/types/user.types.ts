export interface IUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegisterBody {
  name: string;
  email: string;
  mobile: string;
  password: string;
}
export interface LoginBody {
  email: string;
  password: string;
}
export interface JWTPayload {
  userId: string;
  email?: string;
}
