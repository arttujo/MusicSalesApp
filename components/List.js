import React from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { List as BaseList } from "native-base";
import mediaAPI from "../hooks/ApiHooks";

const List = props => {
  const { navigation } = props;
  const {getViaTag} = mediaAPI();
  const media = getViaTag();

  return (
    <BaseList
      dataArray={media}
      renderRow={item => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object
};

export default List;
