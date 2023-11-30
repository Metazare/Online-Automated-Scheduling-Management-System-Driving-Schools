import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

interface Data {
  downloadURL: string;
  uploading: boolean;
  uploadFile: (file: File, folderName: string) => void;
}

function useFirebase(): Data {
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
      alert('File Uploaded!');

      return url;
    } catch (error) {
      // Handle the error
      console.error('Error uploading file:', error);
  
      // Display an error message
      alert('Error uploading file. Please try again.');
    } finally {
      // Set loading state to false when the upload is done (whether successful or not)
      setUploading(false);
    }
  };

  return { 
    downloadURL, 
    uploading, 
    uploadFile 
  };
}

export default useFirebase;
