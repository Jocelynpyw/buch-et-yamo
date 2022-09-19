import * as Yup from 'yup';
import { I18n } from '@KwSrc/config';

export const loginWithEmailSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(I18n.t('SCHEMA__EMAIL_INPUT'))
    .required(I18n.t('COMMON__MUST_INPUT')),
  password: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
  phone: Yup.string(),
});

export const loginWithPhoneSchema = Yup.object().shape({
  phone: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
  password: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
});
export const signupWithEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email(I18n.t('SCHEMA__EMAIL_INPUT'))
    .required(I18n.t('COMMON__MUST_INPUT')),
  password: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
  username: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
  phone: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
});
export const signupWithPhoneSchema = Yup.object().shape({
  phone: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
  username: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
});

export const forgotPasswordPhoneSchema = Yup.object().shape({
  phone: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
});

export const forgotPasswordEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email(I18n.t('SCHEMA__EMAIL_INPUT'))
    .required(I18n.t('COMMON__MUST_INPUT')),
});

export const resetPasswordSchema = Yup.object().shape({
  code: Yup.number().required(I18n.t('COMMON__MUST_INPUT')),
  // .max(5, 'Must be exactly 5 characters'),

  password: Yup.string().required(I18n.t('COMMON__MUST_INPUT')),
});
