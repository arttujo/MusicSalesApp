import React from "react";
import mediaAPI from "../hooks/ApiHooks";
import { List as BaseList } from "native-base";
import List from "../components/List";
import UserFilesListItem from "../components/UserFilesListItem";

import {
  Container,
  Header,
  Button,
  Body,
  Title,
  Left,
  Icon
} from "native-base";

const MyFiles = props => {
  const { getUserMedia } = mediaAPI();
  const uMedia = getUserMedia();

  console.log("uMedia", uMedia);

  const { navigation } = props;

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
          <Title>My Files</Title>
        </Body>
      </Header>
      <BaseList
        dataArray={uMedia}
        renderRow={item => (
          <UserFilesListItem navigation={props.navigation} singleMedia={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};
export default MyFiles;
