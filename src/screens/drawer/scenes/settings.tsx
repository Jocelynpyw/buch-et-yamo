import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@KwSrc/utils';
import KwHearder from '@KwSrc/components/header';
import { signupWithEmailSchema } from '@KwSrc/utils/schemas';
import { Formik } from 'formik';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import KwPhoneInput from '@KwSrc/components/phoneInput';
import { KwButton } from '@KwSrc/components/button';
import KwAvatar from '@KwSrc/components/avatar';
import KwIcon from '@KwSrc/components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerStyle}>
        <KwHearder
          back
          title="My settings"
          avatar="https://via.placeholder.com/150"
        />
        <View style={styles.fet}>
          <View>
            <TouchableOpacity>
              <KwAvatar size="medium" src="https://via.placeholder.com/150" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headername}>Stanly Medjo</Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.yourDetails}>Your Details</Text>
        <View
          style={{
            alignContent: 'center',
            backgroundColor: colors.app.white,
            padding: 20,
          }}
        >
          <Formik
            validationSchema={signupWithEmailSchema}
            initialValues={{
              username: '',
              email: '',
              password: '',
              phone: '',
            }}
            onSubmit={(values: any) => {}}
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
                    keyboardType="default"
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

                <View style={{ paddingHorizontal: 20, marginTop: 20 }}></View>
              </View>
            )}
          </Formik>
        </View>
        <Text style={styles.other}>Other Details</Text>

        <View style={styles.otherSetting}>
          <Formik
            validationSchema={signupWithEmailSchema}
            initialValues={{
              username: '',
              email: '',
              password: '',
              phone: '',
            }}
            onSubmit={(values: any) => {}}
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
                    placeholder="School"
                    numberOfLines={2}
                    multiline
                    borderColor={colors.app.white}
                    onBlur={(name: string) => setFieldTouched(name, true)}
                    errorText={touched.username ? errors.username : ''}
                    keyboardType="default"
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
                    placeholder="Form"
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
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.app.white,
  },
  headerStyle: {
    backgroundColor: colors.app.primary,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    maringBottom: 20,
    paddingBottom: 10,
  },
  headerComponnentView: {
    padding: '3%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yourDetailsContainerItemBox: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.app.white,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.app.backgroundGrey_1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5.62,
    elevation: 1,
  },
  yourDetailsContainerItemBoxImageView: {
    width: '20%',
    display: 'flex',
  },
  inputMargin: { marginVertical: 2 },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.app.borderInputColor,
  },
  inputPhone: { marginVertical: 5, marginBottom: 15 },
  headername: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: colors.app.white,
  },
  details: {
    marginTop: 10,
    alignContent: 'center',
  },
  yourDetails: {
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  other: {
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  otherSetting: {
    alignContent: 'center',
    backgroundColor: colors.app.white,
    padding: 20,
  },
  fet: { alignSelf: 'center' },
});
