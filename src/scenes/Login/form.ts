import { FormValidator, isValidCpfCnpj } from '~/utils';

const validateAlphanumeric = new RegExp('^[a-zA-Z0-9.]*$');
const validateLength = (value: string | null | undefined): boolean =>
  (value && value.length >= 6) || false;

export const validationSchema = FormValidator.object().shape({
  cpf: FormValidator.string().test('cpf', 'CPF/CNPJ inválido', isValidCpfCnpj),

  password: FormValidator.string()
    .matches(validateAlphanumeric, 'Senha não pode conter caracteres especiais')
    .test('length', 'Senha deve conter pelo menos 6 dígitos', validateLength)
    .required('Senha obrigatória'),
});

export type FormValues = {
  cpf: string;
  password: string;
};

export const initialValues = {
  cpf: '',
  password: '',
};
