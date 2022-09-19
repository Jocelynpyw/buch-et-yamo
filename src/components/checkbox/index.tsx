import { colors, fontsizes } from '@KwSrc/utils';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageStyle,
} from 'react-native';

import React, { FunctionComponent, useState, useEffect } from 'react';

import KwIcon from '../Icon';

interface Props {
  onPress?(value: ISate): void;
  state?: ISate;
  value?: string;
  checked?: boolean;
  color?: string;
  label?: string;
  key?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  image?: boolean;
  imageUrl?: string;
  imageStyle?: ImageStyle;
  border?: boolean;
  rounded?: boolean;
  error?: string | undefined;
}

export interface ISate {
  value: string;
  checked: boolean;
}

/**
 * AnCheckBox used for component

 *
 */

const KwCheckbox: FunctionComponent<Props> = ({
  onPress = () => {},
  label = '',
  color = colors.app.primary,
  border = false,
  rounded = false,
  labelLeft = false,
  labelRight = false,
  image = false,
  imageUrl = '',
  imageStyle,
  value = '',
  checked = false,
  error,
}) => {
  const [internalState, setInternalState] = useState({
    value,
    checked,
  });

  useEffect(() => {
    // onPress(internalState);
    setInternalState({ value, checked });
  }, [checked, value]);

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="transparent"
        onPress={() => {
          const newState = {
            value: internalState.value,
            checked: !internalState.checked,
          };
          setInternalState(newState);
          onPress(newState);
        }}
        style={styles.container}
      >
        <View style={[styles.row, labelLeft && styles.justifyItem]}>
          {labelLeft && <Text style={styles.label}>{label}</Text>}

          <View
            style={[
              styles.checkboxContainer,
              rounded && styles.rounded,
              internalState.checked && checkedSytle(color).checked,
              border && internalState.checked && borderStyle(color).border,
            ]}
          >
            {internalState.checked && (
              <KwIcon
                name="check"
                fill="none"
                stroke={colors.app.white}
                width="12"
                height="12"
                viewBox="-2 0 7 5"
              />
            )}
          </View>
          {image && (
            <Image
              style={imageStyle!}
              source={{ uri: imageUrl }}
              resizeMode="contain"
            />
          )}
          {labelRight && <Text style={styles.label}>{label}</Text>}
        </View>
      </TouchableHighlight>
      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{`*${error}`}</Text>
        </View>
      )}
    </View>
  );
};

export default KwCheckbox;

const checkedSytle = (color: string) =>
  StyleSheet.create({
    checked: {
      backgroundColor: color,
    },
  });

const borderStyle = (color: string) =>
  StyleSheet.create({
    border: {
      borderColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.app.backgroundGrey,
    height: 18,
    width: 18,
    margin: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.app.quaternaryGrey,
  },
  rounded: {
    borderRadius: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  justifyItem: { justifyContent: 'space-between' },
  errorBox: {
    width: '100%',
    marginTop: 10,
  },
  errorText: {
    color: colors.app.danger,
    fontSize: 11,
  },
  label: {
    fontFamily: fontsizes.FONTS.robotoBody3.fontFamily,
  },
});
