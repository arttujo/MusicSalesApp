import { useState, useContext, useEffect } from "react";
import { AsyncStorage, Alert } from "react-native";
import { MediaContext } from "../contexts/MediaContext";

const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const fetchPostUrlUserData = async (url, data) => {
  const userToken = await AsyncStorage.getItem("userToken");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": userToken
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  console.log("fetchPostUrl json", json);
  return json;
};

const fetchGetUrl = async url => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log("fetchGetUrl", url);
  const response = await fetch(url, {
    headers: {
      "x-access-token": userToken
    }
  });
  const json = await response.json();
  console.log("fetchUrl json", json);
  return json;
};
const fetchDeleteUrl = async url => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log("fetchDeleteUrl", url);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "x-access-token": userToken
    }
  });
  const json = await response.json();
  return json;
};

const fetchGetUrlNoToken = async url => {
  const response = await fetch(url);
  const json = await response.json();
  //console.log(json);
  return json;
};

const favouriteHooks = () => {

  const getOwnFavourites = async () => {
    return fetchGetUrl(apiUrl + "favourites").then(json => {
      //console.log("getOwnFavourites", json)
      const favouriteArray = [];
      for(const i of json) {
        console.log('current iterable', i);
        fetchGetUrlNoToken(apiUrl + "media/" + i.file_id).then(json => {
          favouriteArray.push(json);
          //console.log('fetched favourite file', json);
          //console.log('current array', favouriteArray);
        });
      };
      return favouriteArray;
    });
  };

  /*const getFavouriteFiles = async() => {
    const array = await getOwnFavourites();
    const [media, setMedia] = useState();
    console.log('array', array);

    const favouriteArray = [];
    useEffect(() => {
      for(const i of array) {
        console.log('current iterable', i);
        fetchGetUrlNoToken(apiUrl + "media/" + i.file_id).then(json => {
          favouriteArray.push(json);
          console.log('fetched favourite file', json);
          console.log('current array', favouriteArray);
        });
      };
      setMedia(favouriteArray);
    }, []);

    return media;
  };*/

  const favourite = id => {
    const data = {
      file_id: id
    };
    return fetchPostUrlUserData(apiUrl + "favourites", data).then(json => {
      console.log("Favourite", json);
      return json;
    });
  };

  const removeFavourite = file_id => {
    return fetchDeleteUrl(apiUrl + "favourites/file/" + file_id).then(json => {
      console.log("removeFavourite", json);
      return json;
    });
  };

  const getPeopleWhoFavourited = file_id => {
    return fetchGetUrl(apiUrl + "favourites/file/" + file_id).then(json => {
      console.log("getPeopleWhoFavourited", json);
      return json;
    });
  };

  return {
    getOwnFavourites,
    favourite,
    removeFavourite,
    getPeopleWhoFavourited,
    //getFavouriteFiles
  };
};
export default favouriteHooks;
