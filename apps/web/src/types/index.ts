export type INewUser = {
  name: string;
  // username: string;
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  name: string;
  // username: string;
  email: string;
  imageUrl: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
