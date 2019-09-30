import { useState, useContext, useEffect } from "react";
import { AsyncStorage, Alert } from "react-native";
import { MediaContext } from "../contexts/MediaContext";

const apiUrl = "http://media.mw.metropolia.fi/wbma/";
const regUrl = "http://media.mw.metropolia.fi/wbma/users/";
const userUrl = "http://media.mw.metropolia.fi/wbma/media/user/";

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

const fetchPostUrl = async (url, data) => {
  console.log("fetchPostUrl", url);
  console.log("fetchPostUrl data", data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  console.log("fetchPostUrl json", json);
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

const fetchPutUrl = async (url, data) => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log("fetchPutUrl", url);
  console.log("fetchPutUrl", data);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "x-access-token": userToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return json;
};

const mediaAPI = () => {
  const reloadAllMedia = setMedia => {
    fetchGetUrl(apiUrl + "media").then(json => {
      setMedia(json);
    });
  };

  const deleteFile = file_id => {
    fetchDeleteUrl(apiUrl + "media/" + file_id).then(json => {
      console.log(json);
    });
  };
  const updateFile = (file_id, data) => {
    fetchPutUrl(apiUrl + "media/" + file_id, data).then(json => {
      console.log(json);
    });
  };

  const getUserMedia = () => {
    const [media, setMedia] = useState();
    const { user } = useContext(MediaContext);
    console.log("uID", user.user_id);
    useEffect(() => {
      fetchGetUrl(userUrl + user.user_id).then(json => {
        console.log("fetchusermedia", json);
        setMedia(json);
      });
    }, []);

    return media;
  };

  const fetchUser = async id => {
    return fetchGetUrl(regUrl + id).then(json => {
      console.log("fetchuser", json);
      return json;
    });
  };
  const uploadFile = async formData => {
    return fetchUploadUrl("media", formData).then(json => {
      return json;
    });
  };

  const fetchUploadUrl = async (url, data) => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("fetchUploadUrl", url, data, userToken);
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": userToken
      },
      body: data
    });
    let json = { error: "oops" };
    if (response.ok) {
      json = await response.json();
      console.log("fetchUploadUrl json", json);
    }
    return json;
  };

  const getAllMedia = () => {
    const { media, setMedia } = useContext(MediaContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetchGetUrl(apiUrl + "media").then(json => {
        setMedia(json);
        setLoading(false);
      });
    }, []);
    return [media, loading];
  };
  const getThumbnail = url => {
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      fetchGetUrl(apiUrl + "media/" + url).then(json => {
        setThumbnails(json.thumbnails);
      });
    }, []);
    return thumbnails;
  };
  const signInAsync = async (inputs, props) => {
    const data = {
      username: inputs.username,
      password: inputs.password
    };
    const json = await fetchPostUrl(apiUrl + "login", data);
    await AsyncStorage.setItem("userToken", json.token);
    await AsyncStorage.setItem("user", JSON.stringify(json.user));
    props.navigation.navigate("App");
  };
  const registerAsync = async (inputs, props) => {
    const data = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      full_name: inputs.full_name
    };
    const json = await fetchPostUrl(apiUrl + "users", data);
    if (!json.error) {
      signInAsync(inputs, props);
    }
  };

  const getUserFromToken = async () => {
    fetchGetUrl(apiUrl + "users/user").then(json => {
      console.log("getUserToken", json);
      AsyncStorage.setItem("user", JSON.stringify(json));
    });
  };
  const getAvatar = () => {
    const { user } = useContext(MediaContext);
    console.log("get user avatar", user);
    let avatar;
    console.log("avatar", apiUrl + "tags/avatar_" + user.user_id);
    return fetchGetUrl(apiUrl + "tags/avatar_" + user.user_id).then(json => {
      console.log("avatarJson", json);
      avatar = apiUrl + "uploads/" + json[0].filename;
      return avatar;
    });
  };

  const userToContext = async () => {
    // Call this when app starts (= Home.js)
    const { user, setUser } = useContext(MediaContext);
    const getFromStorage = async () => {
      const storageUser = JSON.parse(await AsyncStorage.getItem("user"));
      console.log("storage", storageUser);
      setUser(storageUser);
    };
    useEffect(() => {
      getFromStorage();
    }, []);
    return [user];
  };

  const checkUser = async uname => {
    const response = await fetch(regUrl + "/username/" + uname, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).catch(error => {
      console.error(error);
    });
    const result = await response.json();
    const unameStatus = result.available;
    console.log("Username Result", result);
    if (!unameStatus) {
      Alert.alert(
        "Error",
        "Username already taken",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return {
    getAllMedia,
    getThumbnail,
    signInAsync,
    registerAsync,
    getUserFromToken,
    getAvatar,
    userToContext,
    checkUser,
    reloadAllMedia,
    uploadFile,
    fetchUser,
    getUserMedia,
    deleteFile,
    updateFile
  };
};

export default mediaAPI;
