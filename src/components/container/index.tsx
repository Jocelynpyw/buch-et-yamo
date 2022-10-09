import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import { ViewStyle, View, StyleSheet, Text, TextStyle } from 'react-native';
import { KwAds } from '../ads';

const KwContainer: FunctionComponent<ContainerProps> = ({
  children,
  title,
  style,
  tag,
  textStyle,
  ads = false,
}) => (
  <View style={[styles.container, style]}>
    {tag && <Text style={styles.tag}>{tag}</Text>}
    {ads && (
      <View style={{ marginVertical: 10, marginBottom: 30 }}>
        <KwAds type="notes" />
      </View>
    )}

    {title && <Text style={[styles.title, textStyle]}>{title}</Text>}

    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.app.backgrounfGray,
    borderRadius: 20,
    padding: 15,
    paddingVertical: 30,
    marginBottom: 10,
    marginTop: 3,
  },

  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 18,
    paddingBottom: 10,
    marginTop: 10,
  },
  tag: { color: colors.text.grey, fontSize: 12 },
});

interface ContainerProps {
  title?: Element | string;
  style?: ViewStyle;
  children?: Element;
  tag?: string;
  textStyle?: TextStyle;
  ads?: boolean;
  onPress?: () => any;
}

export { KwContainer };
