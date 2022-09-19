import { colors } from '@KwUtils/colors';
import React, { useState, FunctionComponent } from 'react';

import { StyleSheet, View, Text, ViewStyle } from 'react-native';

import IntlPhoneInput from 'react-native-intl-phone-input';
import i18n from '@KwSrc/config/i18n/i18n';
import PrIcon from '../Icon';

interface Iinput {
  styles?: ViewStyle;
  errorText?: string;
  onChange?(name: string, text: string): void;
  onVerify?: (verified: boolean) => void;
  name: string;
  border?: boolean;
}

export interface OnChangeTextArg {
  dialCode: string;
  phoneNumber: string;
  isVerified: boolean;
  unmaskedPhoneNumber: string;
}

const KwPhoneInput: FunctionComponent<Iinput> = (input: Iinput) => {
  const [isVerified, setIsVerified] = useState(false);

  const { errorText = '', onChange = () => {}, name = '', onVerify } = input;

  const onChangeText = (args: OnChangeTextArg) => {
    setIsVerified(args.isVerified);

    onChange(
      name,
      `${args.dialCode.replace('+', '')}#${args.unmaskedPhoneNumber}`,
    );

    if (onVerify) {
      onVerify(args.isVerified);
    }
  };

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      height: 50,
      flexDirection: 'column',
    },
    phoneInputContainer: {
      borderRadius: 25,
      width: '100%',
      height: 55,
      // paddingHorizontal: 25,
      backgroundColor: colors.app.white,
    },
    phoneInputStyle: {
      color: colors.text.primary,
    },
    dialCodeTextStyle: {
      paddingLeft: 10,
      borderLeftWidth: 1,
      marginLeft: 10,
      paddingBottom: 1,
      color: colors.text.primary,
      borderLeftColor: '#959ABF',
    },
    flagStyle: {
      fontSize: 18,
    },
    modalCountryItemCountryNameStyle: {
      color: colors.text.primary,
    },
    error: {
      color: colors.app.danger,
      alignSelf: 'flex-start',
      marginLeft: 25,
    },
    icon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    border: {
      borderWidth: 1,
      borderColor: colors.app.borderColor,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={input.styles}>
        <IntlPhoneInput
          flagStyle={styles.flagStyle}
          containerStyle={styles.phoneInputContainer}
          dialCodeTextStyle={styles.dialCodeTextStyle}
          phoneInputStyle={styles.phoneInputStyle}
          modalCountryItemCountryNameStyle={
            styles.modalCountryItemCountryNameStyle
          }
          placeholder={i18n.t('COMPONENT__PHONE_INPUT_PLACEHOLDER_TEXT')}
          onChangeText={onChangeText}
          defaultCountry="CM"
          renderAction={() =>
            isVerified && (
              <PrIcon
                style={styles.icon}
                name="checkGreen"
                width="30"
                height="30"
                viewBox="-8 -4 20 20"
              />
            )
          }
        />
      </View>
      <Text style={styles.error}>{errorText}</Text>
    </View>
  );
};

export default KwPhoneInput;
