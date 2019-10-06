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
  const {
    userToContext,
    reloadCategoryMedia,
    handleMenuChange,
    inputs,
  } = mediaAPI();

  userToContext().then((user) => {
    console.log('usercontext', user);
  });

  const { navigation } = props;
  const { getUserFromToken } = mediaAPI();
  const { setMedia } = useContext(MediaContext);
  getUserFromToken();
  setMedia({});

  return (
    <Container>
      <Header>
        <Body>
          <Title>Music Sales</Title>
          <Item picker>
            <Picker
              mode='dropdown'
              iosIcon={<Icon name='arrow-down' />}
              style={{ width: 50 }}
              placeholder='Select item category'
              placeholderStyle={{ color: '#ffffff' }}
              placeholderIconColor='#000000'
              selectedValue={inputs.pickedcategory}
              onValueChange={handleMenuChange}
            >
              <Picker.Item label='Guitars' value='music-sales_guitars' />
              <Picker.Item label='Drums' value='music-sales_drums' />
              <Picker.Item label='Amplifiers' value='music-sales_amplifiers' />
              <Picker.Item label='Trombones' value='music-sales_trombones' />
              <Picker.Item label='Equipment' value='music-sales_equipment' />
            </Picker>
          </Item>
        </Body>
      </Header>
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
