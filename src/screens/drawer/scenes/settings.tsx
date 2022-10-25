import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@KwSrc/utils';
import KwHearder from '@KwSrc/components/header';
import { signupWithEmailSchema } from '@KwSrc/utils/schemas';
import { Formik } from 'formik';
import KwDefaultInput from '@KwSrc/components/defaultInput';
// import KwPhoneInput from '@KwSrc/components/phoneInput';
import { KwButton } from '@KwSrc/components/button';
import KwAvatar from '@KwSrc/components/avatar';
// import KwIcon from '@KwSrc/components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { MUTATION_MEDIA_UPLOAD_BY_FILE } from '@KwSrc/config/graphql/mutations';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import usePermissions from '@KwSrc/utils/permission';
import { ReactNativeFile } from 'apollo-upload-client';
import { ToastService } from '@KwSrc/services';
import { AuthSignInAction } from '@KwSrc/store/actions';

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [addImages] = useMutation(MUTATION_MEDIA_UPLOAD_BY_FILE, {
    onCompleted(data) {
      // console.log(data);

      updateValues(data.mediaUploadByFile.record._id);
    },
  });
  const auth = useSelector(selectAuth);
  // console.log('auth', auth);
  const dispatch = useDispatch();

  usePermissions();

  // console.log('auth', auth);
  const updateValues = (avatarId: string) => {
    const data: any = {
      avatarId,
    };
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'undefined' || data[key] === '') {
        delete data[key];
      }
    });

    setLoading(true);
    axios({
      url: '/auth/me',
      method: 'put',
      data,
      headers: {
        authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then(() => {
        setLoading(false);

        axios({
          url: '/auth/refresh-access-token',
          method: 'GET',

          headers: {
            'X-Auth': `${auth?.refreshToken}`,
          },
        }).then((res) => {
          ToastService.showToast({
            message: 'Profile picture updated',
            type: 'success',
          });
          setLoading(false);
          dispatch(AuthSignInAction(res.data));
        });
      })
      .catch(() => {
        setLoading(false);
        ToastService.showToast({
          message: 'Error when updating profile picture, please try again.',
          type: 'warning',
        });

        // console.log('err', err);
      });
  };

  const handleImagePicker = async () => {
    setLoading(true);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async (res: ImagePickerResponse) => {
      if (res.assets) {
        const file = new ReactNativeFile({
          uri: res.assets[0].uri!,
          type: res.assets[0].type!,
          name: res.assets[0].fileName!,
        });

        const UploadByFileMediaInput = {
          file,
          type: 'image',
          meta: 'kawlo profile picture',
          altText: 'upload kawlo profile',
          filename: res.assets[0].fileName!,
        };

        setLoading(true);

        await addImages({
          variables: {
            record: UploadByFileMediaInput,
          },
        });
      } else if (res.errorCode === 'permission') {
        // Ask for permission
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerStyle}>
        <KwHearder back title="My settings" />
        <View style={styles.fet}>
          <View>
            <TouchableOpacity>
              <KwAvatar size="medium" src={String(auth?.user?.avatar)} />
            </TouchableOpacity>
          </View>

          <View style={styles.headername}>
            <KwButton
              color={loading ? colors.app.primary : colors.app.white}
              onPress={async () => {
                await handleImagePicker();
              }}
              textStyle={{ color: colors.app.primary }}
              size={loading ? 'lg' : 'sm'}
              isLoading={loading}
              // rounded
              children="Change profile picture"
            />
          </View>
        </View>
      </View>
      <View style={styles.details}>
        {/* <Text style={styles.other}>Other Details</Text> */}

        {/* <View style={styles.otherSetting}>
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
        </View> */}
        <Text style={styles.yourDetails}>Your Details</Text>
        <View
          style={{
            alignContent: 'center',

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
            onSubmit={() => {}}
          >
            {({
              touched,
              setFieldTouched,

              errors,
            }) => (
              <View>
                <View style={styles.inputMargin}>
                  <KwDefaultInput
                    prependIcon="users"
                    styles={styles.input}
                    placeholder="Username"
                    numberOfLines={2}
                    multiline
                    onBlur={(name: string) => setFieldTouched(name, true)}
                    errorText={touched.username ? errors.username : ''}
                    keyboardType="default"
                    value={auth?.user?.username}
                    name="username"
                    borderColor="transparent"
                    editable={false}
                    backgroundColor="transparent"
                  />
                </View>
                <View style={styles.inputMargin}>
                  <KwDefaultInput
                    prependIcon="mail"
                    styles={styles.input}
                    placeholder="Email"
                    numberOfLines={2}
                    multiline
                    borderColor="transparent"
                    onBlur={(name: string) => setFieldTouched(name, true)}
                    errorText={touched.email ? errors.email : ''}
                    keyboardType="default"
                    value={auth?.user?.email}
                    name="email"
                    type="emailAddress"
                    editable={false}
                    backgroundColor="transparent"
                  />
                </View>
                <View style={styles.inputPhone}>
                  <Text style={{ color: colors.text.lightGrey }}>
                    Phone: {auth?.user?.phone}
                  </Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 20 }} />
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
  fet: { alignSelf: 'center', alignItems: 'center' },
});
