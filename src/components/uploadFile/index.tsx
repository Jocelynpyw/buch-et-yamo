import { colors } from '@KwUtils/colors';
import React, { FunctionComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import KwIcon from '../Icon';

interface IUploadFile {
  type?: MediaType;
  icon?: string;
  style?: ViewStyle;
  onChange: (file: Asset[]) => void;
}

const KwUploadFile: FunctionComponent<IUploadFile> = ({
  type = 'photo',
  icon = 'picture',
  style,
  onChange,
}) => {
  const options: ImageLibraryOptions = {
    mediaType: type,
  };

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<Asset[]>([]);

  // Image picker

  const handleImagePicker = async () => {
    setLoading(true);

    launchImageLibrary(options, (res: ImagePickerResponse) => {
      if (res.assets) {
        setFile(res.assets);
        onChange(res.assets);
      } else if (res.errorCode === 'permission') {
        // Ask for permission
      }
      setLoading(false);
    });
  };

  const deleteImage = () => {
    setFile([]);
  };

  return (
    <View style={[style, styles.media]}>
      {file.length > 0 && file[0].type?.search('/image/*/') ? (
        <TouchableOpacity onPress={deleteImage}>
          <Image
            source={{
              uri: file[0].uri,
            }}
            style={styles.image}
            key={file[0].uri}
          />
          <TouchableOpacity onPress={deleteImage} style={styles.delete}>
            <KwIcon
              name="close"
              width="15"
              height="15"
              viewBox="-5 -2 30 25"
              stroke={colors.app.white}
              fill={colors.app.white}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleImagePicker}>
          <KwIcon name={icon} viewBox="0 -5 35 35" width={30} height={30} />
        </TouchableOpacity>
      )}
      <View>
        {loading && (
          <ActivityIndicator size="small" color={colors.app.primary} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
  },

  headerBox: {
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: colors.app.white,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    shadowColor: 'rgb(125, 125, 141)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.154138,
    shadowRadius: 11.0,
    elevation: 10,
  },
  paddingHorizontal: { paddingHorizontal: 15 },
  input: {},
  media: {
    flexDirection: 'row',
    // paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginLeft: 3,
    color: colors.text.tertiaryGrey,
  },
  bottomButton: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  delete: {
    backgroundColor: colors.app.primary,
    height: 18,
    width: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  image: {
    height: 46,
    width: 46,
    borderRadius: 8,
  },
});

export default KwUploadFile;
