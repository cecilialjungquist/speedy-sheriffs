import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useRef } from "react";
import './App.css';


const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY; 
const accessKeyId =  import.meta.env.VITE_ACCESS_KEY_ID;
const Bucket = import.meta.env.VITE_BUCKET_NAME;

function App() {
  const hiddenEl = useRef(null);
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      secretAccessKey,
      accessKeyId
    }
  });

  console.log(`key: ${secretAccessKey}, bucket: ${Bucket}`);

  function handleClick(event) {
    hiddenEl.current.click();
    console.log('click');
  }

  async function handleChange(event) {
    const file = event.target.files[0];
    console.log(file);

    const input = {
      Bucket,
      Key: file.name,
      Body: file,
    }

    // const URL = await fetch('http://acs.amazonaws.com/groups/global/AllUsers', {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: input
    // });

    // Nån typ av validering behövs här?
    const command = new PutObjectCommand(input);
    try {
      const response = await client.send(command);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <main>
      <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={hiddenEl} />
      <button onClick={handleClick}>Upload</button>
      <section className="image-grid">

      </section>
    </main>
  );
}

export default App
