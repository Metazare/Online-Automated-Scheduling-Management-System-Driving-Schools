import { useState,useContext } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { SnackbarContext } from '../Context/SnackbarContext';

interface Data {
  downloadURL: string;
  uploading: boolean;
  uploadFile: (file: File, folderName: string) => void;
}

function useFirebase(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)
  const [downloadURL, setDownloadURL] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  // Upload file to Firebase Storage
  const uploadFile = async (file: File, folderName: string) => {
    if (!file) {
      console.error('No file provided for upload.');
      return;
    }
  
    const fileRef = ref(storage, `${folderName}/${file.name}-${v4()}`);
  
    try {
      setUploading(true);
  
      // Upload the file
      await uploadBytes(fileRef, file);
  
      // Get the download URL
      const url = await getDownloadURL(fileRef);
  
      // Update state with the download URL
      setDownloadURL(url);
  
      // Display a success message
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'success',
        note:"File Uploaded!",
      })); 

      return url;
    } catch (error) {
      // Handle the error
      console.error('Error uploading file:', error);
  
      // Display an error message
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"Error uploading file. Please try again.",
      })); 
    } finally {
      // Set loading state to false when the upload is done (whether successful or not)
      setUploading(false);
    }
  };
  
  const uploadImage = (file: File, folderName: string) => {
    if (file == null) return;

    setOpenSnackBar(openSnackBar => ({
      ...openSnackBar,
      severity:'info',
      note:"Uploading image...",
    })); 
    const imageRef = ref(storage, `${folderName}/${file.name}-${v4()}`);

    uploadBytes(imageRef, file).then(async () => {
      const url = await getDownloadURL(imageRef);
      setDownloadURL(url);
    })

  }

  return { 
    downloadURL, 
    uploading, 
    uploadFile 
  };
}

export default useFirebase;
