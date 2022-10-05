import { Images } from 'assets/index';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { StyleProp, View, ActivityIndicator, ViewStyle } from 'react-native';
import { ColorMap } from 'styles/color';
import FastImage from 'react-native-fast-image';

interface Props {
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  borderPlace?: 'full' | 'top' | 'bottom';
  mainUrl?: string;
  backupUrl?: string;
}

interface ImageState {
  url: string;
  loading: boolean;
  showImage: boolean;
  imageError: boolean;
}

enum ImageActionType {
  INIT = 'INIT',
  UPDATE = 'UPDATE',
}

interface ImageAction {
  type: ImageActionType;
  payload: Partial<ImageState>;
}

const ContainerStyle: StyleProp<ViewStyle> = {
  position: 'relative',
  backgroundColor: ColorMap.dark2,
  overflow: 'hidden',
};

const ImageStyle: StyleProp<any> = {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
};

const VideoStyle: StyleProp<any> = {
  width: '100%',
  height: '100%',
};

const IndicatorStyle: StyleProp<any> = {
  width: '100%',
  height: '100%',
  position: 'absolute',
};

const handleReducer = (oldState: ImageState, action: ImageAction) => {
  switch (action.type) {
    case ImageActionType.INIT:
      return handleIntState(action.payload);
    case ImageActionType.UPDATE:
      return { ...oldState, ...action.payload };
  }
};

const handleIntState = (state: Partial<ImageState>) => {
  return { ...DEFAULT_IMAGE_STATE, ...state };
};

const DEFAULT_IMAGE_STATE: ImageState = {
  imageError: false,
  url: '',
  showImage: true,
  loading: true,
};

const ImagePreview = ({ style, mainUrl, backupUrl, borderPlace, borderRadius }: Props) => {
  const [imageState, dispatchImageState] = useReducer(
    handleReducer,
    { ...DEFAULT_IMAGE_STATE, url: backupUrl },
    handleIntState,
  );
  const { url, showImage, imageError, loading } = imageState;

  const borderStyle = useMemo((): StyleProp<ViewStyle> => {
    if (borderRadius) {
      if (borderPlace) {
        switch (borderPlace) {
          case 'full':
            return {
              borderRadius: borderRadius,
            };
          case 'bottom':
            return {
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            };
          case 'top':
            return {
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            };
        }
      }
    }
  }, [borderPlace, borderRadius]);

  const handleOnLoad = useCallback(() => {
    dispatchImageState({ type: ImageActionType.UPDATE, payload: { loading: false } });
  }, []);

  const handleImageError = useCallback(() => {
    dispatchImageState({ type: ImageActionType.UPDATE, payload: { showImage: false } });
  }, []);

  const handleVideoError = useCallback(() => {
    if (backupUrl && url !== backupUrl) {
      dispatchImageState({
        type: ImageActionType.INIT,
        payload: {
          url: backupUrl,
        },
      });
    } else {
      dispatchImageState({
        type: ImageActionType.UPDATE,
        payload: {
          loading: false,
          imageError: true,
        },
      });
    }
  }, [backupUrl, url]);

  useEffect(() => {
    if (url !== mainUrl) {
      dispatchImageState({
        type: ImageActionType.INIT,
        payload: {
          showImage: true,
          url: mainUrl,
          loading: true,
          imageError: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainUrl]);

  return (
    <View style={[ContainerStyle, style, borderStyle]}>
      {showImage ? (
        <FastImage style={ImageStyle} source={{ uri: url }} onLoad={handleOnLoad} onError={handleImageError} />
      ) : !imageError ? (
        <FastImage
          resizeMode={'contain'}
          source={{ uri: url }}
          style={VideoStyle}
          onError={handleVideoError}
          onLoad={handleOnLoad}
        />
      ) : (
        <FastImage style={ImageStyle} source={Images.default} />
      )}
      {loading && <ActivityIndicator style={IndicatorStyle} animating={true} />}
    </View>
  );
};

export default React.memo(ImagePreview);
