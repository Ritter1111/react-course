export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  country: string;
  gender: string;
  acceptTerm: boolean;
  picture: string;
  newData: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}
