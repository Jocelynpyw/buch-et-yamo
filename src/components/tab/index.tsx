import { colors, fontsizes } from '@KwSrc/utils';
import React, { FunctionComponent, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface IKwTabs {
  tabs: IKwTab[];
  tabHeaderStyle?: ViewStyle;
  buttonTabStyle?: ViewStyle;
  buttonActiveTabStyle?: ViewStyle;
  textTabStyle?: TextStyle;
  textActivedTabStyle?: TextStyle;
  containerTabStyle?: ViewStyle;
}

export interface IKwTab {
  index: number;
  label: string;
  content: Element;
}

const KwTabs: FunctionComponent<IKwTabs> = (tabComponent: IKwTabs) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={[styles.tabHeader, tabComponent.tabHeaderStyle]}>
        {tabComponent.tabs.map((el) => (
          <TouchableOpacity
            key={el.index}
            style={[
              [styles.buttonTab, tabComponent.buttonTabStyle],
              index === el.index && [
                styles.buttonTabActive,
                tabComponent.buttonActiveTabStyle,
              ],
            ]}
            onPress={() => setIndex(el.index)}
          >
            <Text
              style={[
                [styles.textTab, tabComponent.textTabStyle],
                index === el.index && [
                  styles.textTabActive,
                  tabComponent.textActivedTabStyle,
                ],
              ]}
            >
              {el.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.containerTab, tabComponent.containerTabStyle]}>
        {tabComponent.tabs[index].content}
      </View>
    </View>
  );
};

export default KwTabs;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerScrollView: {
    paddingTop: 5,
    paddingBottom: 10,
    alignContent: 'center',
    overflow: 'hidden',
  },
  tabHeader: {
    alignSelf: 'stretch',
    padding: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: colors.app.secondary,

    justifyContent: 'center',
  },
  buttonTab: {
    flex: 1,
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonTabActive: {
    backgroundColor: colors.app.white,
    shadowColor: colors.app.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.38,
    shadowRadius: 12,

    elevation: 5,
  },
  textTab: {
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    fontSize: fontsizes.FONTS.robotoBody4.fontSize,
    padding: 5,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  textTabActive: {
    color: colors.app.black,
  },
  containerTab: {
    paddingVertical: 15,
  },
});
