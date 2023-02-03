import { useEffect, useState } from 'react';
import {storage} from "./firebaseConfig";
import { ref, uploadBytesResumable, listAll } from "firebase/storage";

function App() {

  const [upload, setupload] = useState("");
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState([]);
 
  const listRef = ref(storage, 'files/');

 const refreshList = () => {
  listAll(listRef)
  .then(res => {
    res.items.forEach((item) => {
      setData(prev => [...prev, item.name])
    })
  })
  .catch(err => {
    alert(err.message);
  })
 }

 useEffect(() => {
  refreshList();
 },[])

  function handleChange(event) {
  setupload(event.target.files[0]);
  }
 
  const handleUpload = () => {
  if (!upload) {
  alert("Please upload a file first!");
  }
 
  const storageRef = ref(storage, `/files/${upload.name}`);
 
  const uploadTask = uploadBytesResumable(storageRef, upload);
 
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setPercent(percent);
  },
  (err) => console.log(err),
    () => {
    setupload("");
    refreshList();
  }
  );
  };
 
  return (
  <div className='container'>
    <h2 className='title'>Upload Your file</h2>
    <div className='choose'>
    <input type="file" onChange={handleChange} />
    </div>
    <button className='button-upload' onClick={handleUpload}>Upload the file</button>
    <p>{percent} % Completed</p>
    <br />
    <h2 className='files-title'>Files Uploaded</h2>
    {
      data.map((e) => (
        <p>{e}</p>
      ))
    }
  </div>
  );
}

export default App;
