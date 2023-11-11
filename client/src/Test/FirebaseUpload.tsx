import React, { useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/storage';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBENjIfqT98gJzVqVRz-mRSSZY2sySDHqQ",
//   authDomain: "metazare-clients.firebaseapp.com",
//   projectId: "metazare-clients",
//   storageBucket: "metazare-clients.appspot.com",
//   messagingSenderId: "812281073106",
//   appId: "1:812281073106:web:b3c45b93c266544db14c0b",
//   measurementId: "G-YD22KF4W0H"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const FirebaseUpload: React.FC = () => {
  // const [file, setFile] = useState<File | null>(null);
  // const [url, setUrl] = useState<string | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!file) return;

  //   const storageRef = firebase.storage().ref();
  //   const fileRef = storageRef.child(`pdfs/${file.name}`);

  //   try {
  //     const snapshot = await fileRef.put(file);
  //     const downloadUrl = await snapshot.ref.getDownloadURL();
  //     setUrl(downloadUrl);
  //     console.log('File uploaded. Download URL:', downloadUrl);
  //   } catch (error:any) {
  //     console.error('Error uploading file:', error.message);
  //   }
  // };

  return (
    <div>
      {/* <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>File uploaded successfully!</p>
          <p>Download URL: {url}</p>
        </div>
      )} */}
    </div>
  );
};

export default FirebaseUpload;
