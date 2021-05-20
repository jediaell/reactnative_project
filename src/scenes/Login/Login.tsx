import React, { FC } from 'react';
import { FormikProps, useFormikContext } from 'formik';
import { DisplayEnv } from '~/components';
import { FormValues } from './form';
import { FormWrapper, Input, LoginButton, Password, Wrapper } from './styles';

const Login: FC = () => {
  const {
    submitForm,
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
  }: FormikProps<FormValues> = useFormikContext();

  return (
    <Wrapper>
      <FormWrapper>
        <Input
          autoFocus
          autoCapitalize="none"
          id="lg_cpf_input"
          accessibility="Digite o CPF para fazer login"
          keyboardType="numeric"
          maskType="document"
          label="CPF PROFESSOR UNIGRACE"
          error={touched?.cpf && errors?.cpf}
          value={values?.cpf}
          onChangeText={handleChange('cpf')}
          onBlur={handleBlur('cpf')}
          onSubmitEditing={submitForm}
        />
        <Password
          id="lg_password_input"
          accessibility="Campo de senha para realizar login"
          label="senha"
          returnKeyType="send"
          error={touched?.password && errors?.password}
          value={values?.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          onSubmitEditing={submitForm}
        />
      </FormWrapper>
      <LoginButton
        id="lg_button"
        accessibility="Botão para realizar login"
        loading={isSubmitting}
        onPress={submitForm}
      >
        ENTRAR
      </LoginButton>
      <DisplayEnv />
    </Wrapper>
  );
};

export default Login;
