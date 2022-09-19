import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import KwIcon from '../Icon';

const KwCorrectionCard: FunctionComponent<ListItemProps> = ({
  title,
  item = [],
  ...props
}) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.container, props.style]}
  >
    <Text style={styles.title}>{title}</Text>

    <View>
      <Text style={styles.desc}>{i18n.t('COMPONENT_CORRECTIONCARD_TEXT')}</Text>
    </View>

    {item.map((i) => (
      <View style={styles.benfits}>
        <KwIcon name="checkMark" width="40" height="40" viewBox="0 0 25 25" />

        <View style={styles.item}>
          <Text>{i}</Text>
        </View>
      </View>
    ))}
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
  },
  image: { width: 60, height: 60 },
  title: {
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: colors.app.primary,
  },
  desc: {
    marginVertical: 5,
    color: colors.app.lightBlue,
    fontWeight: '300',
    alignSelf: 'flex-start',
  },
  mainContent: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  benfits: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  item: { alignSelf: 'flex-start', flexShrink: 1 },
});

interface ListItemProps {
  title?: Element | string;
  description?: Element | string;
  style?: ViewStyle;
  item?: string[];
  onPress?: () => any;
}

export { KwCorrectionCard };
