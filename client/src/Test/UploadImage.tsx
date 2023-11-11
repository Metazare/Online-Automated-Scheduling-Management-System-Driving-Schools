import React, {useState} from 'react'
import {storage} from "./../firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid'

function UploadImage() {
  const [imageUpload, setImageUpload] = useState<any>(null)
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `oasms/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL:', downloadURL);
    })
  }

  return (
    <div>
      <input 
        type="file" 
        onChange={(event:any)=>{
          setImageUpload(event.target.files[0])
        }}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  )
}

export default UploadImage;