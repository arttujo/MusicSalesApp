import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
import mediaAPI from "../hooks/ApiHooks";
import ListItem from "../components/ListItem";
import { List as BaseList } from "native-base";
import List from "../components/List";
import UserFilesListItem from "../components/UserFilesListItem"

import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title,
  Left,
  Icon,
  Card,
  CardItem
} from "native-base";

const MyFiles = props => {
  const { getUserMedia } = mediaAPI();
  const uMedia = getUserMedia();
  const { navigation } = props;

  return (
    <Container>
        <Header>
        <Left>
            <Button transparent onPress={()=>{
              props.navigation.goBack()
            }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
        <Body>
          <Title>My Files</Title>
        </Body>
      </Header>
    <BaseList
    dataArray={uMedia}
    renderRow={( item ) => (
      <UserFilesListItem navigation={props.navigation} singleMedia={item} />
    )}
    keyExtractor={(item, index) => index.toString()}
  />
  </Container>
  );
};
export default MyFiles;
