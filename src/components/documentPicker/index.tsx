import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import * as React from 'react';

import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import { FunctionComponent, useEffect, useState } from 'react';
import { ToastService } from '@KwSrc/services';
import { colors } from '@KwSrc/utils/colors';
import Pdf from 'react-native-pdf';
import KwIcon from '../Icon';

export interface IDocumentFile {
  style?: ViewStyle;

  onSelectDocument: (file: DocumentPickerResponse) => void;
}

const KwUploadDocumentFile: FunctionComponent<IDocumentFile> = ({
  style,
  onSelectDocument,
}) => {
  const [files, setFiles] = useState<
    DocumentPickerResponse[] | undefined | null
  >();
  const [file, setFile] = useState<DocumentPickerResponse>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDocPicker = async () => {
    try {
      setLoading(true);
      const pickerFiles = await DocumentPicker.pick({
        type: types.pdf,
      });
      setFiles(pickerFiles);
      setLoading(false);
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (files && files.length > 0) {
      const temp = files[0];
      const ext = temp.name.split('.').pop();

      if (ext === 'pdf') {
        setFile(file);

        onSelectDocument(temp!);
      } else {
        ToastService.showToast({
          message: 'Comment',
          description: 'You have to select a pdf file',
          type: 'danger',
        });
      }
    }
  }, [file, onSelectDocument, files]);

  const deleteDocument = () => {
    setFiles([]);
    setFile(undefined);
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      console.log('bonjour');
      throw err;
    }
  };

  return (
    <View style={style}>
      {files && files?.length > 0 ? (
        <TouchableOpacity onPress={deleteDocument}>
          <View style={styles.pdfPreview}>
            <Pdf source={{ uri: files[0].uri }} style={styles.pdf} />
          </View>
          <TouchableOpacity onPress={deleteDocument} style={styles.delete}>
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
        <TouchableOpacity onPress={handleDocPicker}>
          <KwIcon
            name="pdf"
            fill={colors.app.primary}
            viewBox="0 -6 46 46"
            width={32}
            height={32}
          />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
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
  pdfPreview: {
    marginRight: 10,
    height: 40,
    width: 40,
    borderRadius: 8,
  },

  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default KwUploadDocumentFile;
