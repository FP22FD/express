export interface BookAuthorCreateRequest {
  authorId: number;
}

export interface BookAuthorResponse {
  authorId: number;
  bookId: number;
}

export interface BookCreateRequest {
  description: string;
  downloadUrl?: string;
  imageUrl?: string;
  isbn: string;
  languageId: number;
  title: string;
  year: number;
}

export interface BookResponse {
  bookId: number;
  createdAtUtc: string;
  createdBy: number;
  description: string;
  downloadUrl?: string;
  imageUrl?: string;
  isbn: string;
  languageId: number;
  modifiedAtUtc: string;
  modifiedBy: number;
  title: string;
  year: number;
}

export interface BookUpdateRequest {
  description: string;
  downloadUrl?: string;
  imageUrl?: string;
  isbn: string;
  languageId: number;
  title: string;
  year: number;
}
