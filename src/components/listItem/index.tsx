import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';

const KwListItem: FunctionComponent<ListItemProps> = ({
  left,
  title,
  description,
  right,
  bottom,
  ...props
}) => (
  <View style={[props.style]}>
    <TouchableOpacity onPress={props.onPress} style={[styles.container]}>
      <View style={styles.mainContent}>
        {left}
        <View style={styles.titleDescription}>
          {typeof title === 'string' ? <Text>{title}</Text> : title}
          {typeof description === 'string' ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
        </View>
      </View>
      {right}
    </TouchableOpacity>
    {bottom}
  </View>
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
    marginVertical: 0,
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
});

interface ListItemProps {
  left?: Element;
  bottom?: Element;
  title?: Element | string;
  description?: Element | string;
  right?: Element;
  style?: ViewStyle;
  onPress?: () => any;
}

export { KwListItem };
