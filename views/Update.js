import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  Alert,
  Image
} from "react-native";
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
  Input,
  Label,
  Body,
  Card,
  CardItem
} from "native-base";
import useUploadHooks from "../hooks/UploadHooks";
import List from "../components/List";

const Update = props => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const { reloadAllMedia,updateFile } = mediaAPI();
  const { media, setMedia } = useContext(MediaContext);
  const { navigation } = props;
  const file = navigation.state.params.file;


  const {
    handleTitleChange,
    inputs,
    handleDescChange,
    handleUpload,
    clearForm
  } = useUploadHooks();

  const canSubmit = () => {
    if (inputs.description && inputs.title) {
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
      }
    };
    const titleError = validate({ title: inputs.title }, constraints);
    const descError = validate(
      { description: inputs.description },
      constraints
    );
    if (!titleError.title && !descError.description) {

      const data = {
        title: inputs.title,
        description: inputs.description
      }
      updateFile(file.file_id,data)
      Alert.alert(
        "Success",
        "File Updated!",
        [{ text: "OK", onPress: () => props.navigation.push("MyFiles") }],
        { cancelable: false }
      );

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
    <Content>
      <Form>
        <Body>
          <Text>Upload</Text>
        </Body>
        <Card>
          <CardItem>

          </CardItem>
          <CardItem>
            <Body>
              <Text>Selected Image</Text>
            </Body>
          </CardItem>
          {image && (
            <CardItem>
              <Image
                source={{ uri: "http://media.mw.metropolia.fi/wbma/uploads/"+file.filename }}
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
            placeholder="Description"
            onChangeText={handleDescChange}
            value={inputs.description}
            required
          />
        </Item>

        <Button
          disabled={!isEnabled}
          title="Update!"
          onPress={() => {
            validateInputs(inputs, props);
          }}
        />
      </Form>
    </Content>
  );
};
export default Update;
