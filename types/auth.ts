export type BaseResult = {
  success: boolean;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
};
