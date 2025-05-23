export type Login = {
  email: string;
  password: string;
  userType: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  roll: "customer" | "mover";
};
