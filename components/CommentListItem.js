import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import {
  ListItem as BaseListItem,
  Body,
  CardItem,
  Card,
  Text,
  Icon,
  Button,
  Right
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
import { format } from "timeago.js";
import { MediaContext } from "../contexts/MediaContext";

const CommentListItem = props => {
  const { navigation, singleComment } = props;
  const { fetchUser, deleteComment } = mediaAPI();
  const [userInfo, setUserInfo] = useState({});
  const { user } = useContext(MediaContext);
  const time = format(singleComment.time_added);
  useEffect(() => {
    fetchUser(singleComment.user_id).then(json => {
      console.log("singleFetchUser", json);
      setUserInfo(json);
    });
  }, []);

  const removeComment = async () => {
    props.navigation.navigate("Loading");
    await deleteComment(singleComment.comment_id);

    //setTimeout(() => {
    props.navigation.navigate("Home");
    //}, 500);
  };

  return (
    <BaseListItem style={{ width: "100%" }}>
      <Card style={{ marginLeft: 0, marginRight: 0, width: "100%" }}>
        <CardItem header>
          <Text>{userInfo.username} </Text>
          <Text note>{time}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{singleComment.comment}</Text>
          </Body>
          {user.user_id === userInfo.user_id && (
            <Right>
              <Button
                danger
                onPress={() => {
                  Alert.alert(
                    "Warning",
                    "Are you sure you want to delete this post?",
                    [
                      {
                        text: "Ok",
                        onPress: () => removeComment(),
                      },
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ],

                    { cancelable: true }
                  );
                }}
              >
                <Icon name='trash' />
              </Button>
            </Right>
          )}
        </CardItem>
      </Card>
    </BaseListItem>
  );
};

CommentListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default CommentListItem;
