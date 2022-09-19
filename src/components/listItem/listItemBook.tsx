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

const KwListItemBook: FunctionComponent<ListItemProps> = ({
  uri,
  title,
  author,
  price,
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <View style={styles.mainContent}>
      <Image style={styles.bookImage} source={uri} />
      <View style={styles.titleDescription}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.authorContainer}>
          <KwIcon
            name="people"
            width="30"
            height="30"
            viewBox="0 -5 25 25"
            fill="none"
          />

          <Text style={styles.author}>{author}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <KwButton
            style={styles.pricePadding}
            color={colors.app.backgroundCopies}
            size="xs"
          >
            <Text style={styles.ava}>{i18n.t('COMMON__AVAILABLE')}</Text>
          </KwButton>
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
    alignItems: 'center',
  },
  titleDescription: {
    flexShrink: 1, // fixes overflow on text exceeding view
    marginLeft: 10,
  },
  bookImage: { height: 78, width: 78, marginRight: 10, borderRadius: 10 },
  title: { fontWeight: '600', fontSize: 14 },
  authorContainer: { flexDirection: 'row' },
  author: { fontWeight: '100', fontSize: 12, marginVertical: 5 },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.app.primary,
  },
  pricePadding: { padding: 2 },
  ava: { color: colors.text.copiesColors, margin: 2, marginLeft: 20 },
});

interface ListItemProps {
  uri: ImageSourcePropType;
  title?: Element | string;
  author?: Element | string;
  price?: string;
  style?: ViewStyle;
  onPress?: () => any;
}

export { KwListItemBook };
