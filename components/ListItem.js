import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Text,
  Right,
  Thumbnail,
  Icon,
  Card,
  CardItem,
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { format } from 'timeago.js';

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

const ListItem = (props) => {
  const { navigation, singleMedia } = props;
  const tn = getThumbnail(singleMedia.file_id);

  const allData = JSON.parse(singleMedia.description);
  const { getOtherUserAvatar, getUserInfo, getComments } = mediaAPI();

  const [avatar, setAvatar] = useState(undefined);
  getOtherUserAvatar(singleMedia.user_id).then((result) => {
    //console.log("getAvatar", result);
    setAvatar(result.url);
  });

  const [username, setUsename] = useState();
  getUserInfo(singleMedia.user_id).then((result) => {
    setUsename(result.username);
  });

  const time = format(singleMedia.time_added);

  const [commentAmount, setComments] = useState();
  getComments(singleMedia.file_id).then((json) => {
    const total = json.reduce((a, obj) => a + Object.keys(obj).length, 0);
    setComments(total / 5);
  });

  return (
    <BaseListItem>
      <Card style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Single', { file: singleMedia });
          }}
        >
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: avatar,
                }}
                style={{ width: 70, height: 70 }}
              />
              <Body>
                <Text>{singleMedia.title}</Text>
                <Text note>{username}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  'http://media.mw.metropolia.fi/wbma/uploads/' +
                  singleMedia.filename,
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text>Test</Text>
              </Body>
            </Left>
            <Body>
              <Icon name='chatbubbles' />
              <Text>{commentAmount} Comments</Text>
            </Body>
            <Right>
              <Text>{time}</Text>
            </Right>
          </CardItem>
        </TouchableOpacity>
      </Card>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
