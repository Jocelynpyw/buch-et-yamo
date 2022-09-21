import React, { FunctionComponent } from 'react';
import { colors } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';

import { StyleSheet, View } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import i18n from '@KwSrc/config/i18n/i18n';
import { KwAlertCard } from '@KwSrc/components/card/alertCard';
import { KwCorrectionCard } from '@KwSrc/components/card/correctionCard';
import { KwPriceCard } from '@KwSrc/components/card/priceCard';
import { ScrollView } from 'react-native-gesture-handler';

const AnswersBundleScreen: FunctionComponent<StackScreenProps<any>> = ({}) => {
  return (
    <View style={styles.container_one}>
      <KwContainer style={styles.container}>
        <ScrollView>
          <View>
            <KwAlertCard
              description={i18n.t('COMPONENT__ANSWERSBUNDLESCREEN_DESCRIPTION')}
            />
          </View>
          <KwCorrectionCard
            title={i18n.t('COMPONENT__CORRECTION_LEVELO')}
            item={[i18n.t('COMPONENT__ANSWERSBUNDLESCREEN_20YEARS')]}
            style={styles.MT8}
            onPress={() => {}}
          />
          <View style={[styles.priceCards, styles.MT8]}>
            <KwPriceCard
              style={{ backgroundColor: colors.app.pinkLight }}
              price="750 XAF"
              time={i18n.t('COMMON__MONTH')}
              color={colors.app.lightPinkPrice}
              number={1}
            />
            <KwPriceCard
              style={{ backgroundColor: colors.app.primary }}
              price="1500 XAF"
              time={i18n.t('COMMON__MONTH')}
              color={colors.app.lightBluePrice}
              number={1}
            />
          </View>
          <View style={[styles.priceCards, styles.MT8]}>
            <KwPriceCard
              style={{ backgroundColor: colors.app.greenLight }}
              price="3000 XAF"
              time={i18n.t('COMMON__MONTH')}
              color={colors.app.lightGreenPrice}
              number={1}
            />
          </View>
        </ScrollView>
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  container: {
    minHeight: '85%',
    paddingVertical: 25,
  },
  MT8: {
    marginTop: 8,
  },
  priceCards: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default AnswersBundleScreen;
