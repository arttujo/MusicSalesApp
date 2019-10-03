import { useState, useContext } from "react";
import { AsyncStorage } from "react-native";
import mediaAPI from "./ApiHooks";
import { MediaContext } from "../contexts/MediaContext";

const useSingleHooks = props => {
  const [inputs, setInputs] = useState({});

  const { media, setMedia } = useContext(MediaContext);

  const handleCommentChange = Text => {
    setInputs(inputs => ({
      ...inputs,
      comment: text
    }));
  };

  const clearForm = () => {
    setInputs(null);
    console.log("inputs Cleared!");
  };

  const handleComment = async (result, title, description) => {
    const { uploadFile, reloadAllMedia, addDefaultTag } = mediaAPI();

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
    const match = /\.(\w+)$/.exec(filename);
    const user = await AsyncStorage.getItem("user");
    const localUri = avatarImg.uri;
    const filename = localUri.split("/").pop();
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
      const tagData = {
        file_id: json.file_id,
        tag: "avatar_" + user.user_id
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
