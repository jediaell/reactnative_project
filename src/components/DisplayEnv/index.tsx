import React from 'react';
import { ENVS, Env, VersionNumber } from '~/utils';
import { Text } from './styles';

const currentEnv = Env.ENV;

const DisplayEnv: React.FC = () =>
  currentEnv && currentEnv !== ENVS.PRD ? (
    <Text>
      {`Ambiente: ${currentEnv}(${VersionNumber.appVersion}/${VersionNumber.buildVersion})`}
    </Text>
  ) : null;

export default DisplayEnv;
