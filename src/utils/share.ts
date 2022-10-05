/**
 * share helpers
 */

import Share from 'react-native-share';

export const shareContent = async ({
  title,
  message,
  url,
}: {
  title: string;
  message: string;
  url: string;
}) => {
  // const options = Platform.select({
  //   default: ,
  // });

  await Share.open({
    title,
    message: `${message} ${url}`,
  });
};
