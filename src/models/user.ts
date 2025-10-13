export interface UserCreateRequest {
  username: string;
}

export interface UserResponse {
  userId: number;
  username: string;
}

export interface UserUpdateRequest {
  username: string;
}
