import React, { FunctionComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { colors } from '@KwSrc/utils';
import fontsizes from '@KwSrc/utils/fontsizes';
import RenderHtml from 'react-native-render-html';
import Video from 'react-native-video';

// import ImageModal from 'react-native-image-modal';
import { QueryVideoByCategory_VideoMany_media } from '@KwSrc/screens/study/graphql/__generated__/QueryVideoByCategory';
// import KwIcon from '../Icon';
// import KwAvatar from '../avatar';
// import { KwButton } from '../button';

interface KwDetailVideoCardInterface {
  onPressRefresh?: () => void;
  description?: string;
  media: QueryVideoByCategory_VideoMany_media;
  style?: ViewStyle;
  title?: string;

  userCanDonate?: boolean;
}

export const KwDetailVideoCard: FunctionComponent<
  KwDetailVideoCardInterface
> = ({ media, style, title, description = '' }) => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <View style={[styles.card, style]}>
        <View style={styles.cardCover}>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle]}>{title}</Text>
            <View style={[styles.cardText]}>
              <Video
                source={{ uri: media.hlsUrl || media.url }} // Can be a URL or a local file.
                // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                controls
                disableFocus
                paused
              />
              <RenderHtml
                contentWidth={width}
                enableExperimentalMarginCollapsing
                source={{
                  html: `
                          <p style='text-align:left;'>
                          ${description}
                          </p>`,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.horizontalStroke} />
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
    flex: 1,
  },
  cardImage: {
    // height: 200,
    minHeight: 200,
    maxWidth: '100%',
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
    minHeight: 200,
    width: '100%',
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
