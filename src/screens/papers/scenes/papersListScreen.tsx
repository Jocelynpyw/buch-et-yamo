import React, { FunctionComponent, useCallback } from 'react';
import { colors } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import { PapersStackParamList, PapersStackRouteList } from '../constant';

const PapersListScreen: FunctionComponent<PapersListScreenProps> = ({
  navigation,
  route,
}) => {
  const { level, id } = route.params;

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <View>
        <KwListItemSimple
          width={40}
          height={40}
          uri={item.image}
          title={item.title}
          onPress={item.onPress}
          style={styles.list}
          description={item.description}
        />
      </View>
    ),
    [],
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          title={level}
        />
      </View>
      <KwContainer
        textStyle={{ fontSize: 20 }}
        title={i18n.t(
          'COMPONNENT__PAPERSLISTSCREEN_WHAT_ARE_YOU_LOOKING_FOR_MESSAGE',
        )}
        style={styles.container}
      >
        <FlatList
          initialNumToRender={5}
          data={[
            {
              title: i18n.t('COMPONNENT__PAPERSLISTSCREEN_PAST_PAPERS_TITLE'),
              description: i18n.t(
                'COMPONNENT__PAPERSLISTSCREEN_PASTPAPERS_DESCRIPTION_MESSAGE',
              ),
              image: require('../../../assets/images/saveFile.png'),
              onPress: () => {
                navigation.navigate(PapersStackRouteList.PapersSubjectList, {
                  level,
                  id,
                });
              },
            },
            {
              title: i18n.t(
                'COMPONNENT__PAPERSLISTSCREEN_DOWNLOADED_PAPERS_TITLE',
              ),
              description: i18n.t(
                'COMPONNENT__PAPERSLISTSCREEN_DOWNLOADEDPAPERS_DESCRIPTION_MESSAGE',
              ),
              image: require('../../../assets/images/copyFile.png'),
              onPress: () => {},
            },
            {
              title: i18n.t('COMPONNENT__PAPERSLISTSCREEN_SHARED_PAPERS_TITLE'),
              description: i18n.t(
                'COMPONNENT__PAPERSLISTSCREEN_SHAREDPAPERS_DESCRIPTION',
              ),
              image: require('../../../assets/images/shareFile.png'),
              onPress: () => {},
            },
          ]}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
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
    flex: 1,
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
    height: 90,
    marginTop: 10,
    paddingVertical: 12,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
});

interface PapersListScreenProps {
  route: RouteProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersList
  >;
  navigation: StackNavigationProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersList
  >;
}

export default PapersListScreen;
