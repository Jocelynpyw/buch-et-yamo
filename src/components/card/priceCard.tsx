import { selectAppSettings } from '@KwSrc/store/reducers/app';
import { colors } from '@KwSrc/utils/colors';
import React, { FunctionComponent, useMemo } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';

const KwPriceCard: FunctionComponent<ListItemProps> = ({
  price,

  time,
  color,
  ...props
}) => {
  const settings: any = useSelector(selectAppSettings);

  const [count, period] = useMemo(() => {
    if (time.days) {
      return [time.days, 'Day'];
    }

    if (time.months) {
      return [time.months, 'Month'];
    }

    if (time.years) {
      return [time.years, 'Year'];
    }

    return [0, ''];
  }, [time]);

  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(
          `whatsapp://send?phone=${
            settings?.phones.correction[0]
          }&text=${'Hello Sir, i will like to buy corrections'}`,
        );
      }}
      style={[styles.container, props.style]}
    >
      <View style={[styles.priceround, { backgroundColor: color }]}>
        <Text style={styles.number}>{count}</Text>
        <Text style={styles.time}>{period + (count > 1 ? 's' : '')}</Text>
      </View>
      <Text style={styles.title}>
        {new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'XAF',
        }).format(price || 0)}
      </Text>
    </TouchableOpacity>
  );
};

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
  price?: number;
  number?: number;
  time?: any;
  color: string;
  isStarter?: boolean;
  onPress?: () => any;
}

export { KwPriceCard };
