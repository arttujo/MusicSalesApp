import { useState, useContext, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { MediaContext } from '../contexts/MediaContext';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchPostUrlUserData = async (url, data) => {
  const userToken = await AsyncStorage.getItem('userToken');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': userToken
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  console.log('fetchPostUrl json', json);
  return json;
};

const fetchGetUrl = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchGetUrl', url);
  const response = await fetch(url, {
    headers: {
      'x-access-token': userToken
    }
  });
  const json = await response.json();
  //console.log("fetchUrl json", json);
  return json;
};
const fetchDeleteUrl = async (url) => {
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('fetchDeleteUrl', url);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-access-token': userToken
    }
  });
  const json = await response.json();
  return json;
};

const fetchGetUrlNoToken = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  //console.log(json);
  return json;
};

const favouriteHooks = () => {
  const { media } = useContext(MediaContext);

  const loadFavourites = async () => {
    const firstArray = await getOwnFavourites();
    //console.log('first array', firstArray);
    const secondArray = await loopArray(firstArray);
    //console.log('load favourites', secondArray);
    return secondArray;
  };

  const getOwnFavourites = async () => {
    return await fetchGetUrl(apiUrl + 'favourites');
  };

  const loopArray = async (array) => {
    const favouriteArray = [];
    console.log('load array', media);
    for (const i of array) {
      //console.log('current iterable', i);
      await fetchGetUrlNoToken(apiUrl + 'media/' + i.file_id).then((json) => {
        console.log('current json', json);
        if (media.some(item => item.file_id === json.file_id)){
          favouriteArray.push(json);
        }
      });
    }
    return favouriteArray.reverse();
  };

  const favourite = (id) => {
    const data = {
      file_id: id
    };
    return fetchPostUrlUserData(apiUrl + 'favourites', data).then((json) => {
      console.log('Favourite', json);
      return json;
    });
  };

  const removeFavourite = (file_id) => {
    return fetchDeleteUrl(apiUrl + 'favourites/file/' + file_id).then(
      (json) => {
        console.log('removeFavourite', json);
        return json;
      }
    );
  };

  const getPeopleWhoFavourited = (file_id) => {
    return fetchGetUrl(apiUrl + 'favourites/file/' + file_id).then((json) => {
      console.log('getPeopleWhoFavourited', json);
      return json;
    });
  };

  return {
    getOwnFavourites,
    favourite,
    removeFavourite,
    getPeopleWhoFavourited,
    loadFavourites,
  };
};
export default favouriteHooks;
