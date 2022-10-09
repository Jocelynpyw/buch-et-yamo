import { colors } from '@KwSrc/utils';
// import i18n from '@KwSrc/config/i18n/i18n';
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
// import { KwButton } from '../button';
import KwIcon from '../Icon';

const KwListItemVideo: FunctionComponent<ListItemProps> = ({
  uri,
  title,

  text,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <View style={styles.mainContent}>
      <Image style={styles.bookImage} resizeMode="cover" source={uri} />
      <View style={styles.titleDescription}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{text}</Text>
        </View>

        <View style={styles.priceContainer}>
          {/* <KwButton
            style={styles.pricePadding}
            color={colors.app.backgroundCopies}
            size="sm"
          >
            <Text style={styles.ava}>
              {' '}
              {number} {i18n.t('COMMON__VIDEOS')}{' '}
            </Text>
          </KwButton> */}
        </View>
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
  },
  mainContent: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  titleDescription: {
    flexShrink: 1, // fixes overflow on text exceeding view
  },
  bookImage: { height: 90, width: 90, marginRight: 10, borderRadius: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  authorContainer: { flexDirection: 'row' },
  author: { fontWeight: '100', fontSize: 12, marginVertical: 5 },
  priceContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.app.primary,
  },
  pricePadding: { padding: 2 },
  ava: {
    color: colors.text.copiesColors,
    margin: 2,
    marginTop: 20,
    fontSize: 10,
  },
});

interface ListItemProps {
  uri: ImageSourcePropType;
  title?: string;
  author?: Element | string;
  text?: string;
  price?: string;
  style?: ViewStyle;
  number?: number;
  onPress?: () => any;
}

export { KwListItemVideo };
