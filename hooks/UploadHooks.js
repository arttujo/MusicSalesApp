import { useState, useContext } from "react";
import { AsyncStorage, Alert } from "react-native";
import mediaAPI from "../hooks/ApiHooks";
import { MediaContext } from "../contexts/MediaContext";

const useUploadHooks = props => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState({});

  const { media, setMedia } = useContext(MediaContext);

  const handleTitleChange = text => {
    setInputs(inputs => ({
      ...inputs,
      title: text
    }));
  };

  const handleDescChange = text => {
    setInputs(inputs => ({
      ...inputs,
      description: text
    }));
  };

  const clearForm = () => {
    setInputs("");

    console.log("inputs Cleared!");
  };

  const handleUpload = async (result, title, description) => {
    const { uploadFile, reloadAllMedia, addDefaultTag } = mediaAPI();
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    const localUri = result.uri;
    const filename = localUri.split("/").pop();

    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    let type = "";
    if (result.type === "image") {
      type = match ? `image/${match[1]}` : `image`;
      // fix jpg mimetype
      if (type === "image/jpg") type = "image/jpeg";
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    // Upload the image using the fetch and FormData APIs
    const formData = new FormData();
    const moreData = {
      description: "This is the actual description",
      someData: "Some other data I want to save"
    };
    formData.append("file", { uri: localUri, name: filename, type });
    formData.append("title", title);
    formData.append("description", description);

    const userToken = await AsyncStorage.getItem("userToken");
    console.log("FORMDATA", formData);

    uploadFile(formData).then(json => {
      console.log("upload json:", json);
      const defTag = {
        file_id: json.file_id,
        tag: "music-sales_"
      };

      addDefaultTag(defTag).then(json =>
        console.log("added default tag:", json)
      );
    });
  };
  const handleAvatarChange = async (avatarImg) => {
    const { uploadFile, addTag } = mediaAPI();
    const localUri = avatarImg.uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const user = await AsyncStorage.getItem("user");

    let type = "";

    if (avatarImg.type === "image") {
      type = match ? `image/${match[1]}` : `image`;

      if (type === "image/jpg") type = "image/jpeg";
    } else {
      type = match ? `video/${match[1]}` : `video`;
    }

    const formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });
    uploadFile(formData).then(json => {
    const uObj = JSON.parse(user)
      const tagData = {
        file_id: json.file_id,
        tag: "avatar_" + uObj.user_id
      };
      addTag(tagData)
    });

  };

  return {
    handleTitleChange,
    handleDescChange,
    handleUpload,
    inputs,
    clearForm,
    handleAvatarChange
  };
};
export default useUploadHooks;
