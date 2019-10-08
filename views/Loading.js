import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {
  ListItem as BaseListItem,
  Left,
  Container,
  Body,
  Right,
  Thumbnail,
  Content,
  Button,
  List,
  Spinner,
  Header
} from 'native-base';

const Loading = props => {
  return (
    <Container>
      <Content>
        <Spinner color='blue' />
      </Content>
    </Container>
  );
};

export default Loading;
