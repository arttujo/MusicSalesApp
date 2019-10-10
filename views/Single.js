import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-native';
import { MapView } from 'expo';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Toast
} from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import { Video } from 'expo-av';
import useSingleHooks from '../hooks/SingleHooks';
import { List as BaseList } from 'native-base';
import CommentListItem from '../components/CommentListItem';
import FormTextInput from '../components/FormTextInput';
import favouriteHooks from '../hooks/FavouriteHooks';
import { MediaContext } from '../contexts/MediaContext';
import { isAvailable } from 'expo/build/AR';

const Single = (props) => {
  const { fetchUser, getTags, getComments } = mediaAPI();
  const { user } = useContext(MediaContext);
  const [username, setUsername] = useState({});
  const [comments, setComments] = useState({});
  const [isFavourite, setIsFavourite] = useState();
  const [tags, setTags] = useState();
  const { navigation } = props;
  const file = navigation.state.params.file;
  //console.log('single:', file);
  const parsedDesc = JSON.parse(file.description);
  const {
    inputs,
    handleCommentChange,
    handleComment,
    clearForm
  } = useSingleHooks();
  const { favourite, getPeopleWhoFavourited } = favouriteHooks();
  const [favourites, setFavourites] = useState({});

  const updateFavourites = () => {
    setFavourites('');
    getPeopleWhoFavourited(file.file_id).then((json) => {
      //console.log('like info update', json.length);
      setFavourites(json);
    });
  };

  useEffect(() => {
    getPeopleWhoFavourited(file.file_id).then((json) => {
      //console.log('like info', json.length);
      setFavourites(json);
    });
  }, []);

  useEffect(() => {
    fetchUser(file.user_id).then((json) => {
      //console.log('singleFetchUser', json);
      setUsername(json);
    });
  }, []);

  useEffect(() => {
    getTags(file.file_id).then((json) => {
      //console.log('tags object:', json.tag);
      setTags(json.tag);
    });
  }, []);

  useEffect(() => {
    getComments(file.file_id).then((json) => {
      //console.log('get comments', json);
      setComments(json.reverse());
      //console.log('current comments', comments);
    });
  }, []);

  const userFavourited = async () => {
    const array = await getPeopleWhoFavourited(file.file_id);
    console.log('------', user.user_id);
    console.log('========', array);
    if (array.some((item) => item.user_id === user.user_id)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

  useEffect(() => {
    userFavourited();
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
                  height: 350
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
            <Text>{parsedDesc.description}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>€: {parsedDesc.price}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Left>
              <Button
                onPress={() => {
                  if (!parsedDesc.Latitude || !parsedDesc.Longitude) {
                    console.log('no map data');
                    Toast.show({
                      text: 'No location data',
                      buttonText: 'Okay'
                    });
                  } else {
                    navigation.push('Kartta', { gpsData: file.description });
                  }
                }}
              >
                <Text>See Location</Text>
              </Button>
            </Left>
            <Body>
              <Text> Contact Info: {parsedDesc.contactInfo}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                onPress={() => {
                  favourite(file.file_id);
                  setTimeout(() => {
                    updateFavourites();
                    userFavourited(file.file_id);
                  }, 500);
                }}
              >
                <Text>{favourites.length}</Text>
                {isFavourite === false && (
                  <Icon active={false} name='heart-empty' />
                )}
                {isFavourite === true && <Icon active={true} name='heart' />}
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
