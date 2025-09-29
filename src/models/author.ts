export interface AuthorCreateRequest {
  middlename?: string;
  name: string;
  surname?: string;
}

export interface AuthorRequest {
  AuthorId: number;
  Middlename?: string;
  Name: string;
  Surname?: string;
}

export interface AuthorUpdateRequest {
  middlename?: string;
  name: string;
  surname?: string;
}
