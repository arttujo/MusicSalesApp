import React, { useState, useEffect, Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker,Circle } from "react-native-maps";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Item,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import mediaAPI from "../hooks/ApiHooks";

const Kartta = (props) => {
  const { navigation } = props;
  const data = navigation.state.params.gpsData;
  console.log("navi",data)
  const parsed = JSON.parse(data)

  const marker = {
    latlng: {
      latitude: parsed.Latitude,
      longitude: parsed.Longitude,
    },
    title:"TEST",
    description: "TEST"
  }
  console.log(marker)
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>
            Location
          </Title>
        </Body>
      </Header>
      <Content>
        <MapView
          initialRegion={{
            latitude: parsed.Latitude,
            longitude: parsed.Longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          zoomEnabled={true}
          style={{ height: 900, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Circle
            center={marker.latlng}
            title={marker.title}
            description={marker.description}
            radius={1500}
            fillColor="rgba(255, 28, 72,0.2)"
          />
        </MapView>
      </Content>
    </Container>
  );
};
export default Kartta;
