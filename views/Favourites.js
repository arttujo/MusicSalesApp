import React, {useState, useEffect} from "react";
import mediaAPI from "../hooks/ApiHooks";
import { List as BaseList } from "native-base";
import FavouritesListItem from "../components/FavouritesListItem";

import {
  Container,
  Header,
  Button,
  Body,
  Title,
  Left,
  Icon
} from "native-base";
import favouriteHooks from "../hooks/FavouriteHooks";

const Favourites = props => {
  const {getOwnFavourites} = favouriteHooks();
  const [media, setMedia] = useState({});

  useEffect(() => {
    setMedia(getOwnFavourites);
  }, []);
  console.log("favourite Media", media);

  const { navigation } = props;

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
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>My Files</Title>
        </Body>
      </Header>
      <BaseList
        dataArray={media}
        renderRow={item => (
          <FavouritesListItem navigation={props.navigation} singleMedia={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};
export default Favourites;
