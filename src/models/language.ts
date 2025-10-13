export interface CreateLanguageRequest {
  languageCode: string;
}
export interface LanguageResponse {
  languageCode: string;
  languageId: number;
}

export interface UpdateLanguageRequest {
  languageCode: string;
}
