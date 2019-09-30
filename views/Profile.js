import React, { useEffect, useState } from "react";
import { AsyncStorage, Image } from "react-native";
import PropTypes from "prop-types";
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
  Right,
  Font
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";

const Profile = props => {
  const { getAvatar } = mediaAPI();

  const [user, setUser] = useState({});
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };

  const [avatar, setAvatar] = useState(undefined);
  getAvatar().then(result => {
    setAvatar(result);
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

  console.log();
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const navMyFiles = () => {
    props.navigation.push("MyFiles");
  }
  return (
    <Card>
      <CardItem header>
        <Text>Profile</Text>
      </CardItem>
      <CardItem>
        <Left>
          <Image source={{ uri: avatar }} style={{ width: 100, height: 100 }} />
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
            <Text>View my files</Text>
          </Button>
          <Button onPress={signOutAsync}>
            <Text>Log Out</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

export default Profile;
