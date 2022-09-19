import { KwButton } from '@KwSrc/components/button';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import {
  HomeDrawerParamList,
  HomeDrawerRouteList,
} from '@KwSrc/navigation/constants.navigation';
import { ToastService } from '@KwSrc/services';
import { AuthSignInAction } from '@KwSrc/store/actions';
import { colors, images } from '@KwSrc/utils';
import { convertHexToRGB } from '@KwSrc/utils/colors';
import { resetPasswordSchema } from '@KwSrc/utils/schemas';
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
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

interface ResetPassword {
  code: string;
  password: string;
}

const ResetPasswordScreen: FunctionComponent<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { method, value } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmitReset = (code: string, password: string) => {
    setLoading(true);

    axios({
      method: 'POST',
      url: '/auth/verify-and-reset-password',
      data: {
        value,
        method,
        code,
        password,
        _stale_: 0,
      },
    })
      .then((res) => {
        setLoading(false);

        dispatch(AuthSignInAction(res.data));
        ToastService.showToast({
          message: 'You has been reset successfuly',
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
          source={images.forgotImage}
        />
      </View>

      <View style={styles.containMargin}>
        <Text style={styles.accountTitle}>Reset Password</Text>
        <Text style={styles.subTitle}>
          Enter de code you receive by sms or email and your new password
        </Text>

        <Formik
          validationSchema={resetPasswordSchema}
          initialValues={{
            code: '',
            password: '',
          }}
          onSubmit={(values: ResetPassword) => {
            handleSubmitReset(values.code, values.password);
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
              <View>
                <View style={styles.inputMargin}>
                  <KwDefaultInput
                    prependIcon="key"
                    styles={styles.input}
                    placeholder="Code"
                    numberOfLines={1}
                    multiline
                    borderColor={colors.app.white}
                    onBlur={(name: string) => setFieldTouched(name, true)}
                    errorText={touched.code ? errors.code : ''}
                    keyboardType="numeric"
                    value={values.code}
                    name="code"
                    type="none"
                    onChangeText={(name: string, val) => {
                      setFieldValue(name, val, true);
                    }}
                  />
                  <KwDefaultInput
                    prependIcon="lock"
                    styles={styles.input}
                    placeholder="New password"
                    numberOfLines={1}
                    multiline
                    borderColor={colors.app.white}
                    onBlur={(name: string) => setFieldTouched(name, true)}
                    errorText={touched.password ? errors.password : ''}
                    keyboardType="default"
                    value={values.password}
                    name="password"
                    type="password"
                    onChangeText={(name: string, val) => {
                      setFieldValue(name, val, true);
                    }}
                  />
                </View>
              </View>
              <View style={[styles.inputMargin, { marginTop: 20 }]}>
                <KwButton
                  color={colors.app.primary}
                  size="lg"
                  children="Reset Password"
                  rounded
                  disabled={!isValid}
                  onPress={handleSubmit}
                  isLoading={loading}
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
interface ResetPasswordScreenProps {
  route: RouteProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.ResetPassword
  >;
  navigation: StackNavigationProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.ResetPassword
  >;
}

export default ResetPasswordScreen;
