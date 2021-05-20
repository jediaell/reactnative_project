import React, { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import CodePush from 'react-native-code-push';
import { useSecurity } from '@platformbuilders/use-security';
import { Crashlytics, Storage } from '~/services';
import {
  Env,
  ForceExit,
  SplashScreen,
  VersionNumber,
  useAlerts,
} from '~/utils';

type Props = {
  setToken(token: Token): void;
  setLoading(bool: boolean): void;
};

const forceExitApp = (): void => ForceExit.exitApp();

const Root: React.FC<Props> = ({ setToken, setLoading }) => {
  const { checkUpdate, blockEmulator } = useSecurity();
  const { showInfo, showError } = useAlerts();

  const secureEmulator = async (): Promise<void> => {
    try {
      const isPRD = Env.ENV === 'PRD';
      if (isPRD) {
        blockEmulator();
      }
    } catch (error) {
      Crashlytics.recordError(error);
    }
  };

  const checkVersion = async (): Promise<void> => {
    try {
      const { isNeeded, storeUrl } = await checkUpdate();
      const title = 'Atualização disponível';
      const message = 'É necessário atualizar o app para continuar utilizando!';
      const buttonText = 'Atualizar agora';
      if (isNeeded && storeUrl) {
        Alert.alert(title, message, [
          {
            text: buttonText,
            onPress: () => {
              forceExitApp();
              Linking.openURL(storeUrl);
            },
          },
        ]);
      }
    } catch (error) {
      Crashlytics.recordError(error);
    }
  };

  const bootstrap = async (): Promise<void> => {
    try {
      const token = await Storage.getToken();
      const codepush = await Storage.getCodepushUpdated();
      if (token) {
        setToken(token);
      }
      setLoading(false);
      checkVersion();
      secureEmulator();
      SplashScreen.hide();
      if (codepush) {
        showInfo('Aplicativo atualizado com sucesso!');
        await Storage.setCodepushUpdated(false);
      }
    } catch (error) {
      Crashlytics.recordError(error);
      SplashScreen.hide();
    }
  };

  const checkStatus = async (status: any) => {
    try {
      switch (status) {
        case CodePush.SyncStatus.UPDATE_INSTALLED: //1
        case CodePush.SyncStatus.SYNC_IN_PROGRESS: //4
        case CodePush.SyncStatus.AWAITING_USER_ACTION: //6
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE: //7
        case CodePush.SyncStatus.INSTALLING_UPDATE: //8
          setLoading(true);
          Storage.setCodepushUpdated(true);
          break;
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE: //5
        case CodePush.SyncStatus.UPDATE_IGNORED: //2
        case CodePush.SyncStatus.UNKNOWN_ERROR: //3
        default:
          bootstrap();
          break;
      }
    } catch (error) {
      Crashlytics.recordError(error);
      bootstrap();
    }
  };

  const syncCodeFromCodePush = () => {
    try {
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
        }, //options
        (status) => checkStatus(status), // syncStatusChangedCallback
        ({ receivedBytes, totalBytes }) => {
          const percent = `${(receivedBytes / totalBytes) * 100}%`;
          console.log('LOG: : percent', percent);
        }, //downloadProgressCallback
        () =>
          showError(
            `Aplicativo desatualizado. Sua versão é: ${VersionNumber.appVersion}.\nFavor atualizá-lo para a mais recente!`,
          ), //HandleBinaryVersionMismatchCallback
      );
    } catch (error) {
      Crashlytics.recordError(error);
      Alert.alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      bootstrap();
    } else {
      syncCodeFromCodePush();
    }
  }, []);

  return null;
};

export default Root;
