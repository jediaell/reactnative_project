import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { SecurityApi } from '~/api';
import { NavigationActions, Routes } from '~/navigation';
import { Storage } from '~/services';
export default class UserStore {
  @persist('object')
  @observable
  userData: UserData = {
    fullname: '',
    email: '',
    cpf: '',
  };

  @action
  login = async (credentials: Credentials): Promise<void> => {
    const { data } = await SecurityApi.login(credentials);
    this.userData = data;
    Storage.setToken(data);
    NavigationActions.resetRouteToTop(Routes.HOME);
  };

  @action
  logout = (): void => {
    NavigationActions.logout();
  };
}
