import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { KwSquareCard } from '@KwSrc/components/card/squareCard';
import { colors, images } from '@KwSrc/utils';
import { KwQuizCard } from '@KwSrc/components/card/quizCard';
import { KwAlertCard } from '@KwSrc/components/card/alertCard';
import { KwCorrectionCard } from '@KwSrc/components/card/correctionCard';
import { KwPriceCard } from '@KwSrc/components/card/priceCard';
import { KwCard } from '@KwSrc/components/card';
import { BufferView } from './decorators';

storiesOf('Card', module)
  .addDecorator(BufferView)
  .add('simple', () => (
    <View>
      <KwSquareCard
        title="Pamphlets"
        description="5000+ Pamphlets"
        uri={images.studyBookImage}
      />
    </View>
  ))
  .add('quiz', () => (
    <View>
      <KwQuizCard
        style={{
          backgroundColor: colors.app.primary,
          borderColor: colors.app.primary,
        }}
        title="Competition Quizzes"
        uri={images.quizCupImage}
      />
    </View>
  ))
  .add('alert', () => (
    <View>
      <KwAlertCard
        description="Corrections made by certified teachers to
        ensure your success"
      />
    </View>
  ))
  .add('correction', () => (
    <View>
      <KwCorrectionCard
        title="O Level corrections"
        item={[
          '20 years of corrections and still nothing, but am still hungry',
        ]}
      />
    </View>
  ))
  .add('price', () => (
    <View>
      <KwPriceCard
        style={{ backgroundColor: colors.app.primary }}
        price="750 XAF"
        time="Month"
        color={colors.app.lightBluePrice}
        number={1}
      />
    </View>
  ))
  .add('postCard', () => (
    <View>
      <KwCard
        onPressCard={() => {}}
        post={{
          page: {
            name: 'Mfouou medjo stanly',
            profile: {
              url: 'https://www.fillmurray.com/640/360',
            },
          },
          createdAt: new Date(),
          title: 'Exam Questions',
          content:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        }}
      />
    </View>
  ));
