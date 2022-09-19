import React, { FunctionComponent, useCallback } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';

const AnswersSubjectListScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <KwListItemSimple
        uri={images.filesImage}
        title={item.title}
        onPress={() => {}}
        style={{ paddingVertical: 12 }}
      />
    ),
    [navigation],
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <KwContainer title={i18n.t('COMMON__PAPERS')}>
        <FlatList
          initialNumToRender={5}
          data={[
            {
              title: i18n.t('COMMON__ACCOUNTING'),
            },
            {
              title: i18n.t('COMMON__FRENCH'),
            },
            {
              title: i18n.t('COMMON__CHEMISTRY'),
            },
            {
              title: i18n.t('COMMON__ENGLISH'),
            },
            {
              title: i18n.t('COMMON__PHYSICS'),
            },
            {
              title: i18n.t('COMMON__MATHMATICS'),
            },
            {
              title: i18n.t('COMMON__ENGLISH_LITERATURE'),
            },
            {
              title: i18n.t('COMMON__HISTORY'),
            },
            {
              title: i18n.t('COMMON__GEOGRAPHY'),
            },
            {
              title: i18n.t('COMMON__COMPUTER_SCIENCE'),
            },
          ]}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          // ListHeaderComponent={renderHeader}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 16,
  },
});

export default AnswersSubjectListScreen;
