import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { KwListItem } from '@KwSrc/components/listItem';
import KwIcon from '@KwSrc/components/Icon';
import { KwListItemBook } from '@KwSrc/components/listItem/listItemBook';
import { KwListItemVideo } from '@KwSrc/components/listItem/listItemVideo';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { colors, images } from '@KwSrc/utils';
import { KwListItemQuiz } from '@KwSrc/components/listItem/listItemQuiz';
import { BufferView } from './decorators';

const countries = [
  {
    title: 'Cameroon',
    flag: '🇨🇲',
    levels: [
      { title: 'GCE O Level', id: 1 },
      { title: 'GCE A Level', id: 2 },
      { title: 'Technical GCE', id: 3 },
      { title: 'Commercial GCE', id: 4 },
    ],
  },
  {
    title: 'Tanzania',
    flag: '🇹🇿',
    levels: [
      { title: 'CSEE (Form 4)', id: 5 },
      { title: 'ACSEE (Form 6)', id: 6 },
    ],
  },
  {
    title: 'Uganda',
    flag: '🇺🇬',
    levels: [
      { title: 'UCE', id: 7 },
      { title: 'UACE', id: 8 },
    ],
  },
  {
    title: 'Zambia',
    flag: '🇿🇲',
    levels: [
      { title: 'ECZ 7', id: 9 },
      { title: 'ECZ 9', id: 10 },
      { title: 'ECZ 12', id: 11 },
    ],
  },
];

storiesOf('ListItem', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <View>
      {countries.map((country) => (
        <View key={country.title}>
          <KwListItem
            left={<Text>{country.flag}</Text>}
            title={<Text>{country.title}</Text>}
            right={
              <KwIcon
                name="chevron_right"
                width="30"
                height="30"
                viewBox="-5 -5 30 30"
                stroke={colors.app.black}
                fill="none"
              />
            }
            onPress={() => {}}
          />
        </View>
      ))}
    </View>
  ))
  .add('ListBook', () => (
    <View>
      <KwListItemBook
        uri={{
          uri: 'https://cameroongcerevision.com/wp-content/uploads/2021/03/cover-1.png',
        }}
        title="Advance Level ICT"
        author="Robertson Connie"
        price="25000 XAF"
        onPress={() => {}}
      />
    </View>
  ))
  .add('ListVideo', () => (
    <View>
      <KwListItemVideo
        uri={{
          uri: 'https://cameroongcerevision.com/wp-content/uploads/2021/03/cover-1.png',
        }}
        title="Advance Level ICT"
        number={12}
        onPress={() => {}}
      />
    </View>
  ))
  .add('ListSimple', () => (
    <View>
      <KwListItemSimple
        uri={images.quizImage}
        title="Advance Level ICT"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
        diam nonummy nibh euismod tincidunt ut laoree."
        onPress={() => {}}
      />
    </View>
  ))
  .add('ListSimpleTime', () => (
    <View>
      <KwListItemSimple
        uri={images.quizImage}
        title="Advance Level ICT"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
        diam nonummy nibh euismod tincidunt ut laoree."
        onPress={() => {}}
        time="20"
        number={20}
      />
    </View>
  ))
  .add('ListQuiz', () => (
    <View>
      <KwListItemQuiz
        uri="https://placebear.com/640/360"
        title="Will Smith"
        onPress={() => {}}
        time="20"
        number={20}
      />
    </View>
  ));
