import React, { useState } from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import favouriteHooks from '../hooks/FavouriteHooks';
import { AsyncStorage, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Right,
  Icon,
  Button,
  Fab
} from 'native-base';

const Home = (props) => {
  const { userToContext } = mediaAPI();
  userToContext().then((user) => {
    // console.log("usercontext", user);
  });
  const [toggle, setToggle] = useState(false);
  const { navigation } = props;
  const { getUserFromToken } = mediaAPI();
  const { loadFavourites } = favouriteHooks();
  getUserFromToken();

  const navMyFiles = () => {
    props.navigation.push('MyFiles');
  };

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  const navMyFavs = async () => {
    const array = await loadFavourites();
    console.log('array', array);
    props.navigation.push('Favourites', { media: array });
  };

  return (
    <Container>
      <Header >
        <Body>
          <Title>Music Sales</Title>
        </Body>
        <Fab

          active={toggle}
          direction='left'
          style={{backgroundColor: "#3F51B5",}}
          position='topRight'
          onPress={() => setToggle(!toggle)}
          containerStyle={{top: '0%', }}
        >
          <Icon name='menu' />
          <Button
            style={{ backgroundColor: '#34A34F' }}
            onPress={() => navMyFiles()}
          >
            <Icon name='filing' />
          </Button>
          <Button
            style={{ backgroundColor: 'pink' }}
            onPress={() => navMyFavs()}
          >
            <Icon name='heart' />
          </Button>
          <Button
            style={{ backgroundColor: 'red' }}
            onPress={() => signOutAsync()}
          >
            <Icon name='exit' />
          </Button>
        </Fab>
       
      </Header>
     
      <Content>
        <List navigation={navigation}></List>
      </Content>
    </Container>
  );
};

export default Home;
