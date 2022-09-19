import { colors } from '@KwSrc/utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IpickerItem {
  label?: string;
  onPress(): void;
}

export default function KwPickerItem(props: IpickerItem) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: colors.text.primary,
  },
});
