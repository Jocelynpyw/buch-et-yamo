import { colors } from '@KwSrc/utils/colors';
import React, { FunctionComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  View,
  ActivityIndicator,
} from 'react-native';

export interface Ibutton {
  onPress?(): void;
  children?: string | Element;
  icon?: Element;
  outline?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  color?: string; // Color of the button or the background of the icon Button
  rounded?: boolean;
  tintColor?: string; // Color of the icon : for icon Button
  textColor?: string; // Color of the text : For text button only
  preButtonText?: string; // Text in front of the button : For text button only
  nextButtonText?: string; // Text behin the button : For text button only
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: ViewStyle; // Size of the button
  textStyle?: TextStyle;
  iconButton?: boolean;
  iconButtonLeft?: boolean;
  iconButtonRight?: boolean;
}

export const KwButton: FunctionComponent<Ibutton> = (button: Ibutton) => {
  const {
    onPress = () => {},
    outline = false,
    disabled = false,
    rounded = false,
    size = 'md',
    iconButton = false,
    iconButtonLeft,
    iconButtonRight,
  } = button;

  let scale = 8;
  let textSize = 14;
  if (size === 'xs') {
    scale = 4;
    textSize = 8;
  }
  if (size === 'sm') {
    scale = 6;
    textSize = 12;
  }
  if (size === 'lg') {
    scale = 14;
    textSize = 16;
  }

  const buttonStyle: ViewStyle = {
    backgroundColor: outline ? 'transparent' : button.color,
    paddingVertical: scale * 1,
    paddingHorizontal: scale * 0.9,
    borderColor: outline ? button.color : 'transparent',
    borderWidth: 1,
    borderRadius: rounded ? 30 : 8,
  };

  const textStyles: TextStyle = {
    color: outline
      ? button.color
      : button.textColor
      ? button.textColor
      : colors.app.white,
    alignSelf: button.textColor ? undefined : 'center',
    fontSize: button.textStyle ? undefined : textSize,
  };

  const buttonIconStyles: ViewStyle = {
    // marginBottom: 20, // Only for test
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: button.color ? button.color : 'transparent',
  };

  const iconButtonStyles: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonTextContainerStyles: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  if (iconButton) {
    return (
      <View
        style={[
          button.textColor ? buttonTextContainerStyles : {},
          button.style,
        ]}
      >
        <TouchableOpacity
          disabled={button.isLoading || disabled}
          onPress={onPress}
          style={
            button.children
              ? button.textColor
                ? {}
                : buttonStyle
              : buttonIconStyles
          }
        >
          {button.isLoading ? (
            <ActivityIndicator
              style={{ transform: [{ scale: scale / 10 }] }}
              color={button.textColor}
            />
          ) : (
            <View style={iconButtonStyles}>
              {iconButtonLeft && <View>{button.icon}</View>}

              <Text style={[textStyles, button.textStyle]}>
                {button.children}
              </Text>

              {iconButtonRight && <View>{button.icon}</View>}
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[button.textColor ? buttonTextContainerStyles : {}, button.style]}
    >
      {/* The button is a text button */}

      {button.textColor && (
        <Text style={button.textStyle}>
          {button.preButtonText && button.preButtonText}

          <TouchableOpacity
            disabled={button.isLoading || disabled}
            onPress={onPress}
          >
            {button.isLoading ? (
              <ActivityIndicator
                style={{ transform: [{ scale: scale / 10 }] }}
                color={button.textColor}
              />
            ) : (
              <Text style={[textStyles, button.textStyle]}>
                {button.children}
              </Text>
            )}
          </TouchableOpacity>

          {button.nextButtonText && button.nextButtonText}
        </Text>
      )}

      {/* The button is a normal button */}

      {!button.textColor && (
        <TouchableOpacity
          disabled={button.isLoading || disabled}
          onPress={onPress}
          style={
            button.children
              ? button.textColor
                ? {}
                : buttonStyle
              : buttonIconStyles
          }
        >
          {button.icon}

          {button.isLoading && (
            <ActivityIndicator
              style={{ transform: [{ scale: scale / 10 }] }}
              color={colors.app.white}
            />
          )}

          {button.children && !button.isLoading && (
            <Text style={[textStyles, button.textStyle]}>
              {button.children}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
