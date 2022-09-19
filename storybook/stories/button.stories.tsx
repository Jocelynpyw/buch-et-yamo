import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { KwButton } from '@KwComponents/button';
import { colors } from '@KwUtils/colors';
import { View } from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import { BufferView } from './decorators';

storiesOf('Button', module)
  .addDecorator(BufferView)
  .add('Primary', () => (
    <View>
      <KwButton
        onPress={action('tapped-default')}
        size="sm"
        color={colors.app.primary}
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="md"
        color={colors.app.primary}
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="lg"
        color={colors.app.primary}
        children="Click me"
      />
    </View>
  ))
  .add('Outline', () => (
    <View>
      <KwButton
        onPress={action('tapped-default')}
        size="sm"
        color={colors.app.primary}
        outline
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="md"
        color={colors.app.primary}
        outline
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="lg"
        color={colors.app.primary}
        outline
        children="Click me"
      />
    </View>
  ))
  .add('Rounded', () => (
    <View>
      <KwButton
        onPress={action('tapped-default')}
        size="sm"
        color={colors.app.primary}
        rounded
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="md"
        color={colors.app.primary}
        rounded
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="lg"
        color={colors.app.primary}
        rounded
        children="Click me"
      />

      <KwButton
        onPress={action('tapped-default')}
        size="sm"
        color={colors.app.primary}
        outline
        rounded
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="md"
        color={colors.app.primary}
        outline
        rounded
        children="Click me"
      />
      <KwButton
        onPress={action('tapped-default')}
        size="lg"
        color={colors.app.primary}
        outline
        rounded
        children="Click me"
      />
    </View>
  ))
  .add('Disabled', () => (
    <KwButton
      onPress={action('tapped-default')}
      size="md"
      color={colors.app.primary}
      children="Click me"
      disabled
      rounded
    />
  ))
  .add('Text', () => (
    <View>
      <KwButton
        onPress={action('tapped-default')}
        textColor={colors.app.primary}
        children="Click me"
      />
    </View>
  ))
  .add('Icon', () => (
    <View>
      <KwButton
        onPress={action('tapped-default')}
        children="Click me"
        size="md"
        iconButton
        textStyle={{
          fontSize: 14,
        }}
        icon={
          <KwIcon
            name="right_arrow"
            fill={colors.app.white}
            stroke="none"
            width="60"
            height="60"
            viewBox="0 -15 7 40"
          />
        }
        color={colors.app.primary}
        tintColor={colors.app.white}
      />
      <KwButton
        onPress={action('tapped-default')}
        icon={
          <KwIcon
            name="right_arrow"
            fill={colors.app.white}
            stroke="none"
            width="60"
            height="60"
            viewBox="0 -12 16 40"
          />
        }
        color="gray"
        tintColor={colors.app.white}
      />
      <KwButton
        onPress={action('tapped-default')}
        icon={
          <KwIcon
            name="telegram"
            fill={colors.app.white}
            stroke="none"
            width="60"
            height="60"
            viewBox="0 -12 16 45"
          />
        }
        color="gray"
        tintColor={colors.app.white}
      />
      <KwButton
        onPress={action('tapped-default')}
        icon={
          <KwIcon
            name="home"
            fill={colors.app.black}
            stroke="none"
            width="60"
            height="60"
            viewBox="2 -12 10 40"
          />
        }
        tintColor="gray"
      />
    </View>
  ));
