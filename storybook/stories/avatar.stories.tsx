import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import KwAvatar from '@KwSrc/components/avatar';

import { BufferView } from './decorators';

storiesOf('Avatar', module)
  .addDecorator(BufferView)
  .add('Large', () => (
    <View>
      <KwAvatar src="https://via.placeholder.com/150" size="large" />
      <KwAvatar src="https://via.placeholder.com/150" size="large" />
      <KwAvatar src="https://via.placeholder.com/150" size="large" />
    </View>
  ))
  .add('Medium', () => (
    <View>
      <KwAvatar src="https://via.placeholder.com/150" size="medium" />
      <KwAvatar src="https://via.placeholder.com/150" size="medium" />
      <KwAvatar src="https://via.placeholder.com/150" size="medium" />
    </View>
  ))
  .add('Small', () => (
    <View>
      <KwAvatar src="https://via.placeholder.com/150" size="small" />
      <KwAvatar src="https://via.placeholder.com/150" size="small" />
      <KwAvatar src="https://via.placeholder.com/150" size="small" />
    </View>
  ))
  .add('Custom Size', () => (
    <View>
      <KwAvatar src="https://via.placeholder.com/150" style={styles.small} />
      <KwAvatar src="https://via.placeholder.com/150" style={styles.medium} />
      <KwAvatar src="https://via.placeholder.com/150" style={styles.large} />
    </View>
  ));

const styles = StyleSheet.create({
  small: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  medium: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  large: {
    height: 120,
    width: 120,
    borderRadius: 120,
  },
});
