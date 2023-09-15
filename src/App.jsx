import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useEffect, useRef, useState } from "react";
import './App.css';


const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY;
const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
const Bucket = import.meta.env.VITE_BUCKET_NAME;

function App() {
  const hiddenEl = useRef(null);
  // const [renderedImages, setRenderedImages] = useState('');
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      secretAccessKey,
      accessKeyId
    }
  });
  let renderedImages;

  const filename = 'imm000_N0.jpg'

  useEffect(() => {

    // getImages();
    showImages();

  }, [])

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

      renderedImages = data.Contents.map(filename => {
        console.log(filename.Key)
        return <img src={`https://${Bucket}.s3.eu-north-1.amazonaws.com/${filename.Key}`} />
      })

      console.log(renderedImages)

      // return data.Contents;
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
        {renderedImages}
      </section>
    </main>
  );
}

export default App
