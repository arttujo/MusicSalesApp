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

const Upload = props => {
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const { reloadAllMedia } = mediaAPI();
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
    clearForm
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
      }
    };
    const titleError = validate({ title: inputs.title }, constraints);
    const descError = validate(
      { description: inputs.description },
      constraints
    );
    if (!titleError.title && !descError.description) {
      handleUpload(image, inputs.title, inputs.description)
      console.log();
      clearForm();
      setImage()
      setMedia([]);

      setTimeout(() => {
        reloadAllMedia(setMedia);
        //setLoading(false);
        props.navigation.navigate("Home");
        console.log("Upload Done!");
        alert("Upload Done!");
      }, 2000);
      // .then(data => {
      //   //should add error handling here
      //   console.log("then data:", data);
      //   clearForm();
      //   setImage();
      //   setMedia([]);
      //   setTimeout(()=>{
      //     reloadAllMedia(setMedia)
      //     setLoading(false)
      //     props.navigation.navigate("Home");
      //   },2000)

      //   console.log("Upload Done!");
      //   alert("Upload Done!");
      // });

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
            <Button
              title="Select Image"
              onPress={() => {
                _pickImage();
              }}
            />
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
            placeholder="Description"
            onChangeText={handleDescChange}
            value={inputs.description}
            required
          />
        </Item>

        <Button
          disabled={!isEnabled}
          title="Upload!"
          onPress={() => {
            validateInputs(inputs, props);
          }}
        />
        <Button
          title="Reset Form"
          onPress={() => {
            clearForm();
            setImage();
          }}
        />
      </Form>
    </Content>
  );
};
export default Upload;
