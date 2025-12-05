export type BaseResult = {
  success: boolean;
  error?: string;
  message?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  fieldErrors?: Record<string, string>;
};
