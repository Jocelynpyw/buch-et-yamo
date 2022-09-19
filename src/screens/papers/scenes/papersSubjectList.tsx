import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import {
  PapersStackParamList,
  PapersStackRouteList,
  subjects,
} from '../constant';

const PapersSubjectListScreen: FunctionComponent<
  PapersSubjectListScreenProps
> = ({ navigation, route }) => {
  const { level, id } = route.params;

  // @TODO make sure the subjects are takend from the server
  // as seens in the old kawlo application, you can create a route for that

  const [subject, setSubject] = useState<any[]>([]);

  useEffect(() => {
    setSubject(subjects);
  }, []);

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <KwListItemSimple
        uri={images.saveImage}
        title={item.title}
        onPress={() => {
          navigation.navigate(PapersStackRouteList.PapersSubjectYearList, {
            level,
            subject: item.title,
            subjectId: item.subjectId,
            levelId: item.levelId,
          });
        }}
        style={{ paddingVertical: 12 }}
      />
    ),
    [level, navigation],
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
        textStyle={styles.containerText}
        style={styles.container}
        title={level}
      >
        <FlatList
          initialNumToRender={5}
          data={subject[id - 1]}
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
    paddingHorizontal: 10,
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
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  containerText: { fontSize: 20, marginBottom: 10 },
});

interface PapersSubjectListScreenProps {
  route: RouteProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectList
  >;
  navigation: StackNavigationProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectList
  >;
}
export default PapersSubjectListScreen;
