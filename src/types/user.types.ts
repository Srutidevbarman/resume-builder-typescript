export interface IUser {
  _id: string;
  name: String;
  email: String;
  mobile: String;
  password: String;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegisterBody {
  name: String;
  email: String;
  mobile: String;
  password: String;
}
export interface LoginBody {
  email: String;
  password: String;
}
export interface JWTPayload {
  userId: String;
  email?: String;
}
