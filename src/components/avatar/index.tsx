import React from 'react';
import { Image, ImageStyle, StyleSheet, View } from 'react-native';

import { colors } from '@KwUtils/colors';

interface AvatarProps {
  src: string;
  size?: 'large' | 'medium' | 'small';
  style?: ImageStyle | ImageStyle[];
  notification?: boolean;
  type?: boolean;
}

const KwAvatar = ({ size, src, style, type = false }: AvatarProps) => {
  const containerStyles = [styles.avatarSmall];

  if (size === 'large') {
    containerStyles.push(styles.avatarLarge);
  }

  if (size === 'medium') {
    containerStyles.push(styles.avatarMedium);
  }
  if (size === 'small') {
    containerStyles.push(styles.avatarSmall);
  }
  if (type) {
    containerStyles.push(styles.avatarSquare);
  }

  return (
    <View style={styles.avatarContainer}>
      <Image source={{ uri: src }} style={[containerStyles, style]} />
    </View>
  );
};
export default KwAvatar;

const styles = StyleSheet.create({
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.app.secondary,
  },
  avatarMedium: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.app.secondary,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: colors.app.secondary,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSquare: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.app.secondary,
  },
});
