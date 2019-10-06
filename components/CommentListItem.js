<<<<<<< HEAD
=======

>>>>>>> arttu
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
  ListItem as BaseListItem,
  Body,
  CardItem,
  Card,
  Text,
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";

const CommentListItem = props => {
  const { navigation, singleComment } = props;
  const {fetchUser} = mediaAPI();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchUser(singleComment.user_id).then(json => {
      console.log("singleFetchUser", json);
      setUserInfo(json);
    });
  }, []);

  return (
    <BaseListItem style={{width:'100%'}}>
      <Card style={{marginLeft:0,marginRight:0,width:'100%'}}>
        <CardItem header>
          <Text>{userInfo.username}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{singleComment.comment}</Text>
          </Body>
        </CardItem>
      </Card>
    </BaseListItem>
  );
};

CommentListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default CommentListItem;
