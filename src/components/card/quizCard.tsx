import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';

const KwQuizCard: FunctionComponent<ListItemProps> = ({
  title,

  uri,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <Image resizeMode="contain" style={styles.image} source={uri} />
    <Text style={[styles.title, props.titleStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: colors.app.white,
    borderRadius: 10,
    backgroundColor: colors.app.white,
    borderBottomWidth: 1,

    marginVertical: 3,
    alignItems: 'center',
    zIndex: 999,
    elevation: 5,
  },
  image: { width: 60, height: 60 },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
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
  title?: string;
  style?: ViewStyle[] | ViewStyle;
  titleStyle?: TextStyle;
  onPress?: () => any;
}

export { KwQuizCard };
