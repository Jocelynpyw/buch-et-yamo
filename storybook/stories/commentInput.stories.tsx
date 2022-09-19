import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import KwCommentInput from '@KwSrc/components/commentInput';
import { BufferView } from './decorators';

storiesOf('Comment input', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <View>
      <KwCommentInput onSendComment={() => {}} />
    </View>
  ));
