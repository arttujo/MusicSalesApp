import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Image, TouchableOpacity,Alert } from "react-native";
import mediaAPI from "../hooks/ApiHooks";
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



const UserFilesListItem = props => {
  const {deleteFile,getUserMedia} = mediaAPI()
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
      <Right style={{flex:1,flexDirection:"row", justifyContent:"space-between"}}>
      <Button
          onPress={() => {
            deleteFile(singleMedia.file_id);
            props.navigation.goBack()
            Alert.alert(
              "Success",
              "File Deleted!",
              [{ text: "OK", onPress: () => props.navigation.push("MyFiles") }],
              { cancelable: false }
            );
          }}
        >
          <Text>Delete</Text>
        </Button>

        <Button
          onPress={() => {
            props.navigation.push("Update",{file: singleMedia})
          }}
        >
          <Text>Update</Text>
        </Button>
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

UserFilesListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default UserFilesListItem;
