import { FragmentForumCommentBase } from '@KwSrc/screens/forum/graphql/__generated__/FragmentForumCommentBase';
import { colors, fontsizes } from '@KwSrc/utils';
import formateDate from '@KwSrc/utils/date';
import React, { FunctionComponent, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import ImageModal from 'react-native-image-modal';
import ReactNativeBlobUtil from 'react-native-blob-util';
import PrAvatar from '../avatar';
import KwIcon from '../Icon';

export interface Props {
  comment: FragmentForumCommentBase;
}

const KwComment: FunctionComponent<Props> = ({ comment }) => {
  const [imageWidth, setImageWidth] = useState<number>(0);
  const { width } = useWindowDimensions();

  const downloadDocs = () => {
    const downloadpath = `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${comment.document?.filename}`;
    ReactNativeBlobUtil.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        mediaScannable: true,
        path: downloadpath,
      },
    }).fetch('GET', String(comment.document?.url));
  };
  const navigation = useNavigation();
  return (
    <View
      onLayout={(event: LayoutChangeEvent) => {
        setImageWidth(event.nativeEvent.layout.width);
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('profile', {
              userId: comment?.createdBy?._id,
              title: comment?.createdBy?.name,
            });
          }}
        >
          <PrAvatar src={String(comment.createdBy?.avatar?.url)} size="small" />
        </TouchableOpacity>

        <View style={styles.body}>
          <View style={styles.contentBox}>
            <TouchableOpacity style={styles.userTime}>
              <Text style={styles.title}>{comment.createdBy?.name}</Text>
              <Text style={styles.commentItem}>
                {formateDate({
                  date: String(comment.createdAt),
                  format: 'L',
                  type: 'FROMNOW',
                })}
              </Text>
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.commentBox}>
                <RenderHtml
                  enableExperimentalMarginCollapsing
                  contentWidth={width}
                  source={{
                    html: `
                          <p style='text-align:left;, '>
                          ${comment.content}
                          </p>`,
                  }}
                />

                {comment?.image && (
                  <View style={styles.imageContent}>
                    <ImageModal
                      isTranslucent={false}
                      swipeToDismiss={false}
                      resizeMode="cover"
                      modalImageResizeMode="contain"
                      imageBackgroundColor="#fff"
                      style={[styles.cardImage, { width: imageWidth }]}
                      source={{
                        uri: comment.image?.url,
                      }}
                    />
                  </View>
                )}
                {comment?.document && (
                  <TouchableOpacity
                    style={styles.documentContent}
                    onPress={downloadDocs}
                  >
                    <KwIcon
                      style={styles.documentIcon}
                      name="pdf"
                      viewBox="0 0 35 35"
                      fill={colors.app.darkDanger}
                      width={40}
                      height={40}
                    />
                    <Text style={styles.documentFilename}>
                      {comment.document.filename}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.commentFooter} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default KwComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 20,
    backgroundColor: colors.app.white,
    borderTopWidth: 1,
    paddingHorizontal: 5,
    // marginTop: 20,
    borderRadius: 10,
    paddingBottom: 20,
    borderColor: colors.text.secondaryGrey,
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  contentBox: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
  },
  commentBox: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: fontsizes.FONTS.robotoBody1.fontFamily,
    fontSize: fontsizes.SIZES.body4,
    marginBottom: 5,
    marginEnd: 10,
  },
  comment: {
    lineHeight: 20,
    paddingRight: 10,
  },
  commentFooter: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentItem: {
    color: colors.text.secondary,
    marginRight: 10,
    fontSize: 12,
    marginTop: 2,
  },
  commentReply: {
    fontSize: 8,
  },
  userTime: {
    flexDirection: 'row',
  },
  imageContent: {
    marginTop: 10,
    flex: 1,
  },
  cardImage: {
    // height: 200,
    minHeight: 100,
    maxWidth: '100%',
    borderRadius: 14,
  },
  documentContent: {
    backgroundColor: colors.app.backgroundGrey,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentFilename: {
    flex: 1,
    fontSize: 12,
  },
  documentIcon: {
    marginRight: 10,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
