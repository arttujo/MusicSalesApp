import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right,
  Font
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
import favouriteHooks from "../hooks/FavouriteHooks";

const Profile = props => {
  const { getAvatar } = mediaAPI();
  const { loadFavourites } = favouriteHooks();
  const [user, setUser] = useState({});
  
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };

  const [avatar, setAvatar] = useState(undefined);
  getAvatar().then(result => {
    console.log("getAvatar", result);
    setAvatar(result.url);
  });

  const [email, setEMail] = useState({});
  const getEmail = async () => {
    const email = await AsyncStorage.getItem("user");
    setEMail(JSON.parse(email));
  };

  const [fullname, setFullname] = useState({});
  const getFullname = async () => {
    const full_name = await AsyncStorage.getItem("user");
    setFullname(JSON.parse(full_name));
  };

  useEffect(() => {
    getUser();
    getEmail();
    getFullname();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const navMyFavs = async () => {
    const array = await loadFavourites();
    console.log("array", array);
    props.navigation.push("Favourites", { media: array });
  };

  const navMyFiles = () => {
    props.navigation.push("MyFiles");
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Profile</Title>
        </Body>
      </Header>
      <Card>
        <CardItem>
          <Left>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("ProfPicUpload");
              }}
            >
              <Image
                source={{ uri: avatar }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text>Username: {user.username}</Text>
            <Text>Email: {email.email}</Text>
            <Text>Full Name: {fullname.full_name}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Button onPress={navMyFiles}>
              <Text>View items</Text>
            </Button>
            <Button onPress={navMyFavs}>
              <Text>View favourites</Text>
            </Button>
            <Button onPress={signOutAsync}>
              <Text>Log Out</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    </Container>
  );
};

export default Profile;
