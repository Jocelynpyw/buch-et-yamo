import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import KwIcon from '../Icon';

const KwAlertCard: FunctionComponent<ListItemProps> = ({
  description,

  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <KwIcon name="alertStar" width="40" height="40" viewBox="0 0 40 40" />
    <View style={styles.mainContent}>
      <View style={styles.titleDescription}>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{description}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: colors.app.white,
    borderRadius: 10,
    backgroundColor: 'rgba(77, 118, 193, 0.17)',

    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleDescription: {
    flexShrink: 1, // fixes overflow on text exceeding view
  },
  bookImage: { height: 90, width: 90, marginRight: 10, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 18 },
  authorContainer: { flexDirection: 'row' },
  author: {
    fontSize: 14,
    marginVertical: 5,
    color: colors.text.black,
    paddingHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.app.primary,
  },
  pricePadding: { padding: 2 },
  ava: { color: colors.text.copiesColors, margin: 2 },
  clock: { flexDirection: 'row' },
  time: {
    fontSize: 12,
    color: colors.app.primary,
    alignSelf: 'center',
  },
});

interface ListItemProps {
  description?: Element | string;
  style?: ViewStyle;

  onPress?: () => any;
}

export { KwAlertCard };
