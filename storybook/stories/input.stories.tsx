import React from 'react';
import { storiesOf } from '@storybook/react-native';
import KwDefaultInput from '@KwComponents/defaultInput';
import KwPhoneInput from '@KwComponents/phoneInput';
import { colors } from '@KwUtils/colors';
import { View } from 'react-native';

storiesOf('Inputs', module)
  .add('default', () => (
    <View>
      <KwDefaultInput
        secureTextEntry
        errorText="This is an error"
        keyboardType="default"
        placeholder="passeword"
        placeholderTextColor={colors.text.tertiaryGrey}
        backgroundColor={colors.app.white}
        borderColor={colors.app.primary}
      />
      <KwDefaultInput
        secureTextEntry
        errorText="This is an error"
        keyboardType="default"
        placeholder="passeword"
        placeholderTextColor={colors.text.tertiaryGrey}
        backgroundColor={colors.app.white}
        borderColor={colors.app.grey}
      />
      <KwDefaultInput
        prependIcon="search"
        secureTextEntry
        errorText="This is an error"
        keyboardType="default"
        placeholder="Search"
        placeholderTextColor={colors.text.tertiaryGrey}
        borderColor={colors.app.secondaryGrey}
        backgroundColor={colors.app.secondaryGrey}
      />
    </View>
  ))
  .add('Phone', () => (
    <View>
      <KwPhoneInput name="test" />
    </View>
  ))
  .add('Picker', () => (
    <View>
      {/* <Picker selectedItem={category} onSelectedItem={item => setCategory(item)}  placeholder='Category' items={categories} /> */}
    </View>
  ));
