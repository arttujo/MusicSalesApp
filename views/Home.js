import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ToolbarAndroid, Image, Text } from 'react-native';
import List from '../components/List';
import { MediaProvider } from '../contexts/MediaContext';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Body,
  Left,
  Card,
  CardItem,
  Title,
  Picker,
} from 'native-base';
import { MediaContext } from '../contexts/MediaContext';

const Home = (props) => {
  const { userToContext } = mediaAPI();

  userToContext().then((user) => {
    console.log('usercontext', user);
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
      </Header>
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
