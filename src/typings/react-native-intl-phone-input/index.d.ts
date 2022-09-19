declare module 'react-native-intl-phone-input' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export interface OnChangeTextArg {
    dialCode: string;
    phoneNumber: string;
    isVerified: boolean;
    unmaskedPhoneNumber: string;
  }
  interface IntlPhoneInputProps {
    lang?: string; //   Translate country name on modal
    placeholder?: string; //    This prop change the phone input placeholder
    defaultCountry?: string; // TR  You can change your default country code
    onChangeText?: (arg: OnChangeTextArg) => any; //    This function works when input text is changed
    customModal?: (
      modalVisible: boolean,
      countries: any[],
      onCountryChange: (...args: any) => any,
    ) => Element; //    Generate your custom modal
    phoneInputStyle?: TextStyle; //   This prop is about the text field's ReactNative.TextInput style
    containerStyle?: ViewStyle; //    This prop is about the text field's container style
    dialCodeTextStyle?: TextStyle; //
    flagStyle?: TextStyle; //
    renderAction?(): void;
    modalContainer?: ViewStyle; //    This prop is about the modal field's SafeAreaView style.
    filterInputStyle?: TextStyle; //    This prop is about the top of model filter text style
    closeButtonStyle?: TextStyle; //    This prop is about text style of bottom modal
    modalCountryItemCountryNameStyle?: TextStyle; //
    filterText?: string; // Filter  This is the text of placeholder input of top modal
    closeText?: string; //  CLOSE This prop is about the text of bottom modal
    disableCountryChange?: boolean; //  false This prop is about disable open select country modal
  }
  class IntlPhoneInput extends Component<IntlPhoneInputProps, any> {}
  export default IntlPhoneInput;
}
