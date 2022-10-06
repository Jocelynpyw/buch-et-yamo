import {
  View,
  // Text,
  SafeAreaView,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
  // FlatList,
  TextInput,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import KwHearder from '@KwSrc/components/header';
import { colors } from '@KwSrc/utils';
// import AccordionItem from '@KwSrc/components/accordion/AccordionItem';
import { SIZES } from '@KwSrc/utils/fontsizes';
import { KwLinearGradient } from '@KwSrc/components/linearGradient';
import KwTabs from '@KwSrc/components/tab';
import { KwButton } from '@KwSrc/components/button';
import { useSelector } from 'react-redux';
import { selectAppSettings } from '@KwSrc/store/reducers/app';
import { IAppSettings } from '@KwSrc/typings/apiTypes';

const ContactUsSection = () => {
  // const [status, setStatus] = useState('Support');
  const [whatsapp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');

  const settings: IAppSettings = useSelector(selectAppSettings);
  // const setStatusFilter = (status) => {
  //   setStatus(status);
  // };

  // const data = [
  //   {
  //     id: 0,
  //     title: 'Je suis le titre numero un',
  //     body: [
  //       {
  //         id: 10,
  //         title: 'Je ne suis pas un enfant tu vois un peu',
  //       },
  //       {
  //         id: 11,
  //         title: 'Je ne suis pas un enfant tu vois un peu',
  //       },
  //       {
  //         id: 12,
  //         title: 'Je ne suis pas un enfant tu vois un peu',
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     title: 'Je suis le titre numero deux',
  //     body: [
  //       {
  //         id: 20,
  //         title: 'Je suis le sous texte 1',
  //       },
  //       {
  //         id: 21,
  //         title: 'Je suis le sous texte 2 ',
  //       },
  //       {
  //         id: 22,
  //         title: 'je suis le sous texte 3',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'je suis le titre numero trois',
  //     body: [
  //       {
  //         id: 20,
  //         title: 'je suis le sous texte 1',
  //       },
  //       {
  //         id: 21,
  //         title: 'je suis le sous texte 2 ',
  //       },
  //       {
  //         id: 22,
  //         title: 'je suis le sous texte 3',
  //       },
  //     ],
  //   },
  // ];
  // const renderHeader = () => (
  //   <View>
  //     <Text
  //       style={{
  //         fontWeight: 'bold',
  //         fontSize: 16,
  //         marginBottom: 20,
  //       }}
  //     >
  //       How can we help you?
  //     </Text>
  //   </View>
  // );

  const listTab = [
    {
      index: 0,
      label: 'WhatsApp',
      content: (
        <View style={styles.fatlist}>
          <View>
            <View>
              <TextInput
                style={{
                  borderColor: '#D7DDEF',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 10,
                }}
                placeholder="Enter your problem in details"
                numberOfLines={10}
                multiline
                keyboardType="name-phone-pad"
                value={whatsapp}
                textAlignVertical="top"
                onChangeText={(text) => {
                  setWhatsApp(text);
                }}
              />
            </View>

            <View style={{ paddingHorizontal: 80 }}>
              <KwButton
                size="md"
                children="Send Message"
                rounded
                color={colors.app.primary}
                style={styles.btnSubmit}
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=${
                      settings!.phones!.others[0]
                    }&text=${whatsapp}`,
                  );
                }}
              />
            </View>
          </View>
        </View>
      ),
    },
    {
      index: 1,
      label: 'Email',
      content: (
        <View style={styles.fatlist}>
          <View>
            <View>
              <TextInput
                style={{
                  borderColor: '#D7DDEF',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 10,
                }}
                placeholder="Enter your problem in details"
                numberOfLines={10}
                multiline
                keyboardType="name-phone-pad"
                textAlignVertical="top"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>

            <View style={{ paddingHorizontal: 80 }}>
              <KwButton
                size="md"
                children="Submit"
                rounded
                color={colors.app.primary}
                style={styles.btnSubmit}
                onPress={() => {
                  Linking.openURL(
                    `mailto:${settings!
                      .emails![0]!}?cc=info@gcequiz.com&body=${email}`,
                  );
                }}
              />
            </View>
          </View>
        </View>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KwHearder back title="Contact us" />

      <KwLinearGradient colors={['#FfFFFF', '#D7DDEF']}>
        <View style={styles.listTab}>
          <KwTabs tabs={listTab} />
        </View>
      </KwLinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstTitle: {
    padding: 2,
    fontSize: SIZES.h2,
    marginBottom: 10,
  },
  listTab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  btnTab: {
    width: Dimensions.get('window').width / 2.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    color: '#717070',
  },
  btnSubmit: {
    marginVertical: 20,
  },
  btnTabActive: {
    backgroundColor: colors.app.white,

    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  textTab: {
    fontSize: 13,
    color: colors.text.tertiaryGrey,
  },
  textTabActive: {
    color: colors.text.black,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    padding: '2%',
    height: '100%',
    backgroundColor: colors.app.white,
  },
  accordionstyleBackgrondHeader: {
    backgroundColor: '#0000000d',
    height: 60,
  },
  accordionStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  fatlist: { marginVertical: 10 },
});
export default ContactUsSection;
