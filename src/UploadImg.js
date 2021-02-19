import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./UploadImg.css";

export const UploadImg = ({ username }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      // get the file that you selected
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        alert(error.message);
      },
      () => {
        //   upload complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //   post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload__container">
      <div className="imageUpload">
        <LinearProgress
          className="imageupload_progress"
          variant="determinate"
          value={progress}
          max="100"
        />
        {/* <progress className="imageupload_progress" value={progress} max="100" /> */}
        <Input
          className="imageupload__caption"
          type="text"
          placeholder=" Enter a caption... "
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {/* <input
        type="text"
        placeholder=" Enter a caption... "
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      /> */}
        {/* <Input type="file" onChange={handleChange} /> */}
        <Input
          className="imageupload__image"
          type="file"
          onChange={handleChange}
        />
        <Button className="imageupload__button" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
};
