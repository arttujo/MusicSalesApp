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
  Right
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
const Single = props => {
  const { fetchUser } = mediaAPI();
  const [username, setUsername] = useState({});
  const { navigation } = props;
  const file = navigation.state.params.file;
  console.log("single:", file);

  useEffect(() => {
    fetchUser(file.user_id).then(json => {
      console.log("singleFetchUser", json);
      setUsername(json);
    });
  }, []);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Text>
                {file.title} By: {username.username}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            {file.media_type === 'image' &&
            <Image
              source={{
                uri:
                  "http://media.mw.metropolia.fi/wbma/uploads/" + file.filename
              }}
              style={{
                flex: 1,
                width: null,
                height: 350
              }}
            />
            }
            {file.media_type === 'video' &&
              <Video source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
                style={{
                  width: '100%',
                  height: 500,
                }}
                useNativeControls={true}
              />
              }
          </CardItem>

          <CardItem>
            <Body>
              <Text>Description</Text>
              <Text>{file.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Single;
