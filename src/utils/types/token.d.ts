declare type Token = {
  accessToken?: string;
  session?: {
    logged: boolean;
    sessionStart: string;
  };
};
