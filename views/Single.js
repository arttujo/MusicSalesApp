import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,Title,
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
import { Video } from "expo-av";
const Single = props => {
  const { fetchUser, getTags } = mediaAPI();
  const [username, setUsername] = useState({});
  const [tags, setTags] = useState();
  const { navigation } = props;
  const file = navigation.state.params.file;
  console.log("single:", file);

  useEffect(() => {
    fetchUser(file.user_id).then(json => {
      console.log("singleFetchUser", json);
      setUsername(json);
    });
  }, []);

  useEffect(() => {
    getTags(file.file_id).then(json => {
      console.log("tags object:", json[0].tag);
      setTags(json[0].tag);
    });
  }, []);

  console.log("THIS IS TAGS STATE", tags);

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
          <Title>{file.title} By: {username.username}</Title>
        </Body>
      </Header>
      <Content>
        <Card>

          <CardItem>
            {file.media_type === "image" && (
              <Image
                source={{
                  uri:
                    "http://media.mw.metropolia.fi/wbma/uploads/" +
                    file.filename
                }}
                style={{
                  flex: 1,
                  width: null,
                  height: 350
                }}
              />
            )}
            {file.media_type === "video" && (
              <Video
                source={{
                  uri:
                    "http://media.mw.metropolia.fi/wbma/uploads/" +
                    file.filename
                }}
                style={{
                  width: "100%",
                  height: 500
                }}
                useNativeControls={true}
              />
            )}
          </CardItem>

          <CardItem>
            <Body>
              <Text>Description:</Text>
              <Text>{file.description}</Text>
              <Text>Tags:</Text>
              <Text>{tags}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Single;
