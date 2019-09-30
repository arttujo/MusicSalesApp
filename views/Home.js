import React from "react";
import { StyleSheet, View, ToolbarAndroid, Image, Text } from "react-native";
import List from "../components/List";
import { MediaProvider } from "../contexts/MediaContext";
import { Container, Content } from "native-base";
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';




const Home = props => {
  const {userToContext} = mediaAPI();
  userToContext().then((user) => {
    console.log('usercontext', user);
  });

  const { navigation } = props;
  const {getUserFromToken} = mediaAPI();
  getUserFromToken();


  return (
    <Container>
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
