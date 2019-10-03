import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Image, TouchableOpacity, } from "react-native";
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Content,
  Button,
  List
} from "native-base";

const getThumbnail = (url) => {
 // console.log('urli', url);
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
   // console.log('fetsurl');
    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' + url);
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
  const {navigation, singleMedia} = props;
  const tn = getThumbnail(singleMedia.file_id);

  return (
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail
          circle
          large
          source={{ uri:'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160 }}

        />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>
          {singleMedia.description}
        </Text>
      </Body>
      <Right >
        <Button
          onPress={() => {
            navigation.push("Single", { file: singleMedia });
          }}
        >
          <Text>View</Text>
        </Button>
      </Right>
    </BaseListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ListItem;
