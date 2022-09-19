import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import { colors } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import KwHearder from '@KwSrc/components/header';
import KwDefaultInput from '@KwSrc/components/defaultInput';
import KwUploadFile from '@KwSrc/components/uploadFile';
import { Asset } from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { CreateOneForumPostInput } from '@KwSrc/globalTypes';
import { useMutation, useQuery } from '@apollo/client';
import { ToastService } from '@KwSrc/services';
import { RouteProp } from '@react-navigation/native';
import {
  MutationAddForumPost,
  MutationAddForumPostVariables,
} from '../graphql/__generated__/MutationAddForumPost';
import { MUTATION_ADD_FORUM_POST } from '../graphql/mutation';
import { ForumStackParamList, ForumStackRouteList } from '../constants';
import {
  QUERY_FORUM_CATEGORY_MANY,
  QUERY_FORUM_POST_RELAY_PAGINATION,
} from '../graphql/queries';
import { QueryForumCategoryMany } from '../graphql/__generated__/QueryForumCategoryMany';
import { FragmentForumCategoryBase } from '../graphql/__generated__/FragmentForumCategoryBase';

const ForumAddQuestionScreen: FunctionComponent<
  ForumAddQuestionScreenProps
> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [files, setFiles] = useState<Asset[]>([]);
  const [errors, setErrors] = useState<CreateOneForumPostInput>({
    content: '',
    title: '',
  });

  const queryCategoryMany = useQuery<QueryForumCategoryMany>(
    QUERY_FORUM_CATEGORY_MANY,
    {},
  );

  const [categories, setCategories] = useState<any | null | undefined>(
    queryCategoryMany.data?.forumCategoryMany,
  );

  useEffect(() => {
    setCategories(queryCategoryMany.data?.forumCategoryMany);
  }, [queryCategoryMany.data]);

  const [addPost, { loading }] = useMutation<
    MutationAddForumPost,
    MutationAddForumPostVariables
  >(MUTATION_ADD_FORUM_POST, {
    onCompleted() {
      navigation.navigate(ForumStackRouteList.ForumHomeTab as any);
      ToastService.showToast({
        message: i18n.t('COMMON__POSTS'),
        description: i18n.t('CREATEPOST__SCREEN_SUCCESS'),
        type: 'success',
      });
    },
    refetchQueries: [
      {
        query: QUERY_FORUM_POST_RELAY_PAGINATION,
        variables: { page: 1 },
      },
    ],
  });

  const validateForm = useCallback(() => {
    const obj: CreateOneForumPostInput = {};

    if (title === '') {
      obj.title = i18n.t('CREATEPOST__SCREEN_NOTITLE_TEXT');
      ToastService.showToast({
        message: i18n.t('COMMON__POSTS'),
        description: obj.title!,
        type: 'danger',
      });
    } else if (content === '') {
      obj.content = i18n.t('CREATEPOST__SCREEN_NOCONTENT_TEXT');
      ToastService.showToast({
        message: i18n.t('COMMON__POSTS'),
        description: obj.content!,
        type: 'danger',
      });
    } else if (selectedCategory === undefined) {
      obj.categoryId = 'error while creating post';
      ToastService.showToast({
        message: i18n.t('COMMON__POSTS'),
        description: obj.content!,
        type: 'danger',
      });
    }

    setErrors(obj);

    // check if form valid
    return !Object.keys(obj).length;
  }, [content, selectedCategory, title]);

  const Post = useCallback(() => {
    if (validateForm()) {
      setErrors({});

      let file: ReactNativeFile | undefined;

      const forumPost: CreateOneForumPostInput = {
        content,
        title,
        categoryId: selectedCategory,
      };

      if (files.length > 0 && files[0].uri) {
        file = new ReactNativeFile({
          uri: files[0].uri,
          name: files[0].fileName,
          type: files[0].type,
        });

        forumPost.image = file;
      }

      addPost({
        variables: {
          post: forumPost,
        },
      });
    }
  }, [addPost, content, files, selectedCategory, title, validateForm]);

  return (
    <View style={styles.container_one}>
      <KwHearder
        back
        title="Ask Question"
        buttonTitle="Publish "
        onPressButton={Post}
        button
        loading={loading}
        iconButton
        remove
      />

      <View style={styles.contain}>
        <Text style={styles.text}>{i18n.t('COMMON__SUBJECT')}</Text>
        <View>
          <View style={styles.pickerContainer}>
            <Picker
              mode="dropdown"
              style={styles.picker}
              itemStyle={styles.itemPicker}
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Select a category" value={undefined} />
              {categories &&
                categories.map((cat: FragmentForumCategoryBase) => (
                  <Picker.Item label={cat.name} value={cat._id} key={cat._id} />
                ))}
            </Picker>
          </View>
        </View>
        <Text style={styles.text}> {i18n.t('COMMON__TITLE')}</Text>
        <KwDefaultInput
          placeholder="Enter post title"
          borderColor={colors.app.white}
          onChangeText={(name, text) => {
            setTitle(text);
          }}
        />

        <Text style={styles.text}> {i18n.t('COMMON__DESCIPTION')} </Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          numberOfLines={10}
          multiline
          keyboardType="name-phone-pad"
          textAlignVertical="top"
          onChangeText={(text) => setContent(text)}
        />
        <KwUploadFile
          style={styles.uploadInput}
          onChange={(file) => {
            setFiles(file);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,
  },
  text: {
    fontWeight: '700',
    color: colors.text.black,
    fontSize: 14,
    marginVertical: 8,
  },
  comments: {
    marginHorizontal: 5,
    borderColor: colors.app.white,
  },
  containerDetail: { paddingHorizontal: 5 },
  contain: { padding: 20 },
  picker: {
    width: '100%',
    backgroundColor: colors.app.white,
    borderColor: colors.app.black,
    borderWidth: 20,
    borderRadius: 20,
  },
  pickerContainer: {
    borderRadius: 15,
    borderWidth: 2,
    overflow: 'hidden',
    height: 50,
    padding: 0,
    backgroundColor: '#FFF',
    borderColor: colors.app.backgrounfGray,
  },
  input: {
    backgroundColor: colors.app.white,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  itemPicker: {
    width: 300,
    alignContent: 'center',
    textAlign: 'center',
  },
  uploadInput: {
    marginTop: 20,
  },
  loader: {
    flex: 1,
    position: 'absolute',
    height: 100,
    width: 100,
  },
});

export default ForumAddQuestionScreen;

interface ForumAddQuestionScreenProps {
  route: RouteProp<
    ForumStackParamList,
    typeof ForumStackRouteList.ForumAddQuestion
  >;

  navigation: StackNavigationProp<
    ForumStackParamList,
    typeof ForumStackRouteList.ForumAddQuestion
  >;
}
