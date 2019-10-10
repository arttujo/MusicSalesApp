import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as BaseListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Content,
  Button,
  Icon,
  Text
} from 'native-base';
import favouriteHooks from '../hooks/FavouriteHooks';

const getThumbnail = (url) => {
  // console.log('urli', url);
  const [thumbnails, setThumbnails] = useState({});
  async function fetchUrl() {
    // console.log('fetsurl');
    const response = await fetch(
      'http://media.mw.metropolia.fi/wbma/media/' + url
    );
    const json = await response.json();
    //console.log('json tnail', json);
    setThumbnails(json.thumbnails);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return thumbnails;
};

const FavouritesListItem = (props) => {
  const { navigation, singleMedia } = props;
  const tn = getThumbnail(singleMedia.file_id);
  const allData = JSON.parse(singleMedia.description);
  const { removeFavourite, loadFavourites } = favouriteHooks();

  const navToFavs = async () => {
    const array = await loadFavourites();
    console.log('array', array);
    props.navigation.push('Favourites', { media: array });
  };

  return (
    <BaseListItem thumbnail>
      <Left>
        <Thumbnail
          circle
          large
          source={{
            uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + tn.w160
          }}
        />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>
          {allData.description}
        </Text>
      </Body>
      <Right
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Button
          danger
          onPress={() => {
            removeFavourite(singleMedia.file_id);
            props.navigation.navigate('Loading');
            setTimeout(() => {
              alert('Favourite removed!');
              navToFavs();
            }, 1000);
          }}
        >
          <Icon name='remove-circle-outline' />
        </Button>
        <Button
          onPress={() => {
            navigation.push('Single', { file: singleMedia });
          }}
        >
          <Icon name='play' />
        </Button>
      </Right>
    </BaseListItem>
  );
};

FavouritesListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default FavouritesListItem;
