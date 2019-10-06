import React, {
  useContext,
  useEffect,
  keyExtractor,
  StyleSheet,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { MediaContext } from '../contexts/MediaContext';
import { List as BaseList, Container, Item, Icon, Picker } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';
import useListHooks from '../hooks/ListHooks';

const reloadCategoryMedia = (tag) => {
  const { media, setMedia } = useContext(MediaContext);
  const fetchUrl = async () => {
    const response = await fetch(tag);
    const json = await response.json();
    console.log(json);
    setMedia(json);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [media];
};

const List = (props) => {
  const { inputs, handleMenuChange } = useListHooks();

  const tagUrl = 'http://media.mw.metropolia.fi/wbma/tags/';
  const [media] = reloadCategoryMedia(tagUrl + inputs.pickedcategory);
  console.log('MEDIA ARRAY: ', media);
  console.log(tagUrl + inputs.pickedcategory);
  console.log([media]);

  return (
    <Container>
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
          <Picker.Item label='All items' value='music-sales_' />
          <Picker.Item label='Guitars' value='music-sales_guitars' />
          <Picker.Item label='Drums' value='music-sales_drums' />
          <Picker.Item label='Amplifiers' value='music-sales_amplifiers' />
          <Picker.Item label='Trombones' value='music-sales_trombones' />
          <Picker.Item label='Equipment' value='music-sales_equipment' />
        </Picker>
      </Item>
      <BaseList
        dataArray={media.reverse()}
        renderRow={(item) => (
          <ListItem navigation={props.navigation} singleMedia={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
