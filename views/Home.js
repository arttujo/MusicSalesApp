import React from "react";
import { StyleSheet, View, ToolbarAndroid, Image, Text } from "react-native";
import List from "../components/List";
import { MediaProvider } from "../contexts/MediaContext";
import PropTypes from "prop-types";
import mediaAPI from "../hooks/ApiHooks";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Left,
  Card,
  CardItem,
  Title,
  Right,
  Icon,
  Button
} from "native-base";

const Home = props => {
  const { userToContext } = mediaAPI();
  userToContext().then(user => {
    console.log("usercontext", user);
  });

  const { navigation } = props;
  const { getUserFromToken } = mediaAPI();
  getUserFromToken();

  return (
    <Container>
      <Header>
        <Body>
          <Title>Music Sales</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              console.log("test");
            }}
          >
            <Icon name="menu"></Icon>
          </Button>
        </Right>
      </Header>

      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
