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
import { List as BaseList } from 'native-base';
import mediaAPI from '../hooks/ApiHooks';

const useFetch = (url) => {
  const { media, setMedia } = useContext(MediaContext);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMedia(json);
    setLoading(false);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [media, loading];
};

const fetchViaTag = (url) => {
  const { media, setMedia } = useContext(MediaContext);
  const fetchUrl = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMedia(json);
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [media];
};

const List = (props) => {
  const { navigation } = props;
  const tagUrl = 'http://media.mw.metropolia.fi/wbma/tags/music-sales_';
  const [media] = fetchViaTag(tagUrl);

  return (
    <BaseList
      dataArray={media.reverse()}
      renderRow={(item) => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
