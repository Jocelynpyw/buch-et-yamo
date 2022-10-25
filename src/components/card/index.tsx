import React, { FunctionComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { colors } from '@KwSrc/utils';
import fontsizes from '@KwSrc/utils/fontsizes';
import i18n from '@KwSrc/config/i18n/i18n';
// import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';
import formateDate from '@KwSrc/utils/date';
import { FragmentForumPostBase } from '@KwSrc/screens/forum/graphql/__generated__/FragmentForumPostBase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import KwIcon from '../Icon';
import KwAvatar from '../avatar';
// import { PostCardBottomArea } from './postCardBottomArea';
import { KwButton } from '../button';
import { PostCardBottomArea } from './postCardBottomArea';

interface KwCardInterface {
  onPressCard: () => void;
  onPressRefresh?: () => void;

  post: FragmentForumPostBase;
  style?: ViewStyle;

  userCanDonate?: boolean;
}

export const KwCard: FunctionComponent<KwCardInterface> = ({
  post,
  style,
  onPressCard,
}) => {
  const [showMore, setShowMore] = useState(false);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('profile', {
                      userId: post?.createdBy?._id,
                      title: post?.createdBy?.name,
                    });
                  }}
                >
                  <KwAvatar
                    src={String(post?.createdBy?.avatar?.url)}
                    size="small"
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 15 }}>
                  <View>
                    <Text style={styles.nameSmall}>{post.createdBy?.name}</Text>
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
                children={post.category?.name || 'No Category'}
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

          {post.content !== undefined ? (
            (post?.content?.length || -1) > 120 ? (
              showMore ? (
                <TouchableOpacity onPress={onPressCard}>
                  <View style={[styles.cardText]}>
                    <RenderHtml
                      enableExperimentalMarginCollapsing
                      contentWidth={width}
                      source={{
                        html: `
                          <p style='text-align:left;'>
                          ${post.content}
                          </p>`,
                      }}
                    />

                    <Text style={[styles.seeMore]}>
                      {'  '}
                      {i18n.t('COMMON__SHOW_LESS')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    (post?.content?.length || -1) > 120
                      ? setShowMore(!showMore)
                      : onPressCard()
                  }
                >
                  <View style={[styles.cardText]}>
                    <RenderHtml
                      contentWidth={width}
                      enableExperimentalMarginCollapsing
                      source={{
                        html: `
                          <p style='text-align:left;'>
                          ${post!.content!.slice(0, 120)}...  
                          </p>`,
                      }}
                    />

                    <Text style={[styles.seeMore]}>
                      {i18n.t('COMMON__SHOW_MORE')}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity onPress={onPressCard} style={[styles.cardText]}>
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
              </TouchableOpacity>
            )
          ) : (
            <View />
          )}

          {post?.image && (
            <TouchableOpacity style={styles.imageContent} onPress={onPressCard}>
              <FastImage
                style={[styles.cardImage]}
                source={{
                  uri: post!.image?.url,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.horizontalStroke} />
      <View>
        <PostCardBottomArea onPress={onPressCard} post={post} />
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
    marginVertical: 2,
    fontWeight: '400',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    lineHeight: 20,
    color: colors.text.black,
  },
  cardTitle: {
    fontSize: 14,
    marginVertical: 2,
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
    marginTop: 2,
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
});
