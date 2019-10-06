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
  Button,
  Picker
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
          <Form>
            <Picker note mode="dropdown" style={{ width: 120 }} >
              <Picker.Item label="Home" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
          </Form>
          {/* <Button
            transparent
            onPress={() => {
              console.log("test");
            }}
          >
            <Icon name="menu"></Icon>
          </Button> */}
        </Right>
      </Header>

      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
