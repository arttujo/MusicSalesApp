import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, AsyncStorage, Alert, Image } from "react-native";
import FormTextInput from "../components/FormTextInput";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import mediaAPI from "../hooks/ApiHooks";
const validate = require("validate.js");
import { MediaContext } from "../contexts/MediaContext";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Text,
  Button,
  Input,
  Label,
  Title,
  Body,
  Card,
  CardItem,
  Picker,
  Icon
} from "native-base";
import useUploadHooks from "../hooks/UploadHooks";
import List from "../components/List";

const Upload = props => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const { reloadAllMedia, setDefaultTag } = mediaAPI();
  const { media, setMedia } = useContext(MediaContext);

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log("Picked Image:", result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  });

  const {
    handleTitleChange,
    inputs,
    handleDescChange,
    handleUpload,
    clearForm,
    handlePriceChange,
    handleCategoryChange
  } = useUploadHooks();

  const canSubmit = () => {
    const isEmpty = obj => {
      return Object.getOwnPropertyNames(obj).length >= 1;
    };

    console.log(image);
    if (inputs.description && inputs.title && isEmpty(image)) {
      return true;
    }
  };
  const isEnabled = canSubmit();

  const validateInputs = (inputs, props) => {
    const constraints = {
      title: {
        presence: {
          message: "^You must enter a title!"
        },
        length: {
          minimum: 5,
          message: "^title must be atleast 5 characters"
        }
      },
      description: {
        presence: {
          message: "^You must give a description of your image!"
        },
        length: {
          minimum: 10,
          message: "^Description must be atleast 10 characters"
        }
      },
      price: {
        presence: {
          message: "^You must give a price!"
        }
      }
    };
    const titleError = validate({ title: inputs.title }, constraints);
    const descError = validate(
      { description: inputs.description },
      constraints
    );
    const priceError = validate({ price: inputs.price }, constraints);

    if (!titleError.title && !descError.description && !priceError.price) {
      const uploadData = {
        title: inputs.title,
        description: inputs.description,
        price: inputs.price,
        category: inputs.category,
        image: image
      };

      handleUpload(uploadData);
      console.log();
      clearForm();
      setImage();
      setMedia([]);
      props.navigation.navigate("Loading");
      setTimeout(() => {
        reloadAllMedia(setMedia);
        //setLoading(false);
        props.navigation.navigate("Home");
        console.log("Upload Done!");
        alert("Upload Done!");
      }, 2000);
    } else {
      const errorArray = [titleError.title, descError.description];

      for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i]) {
          console.log("alert:", errorArray[i][0]);
          alert(errorArray[i][0]);
        }
      }
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Upload</Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Card>
            <CardItem>
              <Button
                onPress={() => {
                  _pickImage();
                }}
              >
                <Text>Select Image</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Selected Image</Text>
              </Body>
            </CardItem>
            {image && (
              <CardItem>
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    flex: 1,
                    width: null,
                    height: 350
                  }}
                />
              </CardItem>
            )}
          </Card>

          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="title"
              onChangeText={handleTitleChange}
              value={inputs.title}
              required
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="price"
              onChangeText={handlePriceChange}
              value={inputs.price}
              required
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="Description"
              onChangeText={handleDescChange}
              value={inputs.description}
              required
            />
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select item category"
              placeholderStyle={{ color: "#ffffff" }}
              placeholderIconColor="#000000"
              selectedValue={inputs.category}
              onValueChange={handleCategoryChange}
            >
              <Picker.Item label="Guitars" value="music-sales_guitars" />
              <Picker.Item label="Drums" value="music-sales_drums" />
              <Picker.Item label="Amplifiers" value="music-sales_amplifiers" />
              <Picker.Item label="Trombones" value="music-sales_trombones" />
              <Picker.Item label="Equipment" value="music-sales_equipment" />
            </Picker>
          </Item>
          <Button
            disabled={!isEnabled}
            onPress={() => {
              validateInputs(inputs, props);
            }}
          >
            <Text>Upload!</Text>
          </Button>
          <Button
            onPress={() => {
              clearForm();
              setImage();
            }}
          >
            <Text>Reset Form</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Upload;
