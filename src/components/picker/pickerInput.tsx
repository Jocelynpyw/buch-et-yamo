import { colors } from '@KwSrc/utils';
import { FunctionComponent } from 'enzyme';
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import PrIcon from '../Icon';
import KwPickerItem from './pickerItem';

interface Iinput {
  placeholder?: string;
  data?: Iitem[];
  selectedItem?: Iitem;
  onSelectedItem(i: Iitem): void;
}
export interface Iitem {
  label?: string;
  value: string;
  image?: ImageSourcePropType;
}

const KwPickerInput: FunctionComponent<Iinput> = (input: Iinput) => {
  const { placeholder, data } = input;

  const actionSheetRef = useRef<ActionSheet>(null);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => actionSheetRef.current?.show()}>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>
              {input.selectedItem ? input.selectedItem.label : placeholder}
            </Text>
          </View>

          <PrIcon
            style={styles.icon}
            name="dropdown"
            width="30"
            height="30"
            viewBox="-10 -14 30 30"
          />
        </View>
      </TouchableWithoutFeedback>
      <ActionSheet
        ref={actionSheetRef}
        keyboardShouldPersistTaps="handled"
        openAnimationSpeed={7}
        bounceOnOpen
        gestureEnabled
        headerAlwaysVisible
        closeOnTouchBackdrop
      >
        <FlatList
          data={data}
          style={{ padding: 10 }}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <KwPickerItem
              label={item.label}
              onPress={() => {
                actionSheetRef.current?.hide();
                input.onSelectedItem(item);
              }}
            />
          )}
        />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.app.white,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.text.primary,
    borderColor: colors.text.primary,
    backgroundColor: colors.app.white,
  },
  icon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: colors.app.grey,
  },
});

export default KwPickerInput;
