const { Routes } = Modules;

declare type PrivateStackParams = {
  [Routes.HOME]: undefined;
};

declare type PublicStackParams = {
  [Routes.LOGIN]: undefined;
};

declare type ModalsStackParams = {
  [Routes.INFO]: {
    accessibility: string;
    text: string;
    buttonText: string;
    secondButton?: string;
    onPressSecondButton?(): void;
  };
};

// ROUTE PROP EXAMPLE
declare type InfoRoute = RouteProp<ModalsStackParams, Routes.INFO>;
