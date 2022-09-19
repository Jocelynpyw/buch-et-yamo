import { colors } from '@KwSrc/utils';
import i18n from '@KwSrc/config/i18n/i18n';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import KwAvatar from '../avatar';
import KwIcon from '../Icon';

const KwListItemQuiz: FunctionComponent<ListItemProps> = ({
  uri,
  title,
  number,
  time,
  color,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <View style={styles.polygonmargin}>
      <Text style={[styles.polygon, {}]}>{number}</Text>

      <KwIcon
        name="polygon"
        width="70"
        height="70"
        viewBox="0 -5 40 50"
        fill={color || colors.app.primary}
      />
    </View>

    <View style={styles.mainContent}>
      <KwAvatar type src={uri} />
      <View style={styles.titleDescription}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.authorContainer}>
          <Text style={styles.author}>
            {i18n.t('COMPONENT__LISTITEMQUIZ_PLAYED')} {time}{' '}
            {i18n.t('COMPONENT__LISTITEMQUIZ_TIMES')}
          </Text>
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
    borderRadius: 12,
    backgroundColor: colors.app.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 3,
    alignItems: 'center',
  },
  polygonmargin: { marginHorizontal: 10 },
  polygon: {
    fontSize: 20,
    fontWeight: '900',
    position: 'absolute',
    zIndex: 9999,
    top: '29%',
    left: '34%',
    color: colors.app.white,
  },
  mainContent: {
    borderLeftColor: colors.app.greyLight,
    borderLeftWidth: 0.5,
    paddingLeft: 20,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleDescription: {
    flexShrink: 1, // fixes overflow on text exceeding view
    marginLeft: 10,
  },
  bookImage: { height: 90, width: 90, marginRight: 10, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  authorContainer: { flexDirection: 'row' },
  author: { fontSize: 12, marginVertical: 2, color: colors.text.lightGray },
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
  uri: string;
  title?: Element | string;
  time?: string;
  style?: ViewStyle;
  width?: number;
  height?: number;
  number?: string | number;
  color?: string;
  onPress?: () => any;
}

export { KwListItemQuiz };
