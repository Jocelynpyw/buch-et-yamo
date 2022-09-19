import { KwButton } from '@KwSrc/components/button';
import KwCheckbox from '@KwSrc/components/checkbox';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import KwPhoneInput from '@KwSrc/components/phoneInput';
import {
  HomeDrawerParamList,
  HomeDrawerRouteList,
} from '@KwSrc/navigation/constants.navigation';
import { ToastService } from '@KwSrc/services';
import { AuthSignInAction } from '@KwSrc/store/actions';
import { colors, images } from '@KwSrc/utils';
import { convertHexToRGB } from '@KwSrc/utils/colors';
import { signupWithEmailSchema } from '@KwSrc/utils/schemas';
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

interface signUpEmail {
  email: string;
  password: string;
  username: string;
  phone: string;
}

const RegisterScreen: FunctionComponent<RegisterScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmitSignUp = (values: signUpEmail) => {
    setLoading(true);
    axios({
      method: 'POST',
      url: '/auth/sign-up',
      data: {
        username: values.username,
        name: values.username,
        phone: values.phone,
        email: values.email.toLocaleLowerCase(),
        password: values.password,
      },
    })
      .then((res) => {
        dispatch(AuthSignInAction(res.data));
        setLoading(false);
        ToastService.showToast({
          message: 'SignUp with success',
          type: 'success',
          duration: 3500,
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
          source={images.registerImage}
        />
      </View>

      <View style={styles.containMargin}>
        <Text style={styles.accountTitle}>Create a New Account</Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod .
        </Text>
        <Formik
          validationSchema={signupWithEmailSchema}
          initialValues={{
            username: '',
            email: '',
            password: '',
            phone: '',
          }}
          onSubmit={(values: signUpEmail) => {
            handleSubmitSignUp(values);
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
              <View style={styles.inputMargin}>
                <KwDefaultInput
                  prependIcon="users"
                  styles={styles.input}
                  placeholder="Username"
                  numberOfLines={2}
                  multiline
                  borderColor={colors.app.white}
                  onBlur={(name: string) => setFieldTouched(name, true)}
                  errorText={touched.username ? errors.username : ''}
                  keyboardType="email-address"
                  value={values.username}
                  name="username"
                  onChangeText={(name: string, val) => {
                    setFieldValue(name, val, true);
                  }}
                />
              </View>
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
              </View>

              <View style={styles.checkBox}>
                <KwCheckbox />
                <Text>I agree to the Terms of Service and Privacy Policy</Text>
              </View>

              <View>
                <KwButton
                  color={colors.app.primary}
                  size="lg"
                  children="Creat Account"
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
      <TouchableOpacity
        onPress={() => navigation!.navigate(HomeDrawerRouteList.login)}
        style={styles.sign}
      >
        <Text style={styles.text}>I have an Account?, Sign in here.</Text>
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
    color: colors.text.black,
  },
  subTitle: {
    marginVertical: 5,
    color: `${convertHexToRGB(colors.text.black, '0.7')}`,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  inputMargin: { marginVertical: 15 },
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
  sign: { marginTop: 10, marginBottom: 30, justifyContent: 'center' },
  text: { color: `${convertHexToRGB(colors.text.black, '0.7')}` },
});

interface RegisterScreenProps {
  route: RouteProp<HomeDrawerParamList, typeof HomeDrawerRouteList.register>;
  navigation: StackNavigationProp<
    HomeDrawerParamList,
    typeof HomeDrawerRouteList.register
  >;
}

export default RegisterScreen;
