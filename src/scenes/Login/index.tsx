import React, { FC, useEffect } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { inject, observer } from 'mobx-react';
import { RemoteConfig } from '~/services';
import { UserStore } from '~/stores';
import { useAlerts } from '~/utils';
import { FormValues, initialValues, validationSchema } from './form';
import Login from './Login';

type Props = {
  user: UserStore;
};

const LoginContainer: FC<Props> = (props) => {
  const { showError, showInfo } = useAlerts();

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> => {
    const { user } = props;
    setSubmitting(true);
    try {
      await user.login(values);
    } catch ({ message }) {
      showError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const loadRemoteConfig = async () => {
    const alert = await RemoteConfig.getValue('alert');
    const isAlertEnabled = alert === 'enabled';

    if (isAlertEnabled) {
      showInfo('Alert demo by Remote config');
    }
  };

  useEffect(() => {
    loadRemoteConfig();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Login />
    </Formik>
  );
};

export default inject('user')(observer(LoginContainer));
