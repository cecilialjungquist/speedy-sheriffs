import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useEffect, useRef, useState } from "react";
import './App.css';


const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY;
const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
const Bucket = import.meta.env.VITE_BUCKET_NAME;

function App() {
  const hiddenEl = useRef(null);
  const [images, setImages] = useState([]);
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      secretAccessKey,
      accessKeyId
    }
  });

  useEffect(() => {

    showImages();

  }, [])

  function handleClick() {
    hiddenEl.current.click();
  }

  async function handleChange(event) {
    const file = event.target.files[0];

    const input = {
      Bucket,
      Key: file.name,
      Body: file,
    }

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

  async function showImages() {

    let params = {
      Bucket
    };
    const command = new ListObjectsV2Command(params);

    try {
      const data = await client.send(command);
      console.log('data.Content från bucket: ', data.Contents);

      const renderedImages = data.Contents.map((filename, i) => {
        return <img key={i} src={`https://${Bucket}.s3.eu-north-1.amazonaws.com/${filename.Key}`} />
      });
      setImages(renderedImages);
      return data.Contents;
    } catch (err) {
      console.log(err);
      return err;
    }

  }

  return (
    <main>
      <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={hiddenEl} />
      <button onClick={handleClick}>Upload</button>
      <section className="image-grid">
        {images}
      </section>
    </main>
  );
}

export default App
