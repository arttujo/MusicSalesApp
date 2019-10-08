import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MapView } from 'expo';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
import { Video } from "expo-av";
import useSingleHooks from "../hooks/SingleHooks";
import { List as BaseList } from "native-base";
import CommentListItem from "../components/CommentListItem";
import FormTextInput from "../components/FormTextInput";
import favouriteHooks from "../hooks/FavouriteHooks";

const Single = (props) => {
  const { fetchUser, getTags, getComments, addComment } = mediaAPI();
  const [username, setUsername] = useState({});
  const [comments, setComments] = useState({});
  const [tags, setTags] = useState();
  const { navigation } = props;
  const file = navigation.state.params.file;
  console.log('single:', file);
  const parsedDesc = JSON.parse(file.description);
  const {
    inputs,
    handleCommentChange,
    handleComment,
    clearForm,
  } = useSingleHooks();
  const { favourite, getPeopleWhoFavourited } = favouriteHooks();
  const [favourites, setFavourites] = useState({});

  const updateFavourites = () => {
    setFavourites("");
    getPeopleWhoFavourited(file.file_id).then(json => {
      console.log("like info update", json.length);
      setFavourites(json);
    });
  };

  useEffect(() => {
    getPeopleWhoFavourited(file.file_id).then(json => {
      console.log("like info", json.length);
      setFavourites(json);
    });
  }, []);

  useEffect(() => {
    fetchUser(file.user_id).then(json => {
      console.log('singleFetchUser', json);
      setUsername(json);
    });
  }, []);

  useEffect(() => {
    getTags(file.file_id).then(json => {
      console.log('tags object:', json[0].tag);
      setTags(json[0].tag);
    });
  }, []);

  useEffect(() => {
    getComments(file.file_id).then(json => {
      console.log('get comments', json);
      setComments(json.reverse());
      console.log('current comments', comments);
    });
  }, []);

  console.log('THIS IS TAGS STATE', tags);

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
          <Title>
            {file.title} By: {username.username}
          </Title>
        </Body>
      </Header>
      <Content>
        <Card>
          <CardItem>
            {file.media_type === 'image' && (
              <Image
                source={{
                  uri:
                    'http://media.mw.metropolia.fi/wbma/uploads/' +
                    file.filename
                }}
                style={{
                  flex: 1,
                  width: null,
                  height: 350,
                }}
              />
            )}
            {file.media_type === 'video' && (
              <Video
                source={{
                  uri:
                    'http://media.mw.metropolia.fi/wbma/uploads/' +
                    file.filename
                }}
                style={{
                  width: '100%',
                  height: 500
                }}
                useNativeControls={true}
              />
            )}
          </CardItem>

          <CardItem>
            <Body>
              <Text>€: {parsedDesc.price}</Text>
            </Body>
            <Body>
              <Text>Description:</Text>
              <Text>{parsedDesc.description}</Text>
              <Text>Tags:</Text>
              <Text>{tags}</Text>
            </Body>
            <Body>
              <Text note>{parsedDesc.Longitude}</Text>
              <Text note>{parsedDesc.Latitude}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Button
              onPress={() => {
                navigation.push('Kartta', { gpsData: file.description });
              }}
            >
              <Text>See Location</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                onPress={() => {
                  favourite(file.file_id);
                  setTimeout(() => {
                    updateFavourites();
                  }, 500);
                }}
              >
                <Text>{favourites.length}</Text>
                <Icon name="snow" />
              </Button>
            </Left>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Item>
              <FormTextInput
                autoCapitalize='none'
                placeholder='add comment'
                value={inputs.comment}
                onChangeText={handleCommentChange}
              />
            </Item>
          </CardItem>
          <CardItem>
            <Button
              onPress={() => {
                handleComment(file.file_id);
                setTimeout(() => {
                  setComments('');
                  getComments(file.file_id).then((json) => {
                    setComments(json.reverse());
                  });
                }, 500);
              }}
            >
              <Text>Post comment</Text>
            </Button>
          </CardItem>
        </Card>

        <BaseList
          dataArray={comments}
          renderRow={(item) => (
            <CommentListItem
              navigation={props.navigation}
              singleComment={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Content>
    </Container>
  );
};
export default Single;
