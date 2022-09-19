import { colors } from '@KwUtils/colors';
import React, { FunctionComponent } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  ViewStyle,
  View,
  Text,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  ColorValue,
  Image,
  ImageSourcePropType,
} from 'react-native';
import KwIcon from '../Icon';

interface Iinput {
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  onChangeText?(name: string, text: string): void;
  value?: string;
  borderColor?: string;
  backgroundColor?: string;
  styles?: ViewStyle;
  errorText?: string;
  secureTextEntry?: boolean;
  prependIcon?: string;
  prependImage?: ImageSourcePropType;
  placeholderTextColor?: ColorValue;
  editable?: boolean;
  onBlur?(
    name: string,
    event?: NativeSyntheticEvent<TextInputFocusEventData>,
  ): void;
  name?: string;
  multiline?: boolean;
  numberOfLines?: number;
  type?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
}

const KwDefaultInput: FunctionComponent<Iinput> = (input: Iinput) => {
  const {
    placeholder = '',
    value,
    errorText = '',
    secureTextEntry = false,
    backgroundColor = colors.app.white,
    onChangeText = () => {},
    onBlur = () => {},
    name = '',
    type = 'none',
    editable = true,
    multiline = false,
    numberOfLines = 1,
  } = input;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    defaultInputContainer: {
      borderRadius: 10,
      flexDirection: 'row',
      width: '100%',
      height: 45,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 10,
      backgroundColor,
      fontSize: 18,
      borderWidth: 1,
      borderColor: input.borderColor ? input.borderColor : undefined,
    },
    input: {
      flex: 1,
    },
    error: {
      color: colors.app.danger,
      alignSelf: 'flex-start',
      marginLeft: 25,
    },
    image: {
      width: 40,
      height: 40,
      marginEnd: 5,
    },
  });

  return (
    <View style={[styles.container, input.styles]}>
      <View style={styles.defaultInputContainer}>
        {input.prependIcon && (
          <KwIcon
            name={input.prependIcon}
            width="30"
            height="30"
            fill="none"
            stroke={colors.app.secondaryGrey}
            viewBox="0 0 30 5"
          />
        )}
        <TextInput
          editable={editable}
          style={styles.input}
          keyboardType={input.keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={(text) => onChangeText(name, text)}
          placeholder={placeholder}
          placeholderTextColor={input.placeholderTextColor}
          textContentType={type}
          onBlur={(e) => onBlur(name, e)}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
        {input.prependImage && (
          <Image style={styles.image} source={input.prependImage} />
        )}
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : <View />}
    </View>
  );
};

export default KwDefaultInput;
