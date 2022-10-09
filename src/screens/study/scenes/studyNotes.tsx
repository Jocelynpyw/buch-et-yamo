import React, { FunctionComponent, useState } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import PrHeader from '@KwSrc/components/header';
import { StyleSheet, View, FlatList, ListRenderItem, Text } from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import { RouteProp } from '@react-navigation/native';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';

const StudyNotesScreen: FunctionComponent<StudyNotesScreenProps> = ({
  navigation,
}) => {
  const subjects = [
    ...[
      { title: 'Accounting (0505)', subjectId: 129, levelId: 160 },
      { title: 'Biology (0510)', subjectId: 145, levelId: 160 },
      { title: 'Chemistry (0515)', subjectId: 131, levelId: 160 },
      { title: 'Computer science (0595)', subjectId: 130, levelId: 160 },
      { title: 'Economics (0525)', subjectId: 158, levelId: 160 },
      { title: 'Physics (0580)', subjectId: 139, levelId: 160 },
      { title: 'English Literature (0535)', subjectId: 133, levelId: 160 },
      { title: 'English (0560)', subjectId: 159, levelId: 160 },
      { title: 'French (0545)', subjectId: 134, levelId: 160 },
      { title: 'Add Maths (0575)', subjectId: 142, levelId: 160 },
      { title: 'Geography (0550)', subjectId: 135, levelId: 160 },
      { title: 'Religious Studies (0585)', subjectId: 141, levelId: 160 },
      { title: 'Citizenship Education (0562)', subjectId: 144, levelId: 160 },
      { title: 'Commerce (0520)', subjectId: 132, levelId: 160 },
      { title: 'History (0560)', subjectId: 147, levelId: 160 },
      { title: 'Human Biology (0565)', subjectId: 151, levelId: 160 },
      { title: 'Mathmatics (0570)', subjectId: 138, levelId: 160 },
      { title: 'Logic (0590)', subjectId: 176, levelId: 160 },
      { title: 'Food and Nutrition (0595)', subjectId: 150, levelId: 160 },
    ],

    ...[
      { title: 'Accounting (0705)', subjectId: 129, levelId: 13 },
      { title: 'Biology (0710)', subjectId: 145, levelId: 13 },
      { title: 'Chemistry (715)', subjectId: 131, levelId: 13 },
      { title: 'Computer science (0795)', subjectId: 130, levelId: 13 },
      { title: 'Economics (0725)', subjectId: 158, levelId: 13 },
      { title: 'Physics (0780)', subjectId: 139, levelId: 13 },
      { title: 'English Literature (0735)', subjectId: 133, levelId: 13 },
      { title: 'English (0730)', subjectId: 159, levelId: 13 },
      { title: 'French (0745)', subjectId: 134, levelId: 13 },
      { title: 'Futher Mathematics (0775)', subjectId: 153, levelId: 13 },
      { title: 'Geography (0750)', subjectId: 135, levelId: 13 },
      { title: 'Geology (0755)', subjectId: 136, levelId: 13 },
      { title: 'Religious Studies (0785)', subjectId: 141, levelId: 13 },
      { title: 'History (0760)', subjectId: 147, levelId: 13 },
      { title: 'ICT (0796)', subjectId: 154, levelId: 13 },
      { title: 'Mathmatics (0770)', subjectId: 138, levelId: 13 },
      { title: 'Philosophy (0790)', subjectId: 140, levelId: 13 },
      { title: 'Food Science(0740)', subjectId: 155, levelId: -1 },
      { title: 'Special Bal. Education ', subjectId: 152, levelId: 13 },
      { title: 'Cameroon gce board syllabus', subjectId: 48, levelId: 0 },
    ],
  ];
  const [notes, setNotes] = useState<any[] | undefined>(undefined);

  const search = (text: string) => {
    if (text.length > 0) {
      const filteredItems = subjects.filter((item: any) =>
        item.title.includes(text),
      );
      setNotes(filteredItems);
    } else {
      setNotes(undefined);
    }
  };

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <KwListItemSimple
      uri={images.studyBookImage}
      title={item.title}
      onPress={() => {
        navigation.navigate(StudyStackRouteList.StudyNotesList, {
          title: item.title,
          subjectId: item.subjectId,
        });
      }}
    />
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => (
    <View>
      <Text style={styles.compTitle}>No Subject found :( !</Text>
    </View>
  );

  return (
    <View style={styles.container_one}>
      <PrHeader
        back
        searchBottom
        title="School Notes"
        avatar="https://via.placeholder.com/150"
        getSearchText={(text) => {
          search(text);
        }}
      />
      <KwContainer ads textStyle={{ fontSize: 20 }} style={styles.container}>
        <FlatList
          initialNumToRender={5}
          data={notes || subjects}
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
  compTitle: {
    textAlign: 'center',
    color: colors.app.black,
    paddingTop: 5,
    fontFamily: 'Roboto-Light',
  },
});
interface StudyNotesScreenProps {
  route: RouteProp<StudyStackParamList, typeof StudyStackRouteList.StudyNotes>;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyNotes
  >;
}

export default StudyNotesScreen;
