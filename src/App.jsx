import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { useEffect, useRef, useState } from "react";
import './App.css';
import Dropdown from "./components/Dropdown";
import Albums from "./components/Albums";


const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY;
const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
const Bucket = import.meta.env.VITE_BUCKET_NAME;

function App() {
  const hiddenEl = useRef(null);
  const [images, setImages] = useState([]);

  const categories = ['Vacay', 'Family', 'Nature', 'Other'];
  const [selectedCategory, setSelectedCategory] = useState('');

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
      Metadata: { "category": selectedCategory || 'other' } 
    }

    const command = new PutObjectCommand(input);
    try {
      const response = await client.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      showImages();
    }
  }

  async function showImages(directory) {

    const input = {
      Bucket
    };
    const command = new ListObjectsV2Command(input);

    try {
      const data = await client.send(command);
      let renderedImages;

      if (directory) {
        renderedImages = data.Contents.map((filename, i) => {
          if (filename.Key.includes(directory)) {
            return <div key={i}><img src={`https://${Bucket}.s3.eu-north-1.amazonaws.com/${filename.Key}`} /></div>
          }
        });
      } else {
        renderedImages = data.Contents.map((filename, i) => {
          return <div key={i}><img src={`https://${Bucket}.s3.eu-north-1.amazonaws.com/${filename.Key}`} /></div>
        });
      };

      setImages(renderedImages);
      return data.Contents;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  function handleCategoryChange(event) {
    const inputCategory = event.target.value;
    setSelectedCategory(inputCategory);
  }

  return (
    <>
      <div className="hero">
        <h1>A Year In Pictures</h1>
      </div>
      <header>
        <section className="upload-section">
          <Dropdown selectedCategory={selectedCategory} categories={categories} handleCategoryChange={handleCategoryChange} />
          <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={hiddenEl} />
          <button className="upload-button" onClick={handleClick}>Upload</button>
        </section>
        <Albums categories={categories} handleAlbums={showImages} />
      </header>
      <main>
        <section className="image-grid">
          {images}
        </section>
      </main>
    </>
  );
}

export default App;
