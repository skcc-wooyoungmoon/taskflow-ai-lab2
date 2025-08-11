export type CreateUserRequest = {
  email: string;
  name?: string;
};

export type UpdateUserRequest = {
  email?: string;
  name?: string;
};