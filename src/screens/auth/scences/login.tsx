import { KwButton } from '@KwSrc/components/button';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import KwPhoneInput from '@KwSrc/components/phoneInput';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  HomeDrawerParamList,
  HomeDrawerRouteList,
} from '@KwSrc/navigation/constants.navigation';
import { ToastService } from '@KwSrc/services';
import { AuthSignInAction } from '@KwSrc/store/actions';
import { colors, images } from '@KwSrc/utils';
import { convertHexToRGB } from '@KwSrc/utils/colors';
import {
  loginWithEmailSchema,
  loginWithPhoneSchema,
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

interface signInEmail {
  email: string;
  password: string;
  phone: string;
}

const LoginScreen: FunctionComponent<LoginScreenProps> = ({ navigation }) => {
  const [page, setPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmitSign = (email: string, password: string) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: '/auth/sign-in',
      data: { username: email.toLocaleLowerCase(), password },
    })
      .then((res) => {
        setLoading(false);

        dispatch(AuthSignInAction(res.data));
        ToastService.showToast({
          message: 'Signin with success',
          type: 'success',
        });
        navigation!.reset({
          index: 0,
          routes: [{ name: HomeDrawerRouteList.BottomTab }],
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={images.loginImage}
        />
      </View>

      <View style={styles.containMargin}>
        <Text style={styles.accountTitle}>
          {i18n.t('COMPONENT__LOGIN_MESSAGE_LOGIN_WITH_ACCOUNT')}
        </Text>
        <Text style={styles.subTitle}>
          Select your country, then enter your phone number or email and
          password.
        </Text>

        <Formik
          validationSchema={
            page === 2 ? loginWithPhoneSchema : loginWithEmailSchema
          }
          initialValues={{
            email: '',
            password: '',
            phone: '',
          }}
          onSubmit={(values: signInEmail) => {
            handleSubmitSign(
              page === 2 ? values.phone : values.email,
              values.password,
            );
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
                    keyboardType="email-address"
                    value={values.email}
                    name="email"
                    type="emailAddress"
                    onChangeText={(name: string, val) => {
                      setFieldValue(name, val, true);
                    }}
                  />
                </View>
              ) : (
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
              )}

              <View style={styles.inputMargin}>
                <KwDefaultInput
                  prependIcon="lock"
                  styles={styles.input}
                  placeholder="Password"
                  numberOfLines={2}
                  multiline
                  borderColor={colors.app.white}
                  secureTextEntry
                  keyboardType="default"
                  name="password"
                  onChangeText={(name: string, val) => {
                    setFieldValue(name, val, true);
                  }}
                  value={values.password}
                  onBlur={(name: string) => setFieldTouched(name, true)}
                  errorText={touched.password ? errors.password : ''}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation!.navigate(HomeDrawerRouteList.forgotPassword, {
                      page,
                    })
                  }
                >
                  <Text style={[styles.text, styles.password]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputMargin, { marginTop: 20 }]}>
                <KwButton
                  color={colors.app.primary}
                  size="lg"
                  children="Signin"
                  rounded
                  disabled={!isValid}
                  onPress={handleSubmit}
                  isLoading={loading}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.inputMargin}>
          <KwButton
            outline
            color={colors.app.primary}
            onPress={() => {
              setPage(page === 1 ? 2 : 1);
            }}
            size="lg"
            rounded
            children={
              page === 1 ? 'Signin with phone number' : 'Signin with email'
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.sign}
        onPress={() => navigation!.navigate(HomeDrawerRouteList.register)}
      >
        <Text style={styles.text}>Don't have an Account?, Signin here.</Text>
      </TouchableOpacity>
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
interface LoginScreenProps {
  route: RouteProp<HomeDrawerParamList, typeof HomeDrawerRouteList.login>;
  navigation: StackNavigationProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.login
  >;
}

export default LoginScreen;
