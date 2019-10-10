import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import {
  List as BaseList,
  Container,
  Item,
  Icon,
  Picker,
  Content
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";
import useListHooks from "../hooks/ListHooks";
import { AsyncStorage, Image } from "react-native";

const List = props => {
  const { navigation } = props;
  const { handleMenuChange, inputs } = useListHooks();
  const { getViaTag } = mediaAPI();

  const [media] = getViaTag(inputs.pickedcategory);

  console.log("MEDIA ARRAY: ", [media]);

  return (
    <Content>
      {inputs.pickedcategory === "music-sales_guitars" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}

      {inputs.pickedcategory === "music-sales_basses" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_drums" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2016/11/19/13/57/drum-set-1839383_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_keyboards" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_amplifiers" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_trombones" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_equipment" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
      {inputs.pickedcategory === "music-sales_" && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2015/05/15/14/31/amplifier-768536_960_720.jpg"
          }}
          style={{ width: null, height: 75 }}
        />
      )}
       {!inputs.pickedcategory && (
        <Image
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2019/09/20/05/57/music-instruments-4490883_960_720.png"
          }}
          style={{ width: null, height: 75 }}
        />
      )}


      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: 50 }}
          placeholder="Select item category"
          placeholderStyle={{ color: "#ffffff" }}
          placeholderIconColor="#000000"
          selectedValue={inputs.pickedcategory}
          onValueChange={handleMenuChange}
        >
          <Picker.Item label="All items" value="music-sales_" />
          <Picker.Item label="Guitars" value="music-sales_guitars" />
          <Picker.Item label="Basses" value="music-sales_basses" />
          <Picker.Item label="Drums" value="music-sales_drums" />
          <Picker.Item label="Keyboards" value="music-sales_keyboards" />
          <Picker.Item label="Amplifiers" value="music-sales_amplifiers" />
          <Picker.Item label="Trombones" value="music-sales_trombones" />
          <Picker.Item label="Equipment" value="music-sales_equipment" />
        </Picker>
      </Item>
      <BaseList
        dataArray={media}
        renderRow={item => (
          <ListItem navigation={props.navigation} singleMedia={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Content>
  );
};

List.propTypes = {
  navigation: PropTypes.object
};

export default List;
