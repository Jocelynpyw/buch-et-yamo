/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { colors } from '@KwSrc/utils';

import { ScrollView } from 'react-native-gesture-handler';

interface IVideoModal {
  url: string;
  postUrl: string;
  name: string;
  isVisible?: boolean;
}

export const VideoModel = ({ name, url, isVisible = false }: IVideoModal) => {
  let videoPlayer = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [screenState, setScreenState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });
  const [duration, setDuration] = useState(0);

  const changeState = (values: any) => {
    setScreenState((prevState) => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
  };

  const videoPlayerView = () => (
    <View style={[styles.VideoPlayerContainer, styles.videoConLocal]}>
      <View style={styles.modalHeader}>
        <Text style={styles.cardTitleText}>{name}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}
      transparent
      onRequestClose={() => {
        setModalVisible(false);
      }}
      visible
    >
      <View
        style={styles.ModalWrapper}
        onLayout={(event) => {
          const { layout } = event.nativeEvent;
          changeState({
            Width_Layout: layout.width,
            Height_Layout: layout.height,
          });
        }}
      >
        <Video
          source={{
            uri: url,
          }}
          //  resizeMode="contain"
          // eslint-disable-next-line no-return-assign
          ref={(ref: any) => (videoPlayer = ref)}
          onLoad={onLoad}
          controls
          onBuffer={() => {}} // Callback when remote video is buffering
          onError={() => {}}
          style={{
            aspectRatio: 4 / 9,
          }}
          // fullscreen
          fullscreenAutorotate
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalOutsideContainer: {
    flex: 1,
  },
  ModalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  ModalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  ModalBox: {
    width: '85%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 6,
    borderRadius: 4,
    opacity: 1,
  },
  VideoPlayerContainer: {
    width: '100%',
    height: 150,
  },
  VideoTitle: {
    paddingVertical: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  cardTitleText: {
    fontSize: 18,
    flexShrink: 1,
    lineHeight: 25,
    color: colors.app.white,
    fontFamily: 'Raleway-SemiBold',
    textTransform: 'capitalize',
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    padding: 20,
  },
  videoCon: {
    backgroundColor: colors.app.black,
    height: 300,
    justifyContent: 'center',
  },
  videoConLocal: {
    backgroundColor: colors.app.black,
    height: 500,
    justifyContent: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  centeredView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    width: '100%',
    zIndex: 1000,
    backgroundColor: colors.app.white,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 18,
    color: colors.app.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {
    flexShrink: 1,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 8,
  },
  webViewStyle: {
    flex: 1,
    width: '100%',
    height: 600,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadPos: {
    alignSelf: 'center',
  },
});
