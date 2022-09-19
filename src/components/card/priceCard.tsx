import { colors } from '@KwSrc/utils/colors';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const KwPriceCard: FunctionComponent<ListItemProps> = ({
  price,
  number,
  time,
  color,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <View style={[styles.priceround, { backgroundColor: color }]}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
    <Text style={styles.title}>{price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // borderColor: colors.app.white,
    borderRadius: 10,
    backgroundColor: colors.app.white,
    // borderBottomWidth: 1,
    width: '48%',

    marginVertical: 3,
    alignItems: 'center',
  },
  image: { width: 60, height: 60 },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 2,
    color: colors.text.white,
    marginTop: 10,
  },
  desc: {
    marginVertical: 5,
    color: colors.app.lightBlue,
    fontWeight: '300',
  },
  priceround: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.app.white,
  },
  time: { fontSize: 14, fontWeight: 'bold', color: colors.app.white },
});

interface ListItemProps {
  title?: Element | string;
  description?: Element | string;
  style?: ViewStyle;
  price?: string;
  number?: number;
  time?: string;
  color: string;
  onPress?: () => any;
}

export { KwPriceCard };
