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
  Card,
  CardItem
} from "native-base";

const MyFiles = props => {
  const { getUserMedia } = mediaAPI();
  const uMedia = getUserMedia();
  const { navigation } = props;

  return (
    <BaseList
    dataArray={uMedia}
    renderRow={( item ) => (
      <UserFilesListItem navigation={props.navigation} singleMedia={item} />
    )}
    keyExtractor={(item, index) => index.toString()}
  />
  );
};
export default MyFiles;
