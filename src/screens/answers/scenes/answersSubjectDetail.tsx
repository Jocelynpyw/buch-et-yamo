import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem, Text } from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import KwTab from '@KwSrc/components/tab';
import { KwListItemVideo } from '@KwSrc/components/listItem/listItemVideo';

const AnswersSubjectDetailScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <KwListItemSimple
        uri={images.checkImage}
        title={item.title}
        onPress={() => {}}
        style={{ paddingVertical: 12 }}
      />
    ),
    [navigation],
  );
  const renderVideoItem: ListRenderItem<any> = useCallback(
    ({}) => (
      <View>
        <KwListItemVideo
          uri={{
            uri: 'https://cameroongcerevision.com/wp-content/uploads/2021/03/cover-1.png',
          }}
          title={i18n.t('COMPONENT_ADVANCE_LEVEL')}
          number={12}
          onPress={() => {}}
        />
      </View>
    ),
    [navigation],
  );

  const renderListItems = () => (
    <View>
      <KwTab tabs={listTab} index={index} setIndex={setIndex} />
    </View>
  );

  const renderEmpty = () => <View />;

  const [index, setIndex] = useState(0);
  const data = [
    {
      title: i18n.t('COMPONENT__ANSWERSCOUNTRYLISTSCREEN_DATA_TITLE_ONE'),
    },
    {
      title: i18n.t('COMPONENT__ANSWERSCOUNTRYLISTSCREEN_DATA_TITLE_TWO'),
    },
    {
      title: i18n.t('COMPONENT__ANSWERSCOUNTRYLISTSCREEN_DATA_TITLE_THREE'),
    },
  ];
  const listTab = [
    {
      index: 0,
      label: 'All',
      content: (
        <View>
          <View>
            <Text style={styles.title}>{i18n.t('COMMON__PAPERS')}</Text>
            <FlatList
              key={1}
              listKey={'list 1'}
              keyExtractor={(_item, index) => `_key${index.toString()}`}
              initialNumToRender={3}
              data={data}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.MT30}>
            <Text style={styles.title}>{i18n.t('COMMON__VIDEOS')}</Text>
            <FlatList
              key={2}
              listKey={'list 2'}
              keyExtractor={(_item, index) => `_key${index.toString()}`}
              initialNumToRender={5}
              data={data}
              renderItem={renderVideoItem}
            />
          </View>
        </View>
      ),
    },
    {
      index: 1,
      label: i18n.t('COMMON__PAPERS'),
      content: (
        <View style={styles.MT30}>
          <FlatList
            key={3}
            listKey={'list 1 2'}
            keyExtractor={(_item, index) => `_key${index.toString()}`}
            initialNumToRender={5}
            data={data}
            renderItem={renderItem}
          />
        </View>
      ),
    },
    {
      index: 2,
      label: i18n.t('COMMON__VIDEOS'),
      content: (
        <View style={styles.MT30}>
          <FlatList
            initialNumToRender={5}
            data={data}
            renderItem={renderVideoItem}
          />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container_one}>
      <KwContainer>
        <View>
          <FlatList
            data={[{}]}
            renderItem={renderListItems}
            ListEmptyComponent={renderEmpty}
          />
        </View>
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
    marginBottom: 10,
    marginTop: 10,
  },
  MT30: {
    marginTop: 30,
  },
});

export default AnswersSubjectDetailScreen;
