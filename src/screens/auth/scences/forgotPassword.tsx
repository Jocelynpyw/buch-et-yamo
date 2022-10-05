import { KwButton } from '@KwSrc/components/button';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import KwPhoneInput from '@KwSrc/components/phoneInput';
import {
  HomeDrawerParamList,
  HomeDrawerRouteList,
} from '@KwSrc/navigation/constants.navigation';
import { ToastService } from '@KwSrc/services';
import { colors, images } from '@KwSrc/utils';
import { convertHexToRGB } from '@KwSrc/utils/colors';
import {
  forgotPasswordPhoneSchema,
  forgotPasswordEmailSchema,
} from '@KwSrc/utils/schemas';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Formik } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('screen');

interface signInEmail {
  email: string;
  password: string;
  phone: string;
}

const ForgotPasswordScreen: FunctionComponent<ForgotPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { page } = route.params;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForgot = (data: string) => {
    setLoading(true);

    axios({
      method: 'POST',
      url: '/auth/request-password-reset',
      data: {
        data,
        method: page === 2 ? 'phone' : 'email',
        _stale_: 0,
      },
    })
      .then(() => {
        setLoading(false);

        ToastService.showToast({
          message: 'You will receive an otp code via sms notification',
          type: 'info',
        });
        navigation!.navigate(HomeDrawerRouteList.ResetPassword, {
          method: page === 2 ? 'phone' : 'email',
          value: data,
        });
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={images.forgotImage}
        />
      </View>

      <View style={styles.containMargin}>
        <Text style={styles.accountTitle}>Forgot Password</Text>
        <Text style={styles.subTitle}>
          After entering your phone number, you shall recieve a code that will
          help you change your password.
        </Text>

        <Formik
          validationSchema={
            page === 2 ? forgotPasswordPhoneSchema : forgotPasswordEmailSchema
          }
          initialValues={{
            email: '',
            password: '',
            phone: '',
          }}
          onSubmit={(values: signInEmail) => {
            handleSubmitForgot(page === 2 ? values.phone : values.email);
          }}
        >
          {({
            setFieldValue,
            touched,
            setFieldTouched,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View>
              {page === 1 ? (
                <View>
                  <View style={styles.inputMargin}>
                    <KwDefaultInput
                      prependIcon="mail"
                      styles={styles.input}
                      placeholder="Email"
                      numberOfLines={2}
                      multiline
                      borderColor={colors.app.white}
                      onBlur={(name: string) => setFieldTouched(name, true)}
                      errorText={touched.email ? errors.email : ''}
                      keyboardType="default"
                      value={values.email}
                      name="email"
                      type="emailAddress"
                      onChangeText={(name: string, val) => {
                        setFieldValue(name, val, true);
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View style={{ marginVertical: 20 }}>
                  <View style={styles.inputPhone}>
                    <KwPhoneInput
                      styles={styles.input}
                      onChange={(name: string, val) => {
                        setFieldValue(name, val, true);
                      }}
                      name="phone"
                      errorText={touched.phone ? errors.phone : ''}
                    />
                  </View>
                </View>
              )}

              <View style={[styles.inputMargin, { marginTop: 20 }]}>
                <KwButton
                  color={colors.app.primary}
                  size="lg"
                  children="Request code"
                  rounded
                  disabled={!isValid}
                  onPress={handleSubmit}
                  isLoading={loading}
                />
              </View>
              <View style={styles.inputMargin}>
                <KwButton
                  outline
                  color={colors.app.primary}
                  size="lg"
                  rounded
                  children="Back to login page"
                  onPress={() => {
                    navigation!.navigate(HomeDrawerRouteList.login);
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
    padding: 20,
  },
  image: { width: width / 2, height: 250, alignSelf: 'center' },
  containMargin: { marginTop: 10 },
  accountTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: `${convertHexToRGB(colors.text.black, '0.7')}`,
  },
  subTitle: {
    marginVertical: 5,
    color: `${convertHexToRGB(colors.text.black, '0.7')}`,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  password: {
    marginTop: 10,
    alignSelf: 'flex-end',
    color: colors.app.black,
  },
  inputMargin: { marginVertical: 10 },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.app.borderInputColor,
  },
  inputPhone: { marginVertical: 5, marginBottom: 15 },
  checkBox: {
    marginVertical: 10,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },
  sign: { marginTop: 0, marginBottom: 30, justifyContent: 'center' },
  text: { color: `${convertHexToRGB(colors.text.black, '0.7')}` },
});
interface ForgotPasswordScreenProps {
  route: RouteProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.forgotPassword
  >;
  navigation: StackNavigationProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.forgotPassword
  >;
}

export default ForgotPasswordScreen;
