/**
 * share helpers
 */

import i18n from '@KwSrc/config/i18n/i18n';
import { Platform } from 'react-native';
import Share from 'react-native-share';

export const shareContent = ({
  title,
  message,
  content,
  url,
}: {
  title: string;
  message: string;
  content: string | null;
  url: string;
}) => {
  if (content === null) return;

  const options = Platform.select({
    default: {
      title,
      message: `${message}${content} ${url}`,
    },
  });

  Share.open(options);
};
