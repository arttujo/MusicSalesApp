import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, AsyncStorage, Alert, Image } from 'react-native';
import FormTextInput from '../components/FormTextInput';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import mediaAPI from '../hooks/ApiHooks';
const validate = require('validate.js');
import { MediaContext } from '../contexts/MediaContext';
import { Video } from 'expo-av';

import {
  Container,
  Header,
  Content,
  Form,
  Button,
  Text,
  Item,
  Left,
  Input,
  Label,
  Body,
  Card,
  CardItem,
  Icon,
  Title,
} from 'native-base';
import useUploadHooks from '../hooks/UploadHooks';
import List from '../components/List';

const Update = (props) => {
  const {
    handleTitleChange,
    inputs,
    handleDescChange,
    handlePriceChange,
  } = useUploadHooks();

  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const { reloadAllMedia, updateFile } = mediaAPI();
  const { media, setMedia } = useContext(MediaContext);
  const { navigation } = props;
  const file = navigation.state.params.file;

  const canSubmit = () => {
    if (inputs.description && inputs.title && inputs.price) {
      return true;
    }
  };
  const isEnabled = canSubmit();

  const validateInputs = (inputs, props) => {
    const constraints = {
      title: {
        presence: {
          message: '^You must enter a title!',
        },
        length: {
          minimum: 5,
          message: '^title must be atleast 5 characters',
        },
      },
      description: {
        presence: {
          message: '^You must give a description of your image!',
        },
        length: {
          minimum: 10,
          message: '^Description must be atleast 10 characters',
        },
      },
      price: {
        presence: {
          message: '^You must give a price!',
        },
      },
      price: {
        presence: {
          message: '^You must give a price!',
        },
      },
    };
    const titleError = validate({ title: inputs.title }, constraints);
    const descError = validate(
      { description: inputs.description },
      constraints
    );
    const priceError = validate({ price: inputs.price }, constraints);
    console.log(titleError, priceError, descError);
    if (!titleError.title && !descError.description && !priceError.price) {
      const moreData = {
        description: inputs.description,
        price: inputs.price,
      };
      console.log(moreData);
      const stringify = JSON.stringify(moreData);
      console.log(stringify);
      const data = {
        title: inputs.title,
        description: stringify,
      };
      console.log(data);
      props.navigation.navigate('Loading');
      updateFile(file.file_id, data);

      Alert.alert(
        'Success',
        'File Updated!',
        [{ text: 'OK', onPress: () => props.navigation.navigate('MyFiles') }],
        { cancelable: false }
      );
    } else {
      const errorArray = [
        titleError.title,
        descError.description,
        priceError.price,
      ];

      for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i]) {
          console.log('alert:', errorArray[i][0]);
          alert(errorArray[i][0]);
        }
      }
    }
  };

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
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Edit Info</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Card>
            <CardItem>
              <Body>
                <Text>Selected Image</Text>
              </Body>
            </CardItem>
            {image && (
              <CardItem>
                <Image
                  source={{
                    uri:
                      'http://media.mw.metropolia.fi/wbma/uploads/' +
                      file.filename,
                  }}
                  style={{
                    flex: 1,
                    width: null,
                    height: 350,
                  }}
                />
              </CardItem>
            )}
          </Card>

          <Item>
            <FormTextInput
              autoCapitalize='none'
              placeholder='Title'
              onChangeText={handleTitleChange}
              value={inputs.title}
              required
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              placeholder='Price'
              onChangeText={handlePriceChange}
              value={inputs.price}
              required
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize='none'
              placeholder='Description'
              onChangeText={handleDescChange}
              value={inputs.description}
              required
            />
          </Item>

          <Button
            disabled={!isEnabled}
            onPress={() => {
              validateInputs(inputs, props);
              console.log('pressed');
            }}
          >
            <Text>Update!</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Update;
