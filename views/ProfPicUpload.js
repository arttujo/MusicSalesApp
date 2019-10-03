import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, AsyncStorage, Alert, Image } from "react-native";
import FormTextInput from "../components/FormTextInput";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import mediaAPI from "../hooks/ApiHooks";
import { MediaContext } from "../contexts/MediaContext";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Text,
  Input,
  Button,
  Label,
  Icon,
  Left,
  Body,
  Right,
  Card,
  Title,
  CardItem
} from "native-base";
import useUploadHooks from "../hooks/UploadHooks";
import List from "../components/List";

const ProfPicUpload = props => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    reloadAllMedia,
    setDefaultTag,
    uploadAvatar,
    uploadFile,
    addTag,
    deleteFile,
    getAvatar
  } = mediaAPI();
  const { media, setMedia } = useContext(MediaContext);
  const { handleAvatarChange } = useUploadHooks();

  const [avatar, setAvatar] = useState(undefined);
  getAvatar().then(result => {
    console.log("getAvatar",result)
    setAvatar(result.id);
  });

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log("Picked Image:", result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  });

  const { inputs, clearForm } = useUploadHooks();


  const canSubmit = () => {
    const isEmpty = obj => {
      return Object.getOwnPropertyNames(obj).length >= 1;
    };

    console.log(image);
    if (isEmpty(image)) {
      return true;
    }
  };

  const isEnabled = canSubmit();


  const changeAvatar = (img) =>{
    deleteFile(avatar)
    handleAvatarChange(img)
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Change Avatar</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Card>
            <CardItem>
              <Button
                onPress={() => {
                  _pickImage();
                }}
              >
                <Text>Pick Avatar</Text>
              </Button>
            </CardItem>
            <CardItem></CardItem>
            {image && (
              <CardItem>
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    flex: 1,
                    width: null,
                    height: 350
                  }}
                />
              </CardItem>
            )}
          </Card>
          <Button
            disabled={!isEnabled}
            onPress={() => {
              changeAvatar(image);
            }}
          >
            <Text>Upload!</Text>
          </Button>
          <Button
            onPress={() => {
              clearForm();
              setImage();
            }}
          >
            <Text>Clear Form</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
export default ProfPicUpload;
