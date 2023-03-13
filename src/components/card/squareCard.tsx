import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';

const KwSquareCard: FunctionComponent<ListItemProps> = ({
  title,
  description,
  uri,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <Image resizeMode="contain" style={styles.image} source={uri} />
    <Text style={styles.title}>{title}</Text>

    {description !== null && <Text style={styles.desc}>{description}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderColor: colors.app.white,
    borderRadius: 10,
    backgroundColor: colors.app.white,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginVertical: 3,
    alignItems: 'center',
    elevation: 5,
  },
  image: { width: 40, height: 40 },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 2,
    flexShrink: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  desc: {
    marginVertical: 5,
    color: colors.app.lightBlue,
    fontWeight: '300',
  },
});

interface ListItemProps {
  uri: ImageSourcePropType;
  title?: Element | string;
  description?: null | string;
  style?: ViewStyle;
  onPress?: () => any;
}

export { KwSquareCard };
