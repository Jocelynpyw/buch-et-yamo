import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import KwHearder from '@KwSrc/components/header';
import { BufferView } from './decorators';

storiesOf('Header', module)
  .addDecorator(BufferView)
  .add('home', () => (
    <View>
      <KwHearder
        search
        notification
        notificationCount={50}
        avatar="https://via.placeholder.com/150"
      />
    </View>
  ))
  .add('post', () => (
    <View>
      <KwHearder
        back
        title="Create post"
        avatar="https://via.placeholder.com/150"
        searchBottom
      />
    </View>
  ))
  .add('quiz', () => (
    <View>
      <KwHearder clock="15:00" progress={0.5} user={4} />
    </View>
  ))
  .add('chats', () => (
    <View>
      <KwHearder
        back
        avatarChat="https://via.placeholder.com/150"
        username="Gunkev"
        chatSearch
      />
    </View>
  ));
