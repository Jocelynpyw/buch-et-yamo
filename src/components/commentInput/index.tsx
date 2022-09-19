import { colors } from '@KwSrc/utils/colors';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { KwButton } from '@KwComponents/button';
import KwIcon from '@KwComponents/Icon';
import i18n from '@KwSrc/config/i18n/i18n';
import { Asset } from 'react-native-image-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import KwUploadFile from '../uploadFile';
import KwUploadDocumentFile from '../documentPicker';

interface Props {
  isLoading?: boolean;
  onSendComment: (
    message: string,
    file: Asset[],
    document?: DocumentPickerResponse,
  ) => void;
}

export default function KwCommentInput({ isLoading, onSendComment }: Props) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<Asset[]>([]);
  const [document, setDocument] = useState<DocumentPickerResponse>();

  const [show, setShow] = useState<boolean>(false);

  function renderDocumentsSelect() {
    if (show) {
      return (
        <View style={styles.fileUploadBox}>
          <KwUploadDocumentFile
            onSelectDocument={(doc) => {
              setDocument(doc);
              setShow(false);
            }}
          />
          <KwUploadFile
            onChange={(file) => {
              setFiles(file);
              setShow(false);
            }}
          />
          <KwButton
            style={styles.closeBtn}
            // color={colors.app.danger}
            disabled={false}
            onPress={() => {
              setShow(!show);
            }}
            icon={
              <KwIcon
                name="closeCircle"
                width="30"
                height="30"
                stroke={colors.app.danger}
                stroke-width="2"
                fill={colors.app.darkBlue}
                viewBox="0 0 24 24"
              />
            }
            iconButton={!!isLoading}
            isLoading={!!isLoading}
          />
        </View>
      );
    }

    return <View />;
  }

  function renderMore() {
    if (!show && !document && files.length === 0) {
      return (
        <KwButton
          style={styles.moreBtn}
          disabled={false}
          onPress={() => {
            setShow(!show);
          }}
          icon={
            <KwIcon
              name="add"
              width="40"
              height="40"
              stroke={colors.app.primary}
              stroke-width="0.3"
              fill={colors.app.primary}
              viewBox="-5 -6 35 35"
            />
          }
          iconButton={!!isLoading}
          isLoading={!!isLoading}
        />
      );
    }

    return <View />;
  }

  function renderDocument() {
    if (document && !show) {
      return (
        <TouchableOpacity onPress={deleteDocument}>
          <View style={styles.pdfPreview}>
            <Pdf
              source={{ uri: document.uri }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
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
      );
    }
    return <View />;
  }

  function renderImage() {
    if (files.length > 0 && !show) {
      return (
        <TouchableOpacity onPress={deleteImage}>
          <Image
            source={{
              uri: files[0].uri,
            }}
            style={styles.image}
            key={files[0].uri}
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
      );
    }
    return <View />;
  }

  const deleteDocument = () => {
    setDocument(undefined);
  };

  const deleteImage = () => {
    setFiles([]);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderDocument()}
        {renderImage()}
        {renderMore()}
        {renderDocumentsSelect()}
        <View style={styles.chatBox}>
          <ScrollView style={{}}>
            <TextInput
              placeholder="Type comment ..."
              // style={styles.textInput}
              multiline
              value={message}
              onChangeText={setMessage}
            />
          </ScrollView>
          <KwButton
            disabled={false}
            onPress={() => {
              onSendComment(message, files, document);
              setMessage('');
              setShow(false);
            }}
            icon={
              <KwIcon
                name="send_message"
                width="60"
                height="60"
                stroke={colors.app.primary}
                stroke-width="0.3"
                fill={colors.app.primary}
                viewBox="-5 -6 40 46"
              />
            }
            size="md"
            iconButton={!!isLoading}
            isLoading={!!isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.app.white,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 3,
    elevation: 5,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  chatBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.app.greyLight,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  chatInput: {
    flex: 1,
  },
  moreBtn: {
    marginRight: 10,
  },
  closeBtn: {
    marginLeft: 0,
  },
  fileUploadBox: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  marginR10: {
    marginRight: 10,
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
  image: {
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
