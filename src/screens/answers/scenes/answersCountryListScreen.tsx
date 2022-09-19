import React, { FunctionComponent, useCallback } from 'react';
import { colors } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem, Text } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwListItem } from '@KwSrc/components/listItem';
import KwIcon from '@KwSrc/components/Icon';
import { AnswersStackRouteList } from '../constants';

const AnswersCountryListScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  const renderItem: ListRenderItem<any> = useCallback(
    ({}) => (
      <View>
        <View key={''}>
          <KwListItem
            left={<Text>🇬🇧 </Text>}
            title={<Text>{i18n.t('COMMON__ENGLAND')}</Text>}
            style={styles.list}
            right={
              <KwIcon
                name="chevron_right"
                width="30"
                height="30"
                viewBox="-5 -5 30 30"
                fill="none"
              />
            }
            onPress={() => {
              navigation.navigate(AnswersStackRouteList.AnswersBundle);
            }}
          />
        </View>
      </View>
    ),
    [navigation],
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <KwContainer
        textStyle={{ fontSize: 20 }}
        title={i18n.t('COMPONENT_ANSWERSBUNDLESCREEN_SELECT_YOU_COUNTRY')}
        style={styles.container}
      >
        <FlatList
          initialNumToRender={5}
          data={[
            {
              title: i18n.t('COMMON__ENGLAND'),
            },
            {
              title: i18n.t('COMMON__SPAIN'),
            },
            {
              title: i18n.t('COMMON__JAPAN'),
            },
            {
              title: i18n.t('COMMMON__GERMANY'),
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
    paddingHorizontal: 12,
  },
  container: {
    height: '98%',
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
  list: {
    height: 63,
    marginTop: 10,
  },
});

export default AnswersCountryListScreen;
