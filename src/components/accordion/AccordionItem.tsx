import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  TextInput,
  Image,
} from 'react-native';
import { FunctionComponent } from 'enzyme';
import { colors, images } from '@KwSrc/utils';

import React, { useRef, useState } from 'react';
import KwIcon from '../Icon';
import KwCheckbox from '../checkbox';
import { KwButton } from '../button';

interface Props {
  desciption?: boolean;
  title?: string;
  buttonSumbit?: boolean;
  checkbox?: boolean;
  ckeckboxData?: boolean;
  textBody?: any;
  onChange?: boolean;
  bodytext?: any;
  style?: any;
  imageLeft?: boolean;
  headerBacgroundColor?: any;
}

const AccordionItem: FunctionComponent<Props> = (props: Props) => {
  // onChange={(e) =>
  //     setUser({ ...user, prenom: e.target.value })
  //   }
  const [showContent, setShowContent] = useState(false);
  const [question, setQuestion] = useState({
    questionTitle: '',
    questionCommonType: '',
    questionComment: '',
  });

  const handleSendQuestion = () => {
    // props.onChange(question);
  };
  const toggleAnimation = {
    duration: 300,
    update: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 200,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#D7DDEF',
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 10,
        }}
        onPress={() => toggleListItem()}
      >
        <View
          style={{ ...styles.titleContainer, ...props.headerBacgroundColor }}
        >
          {props.title ? (
            <View style={styles.titleContentContainer}>
              {props.imageLeft && (
                <View>
                  <Image
                    style={styles.titleContentContainerImage}
                    source={images.filesImage}
                  />
                </View>
              )}
              <Text style={{ fontWeight: 'bold' }}>{props.title}</Text>
            </View>
          ) : (
            <Text>Deroulez s'il vous plait</Text>
          )}

          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <KwIcon
              name="chevron_right"
              width="30"
              height="20"
              viewBox="0 0 20 5"
              stroke={colors.app.black}
              fill="none"
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {showContent && (
        <View style={styles.bodyText}>
          {props.textBody && (
            <View>
              <Text style={styles.textBody}>{props.textBody}</Text>
            </View>
          )}

          {props.bodytext &&
            props.bodytext.map((item: String) => (
              <View style={styles.checkBox}>
                {props.checkbox && (
                  <>
                    <KwCheckbox
                      rounded
                      color={colors.app.primary}
                      value={item.title}
                      onPress={() =>
                        setQuestion({
                          ...question,
                          questionTitle: item!.title,
                        })
                      }
                    />
                    <Text style={{ fontWeight: '300' }}>{item!.title}</Text>
                  </>
                )}
              </View>
            ))}
          {props.desciption && (
            <View>
              <TextInput
                style={{
                  borderColor: '#D7DDEF',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                }}
                placeholder="Enter your problem in details"
                numberOfLines={10}
                multiline
                keyboardType="name-phone-pad"
                textAlignVertical="top"
                onChangeText={(text) => {
                  setQuestion({ ...question, questionComment: text });
                }}
              />
            </View>
          )}
          {props.buttonSumbit && (
            <View style={{ paddingHorizontal: 80 }}>
              <KwButton
                size="md"
                children="Submit"
                rounded
                color={colors.app.primary}
                style={styles.btnSubmit}
                onPress={handleSendQuestion}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: colors.app.white,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  titleContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    marginVertical: 5,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },
  bodyText: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: colors.app.white,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  btnSubmit: {
    marginVertical: 20,
  },
  textBody: {
    padding: 15,
    fontWeight: '400',
  },
  titleContentContainerImage: {
    height: 45,
    width: 45,
    marginRight: 10,
  },
  backgroundHeader: {},
});

export default AccordionItem;
