export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  password2: string;
  gender: string;
  acceptTerm: boolean;
  picture: string;
  newData: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}
