import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, TouchableOpacity, } from "react-native";
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
  Icon
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


  const allData = JSON.parse(singleMedia.description)


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
        <Text>
          {allData.description}
        </Text>
      </Body>
      <Right >

        <Button
          onPress={() => {
            navigation.push("Single", { file: singleMedia });
          }}
        >
          <Icon name = "play"/>
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
