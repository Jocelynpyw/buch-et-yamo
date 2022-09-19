import { colors } from '@KwSrc/utils';
import i18n from '@KwSrc/config/i18n/i18n';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { KwButton } from '../button';
import KwIcon from '../Icon';

const KwListItemSimple: FunctionComponent<ListItemProps> = ({
  uri,
  title,
  description,
  time,
  width = 30,
  height = 30,
  number = 0,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <View style={styles.mainContent}>
      <Image
        resizeMode="contain"
        style={[
          styles.bookImage,
          {
            width,
            height,
          },
        ]}
        source={uri}
      />
      <View style={styles.titleDescription}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {description && (
          <View style={styles.authorContainer}>
            <Text numberOfLines={2} style={styles.author}>
              {description}
            </Text>
          </View>
        )}

        {time && number && (
          <View style={styles.priceContainer}>
            <KwButton
              disabled
              style={styles.pricePadding}
              color={colors.app.backgroundCopies}
              size="sm"
            >
              <Text style={styles.ava}>
                {number} {i18n.t('COMMON__QUESTION')}(s)
              </Text>
            </KwButton>

            <View style={styles.clock}>
              <KwIcon
                name="clock_blue"
                width="30"
                height="30"
                viewBox="0 -6 25 25"
                fill={colors.app.black}
              />
              <Text style={styles.time}>
                {time} {i18n.t('COMMON__MINS')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
    <KwIcon
      name="chevron_right"
      width="30"
      height="30"
      viewBox="-5 -5 20 20"
      stroke={colors.app.black}
      fill="none"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderColor: colors.app.white,
    borderRadius: 10,
    backgroundColor: colors.app.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    alignItems: 'center',
    alignContent: 'center',
    // alignSelf: 'center'
  },
  mainContent: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleDescription: {
    flexShrink: 1, // fixes overflow on text exceeding view
  },
  bookImage: { height: 40, width: 40, marginRight: 10 },
  title: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 14,
    alignItems: 'center',
  },
  containerTitle: {},
  authorContainer: { flexDirection: 'row' },
  author: { fontSize: 12, marginVertical: 5, color: colors.text.lightGray },
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
  ava: { color: colors.text.copiesColors, margin: 2, paddingHorizontal: 5 },
  clock: { flexDirection: 'row' },
  time: {
    fontSize: 12,
    color: colors.app.primary,
    alignSelf: 'center',
  },
});

interface ListItemProps {
  uri: ImageSourcePropType;
  title?: Element | string;
  description?: Element | string;
  time?: string;
  style?: ViewStyle;
  width?: number;
  height?: number;
  number?: number;
  onPress?: () => any;
}

export { KwListItemSimple };
