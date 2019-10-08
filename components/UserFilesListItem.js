import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import mediaAPI from '../hooks/ApiHooks';
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Content,
  Button,
  List,
  Icon,
} from 'native-base';

const getThumbnail = (url) => {
  // console.log('urli', url);
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    // console.log('fetsurl');
    const response = await fetch(
      'http://media.mw.metropolia.fi/wbma/media/' + url
    );
    const json = await response.json();
    //console.log('json tnail', json);
    setThumbnails(json.thumbnails);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return thumbnails;
};

const UserFilesListItem = (props) => {
  const { deleteFile, getUserMedia } = mediaAPI();
  const { navigation, singleMedia } = props;
  const tn = getThumbnail(singleMedia.file_id);
  const allData = JSON.parse(singleMedia.description);

  return (
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail
          circle
          large
          source={{
            uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160,
          }}
        />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>
          {allData.description}
        </Text>
      </Body>
      <Right
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onPress={() => {
            Alert.alert(
              'Warning',
              'Are you sure you want to delete this post?',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    deleteFile(singleMedia.file_id),
                      props.navigation.navigate('Loading'),
                      setTimeout(() => {
                        props.navigation.push('MyFiles');
                      }, 500);
                  }
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                }
              ],

              { cancelable: true }
            );
          }}
        >
          <Icon name='trash' />
        </Button>

        <Button
          onPress={() => {
            props.navigation.push('Update', { file: singleMedia });
          }}
        >
          <Icon name='settings' />
        </Button>
        <Button
          onPress={() => {
            navigation.push('Single', { file: singleMedia });
          }}
        >
          <Icon name='play' />
        </Button>
      </Right>
    </BaseListItem>
  );
};

UserFilesListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default UserFilesListItem;
