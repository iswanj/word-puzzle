export type RootStackParamList = {
  Bootstrap: undefined;
  SignIn: undefined;
  Register: undefined;
  Home: undefined;
  CategorySelect: undefined;
  PuzzleGame: undefined;
  LeaderBoard: undefined;
};

export interface User {
  id: string;
  fullName: string;
  email: string | null;
  score: number;
}
