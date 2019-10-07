import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Text,
  Right,
  Thumbnail,
  Content,
  Button,
  List,
  Icon,
  Container,
  Card,
  CardItem
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";

const getThumbnail = url => {
  // console.log('urli', url);
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    // console.log('fetsurl');
    const response = await fetch(
      "http://media.mw.metropolia.fi/wbma/media/" + url
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

const ListItem = props => {
  const { navigation, singleMedia } = props;
  const tn = getThumbnail(singleMedia.file_id);

  const allData = JSON.parse(singleMedia.description);
  const { getOtherUserAvatar, getUserInfo } = mediaAPI();

  const [avatar, setAvatar] = useState(undefined);
  getOtherUserAvatar(singleMedia.user_id).then(result => {
    console.log("getAvatar", result);
    setAvatar(result.url);
  });

  const [username, setUsename] = useState();
  getUserInfo(singleMedia.user_id).then(result => {
    setUsename(result.username);
  });

  return (
    <BaseListItem>
      <Card style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.push("Single", { file: singleMedia });
          }}
        >
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: avatar
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
                  "http://media.mw.metropolia.fi/wbma/uploads/" +
                  singleMedia.filename
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
              <Text>Test</Text>
            </Body>
            <Right>
              <Text>Test</Text>
            </Right>
          </CardItem>
        </TouchableOpacity>
      </Card>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ListItem;
