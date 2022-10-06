import React, { FunctionComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import { colors } from '@KwSrc/utils';
import fontsizes from '@KwSrc/utils/fontsizes';
import RenderHtml from 'react-native-render-html';

import formateDate from '@KwSrc/utils/date';
import { FragmentForumPostBase } from '@KwSrc/screens/forum/graphql/__generated__/FragmentForumPostBase';
import ImageModal from 'react-native-image-modal';
import KwIcon from '../Icon';
import KwAvatar from '../avatar';
import { KwButton } from '../button';
import { PostCardBottomArea } from './postCardBottomArea';

interface KwDetailCardInterface {
  onPressCard: () => void;
  onPressRefresh?: () => void;

  post: FragmentForumPostBase;
  style?: ViewStyle;

  userCanDonate?: boolean;
}

export const KwDetailCard: FunctionComponent<KwDetailCardInterface> = ({
  post,
  style,
  onPressCard,
}) => {
  const [imageWidth, setImageWidth] = useState<number>(0);
  const { width } = useWindowDimensions();

  return (
    <View
      onLayout={(event: LayoutChangeEvent) => {
        setImageWidth(event.nativeEvent.layout.width);
      }}
    >
      <View style={[styles.card, style]}>
        <View style={styles.cardCover}>
          <View style={[styles.headerCard]}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <View>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => {}}>
                    <KwAvatar src={post.createdBy!.avatar!.url} size="small" />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 15 }}>
                    <View>
                      <Text style={styles.nameSmall}>
                        {post.createdBy?.name}
                      </Text>
                    </View>

                    <Text style={styles.timeSmall}>
                      {formateDate({
                        date: String(post!.createdAt),
                        format: 'L',
                        type: 'FROMNOW',
                      })}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <KwButton
                  color={
                    post?.category?.color
                      ? post.category.color
                      : colors.app.primary
                  }
                  size="sm"
                  textStyle={styles.category}
                  children={post.category?.name}
                />
              </View>
            </View>

            <TouchableOpacity onPress={() => {}}>
              <KwIcon
                style={styles.more}
                name="more"
                fill="none"
                stroke={colors.app.black}
                width="32"
                height="35"
                viewBox="0 0 1 40"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle]}>{post.title}</Text>

            <View style={[styles.cardText]}>
              <RenderHtml
                contentWidth={width}
                enableExperimentalMarginCollapsing
                source={{
                  html: `
                          <p style='text-align:left;'>
                          ${post.content}
                          </p>`,
                }}
              />
            </View>

            {post?.image && (
              <View style={styles.imageContent}>
                <ImageModal
                  isTranslucent={false}
                  swipeToDismiss={false}
                  resizeMode="cover"
                  modalImageResizeMode="contain"
                  imageBackgroundColor="#fff"
                  style={[styles.cardImage, { width: 352 }]}
                  source={{
                    uri: post.image?.url,
                  }}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.horizontalStroke} />
        <View>
          <PostCardBottomArea onPress={onPressCard} post={post} />
        </View>
      </View>
    </View>
  );
};
// function getMediaUrlForPost(post: any): string {
//   const noMedia = post?.media === undefined || post?.media === null;
//   const isVidPost =
//     post?.media?.preview !== null || post?.media?.preview !== undefined;
//   if (noMedia) return '';
//   if (isVidPost) {
//     return post?.media?.preview?.url!;
//   }
//   return post?.media?.url!;
// }

// const actionSheetStyle = StyleSheet.create({
//   container: {
//     padding: 15,
//   },
//   item: {
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
// });

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: colors.app.white,
    minHeight: 20,
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 0,
    marginTop: 10,
    marginBottom: 5,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  category: { paddingHorizontal: 5, fontSize: 12 },
  cardText: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: '400',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    lineHeight: 20,
    color: colors.text.black,
  },
  cardTitle: {
    fontSize: 14,
    marginVertical: 5,
    marginTop: 7,
    fontWeight: '700',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    lineHeight: 20,
    color: colors.text.black,
  },
  cardContent: {
    paddingTop: 0,
  },
  cardCover: { paddingHorizontal: 15 },

  imageContent: {
    marginTop: 10,
  },
  cardImage: {
    // height: 200,
    minHeight: 200,
    width: '100%',
    borderRadius: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    fontSize: 11,
    color: colors.app.black,
    position: 'relative',
    left: -10,
  },
  mark: {
    position: 'relative',
    right: 0,
  },
  more: {
    position: 'relative',
    right: -12,
  },
  markIcon: {
    height: 14,
    width: 14,
  },
  marginLeft: {
    marginLeft: 10,
  },
  timeSmall: {
    fontSize: 10,
    color: colors.app.purpleLight,
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
  },
  nameSmall: {
    fontSize: 12,
    fontFamily: fontsizes.FONTS.robotoBody3.fontFamily,
    color: colors.app.black,
    fontWeight: 'bold',
  },
  horizontalStroke: {
    height: 1,
    backgroundColor: colors.app.borderColor,
    marginTop: 10,
    marginBottom: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  marginBottomSmall: {
    marginBottom: 20,
  },

  seeMore: {
    paddingHorizontal: 15,
    color: colors.text.blue,
  },
  videoPoster: {
    top: 0,
    minHeight: 200,
    width: '100%',
    borderRadius: 14,
  },
  play: {
    position: 'absolute',
    marginVertical: 80,
    alignSelf: 'center',
  },
  dangar: {
    color: colors.text.danger,
  },
  dateSponsored: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sponsored: {
    fontWeight: '500',
    fontSize: 12,
    color: colors.text.blue,
    // marginStart: 10,
    // marginEnd: 10,
  },
  imageModal: {
    height: 250,
  },
});
