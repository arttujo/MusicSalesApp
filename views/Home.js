import React, { useState } from 'react';
import List from '../components/List';
import PropTypes from 'prop-types';
import mediaAPI from '../hooks/ApiHooks';
import favouriteHooks from '../hooks/FavouriteHooks';
import { AsyncStorage } from 'react-native';
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
      <Header>
        <Body>
          <Title>Music Sales</Title>
        </Body>
        <Fab
          active={toggle}
          direction='left'
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position='topRight'
          onPress={() => setToggle(!toggle)}
        >
          <Icon name='menu' />
          <Button
            style={{ backgroundColor: '#34A34F' }}
            onPress={() => navMyFiles()}
          >
            <Icon name='filing' />
          </Button>
          <Button
            style={{ backgroundColor: '#3B5998' }}
            onPress={() => navMyFavs()}
          >
            <Icon name='snow' />
          </Button>
          <Button
            disabled
            style={{ backgroundColor: '#DD5144' }}
            onPress={() => signOutAsync()}
          >
            <Icon name='sad' />
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
