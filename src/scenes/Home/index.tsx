import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from '~/stores';
import Home from './Home';

type Props = {
  user: UserStore;
};

const HomeContainer: FC<Props> = ({ user }) => {
  const logout = (): void => {
    user.logout();
  };

  return <Home logout={logout} />;
};

export default inject('user')(observer(HomeContainer));
