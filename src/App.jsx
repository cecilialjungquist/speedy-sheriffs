import { S3Client } from "@aws-sdk/client-s3";
import { useRef } from "react";
import './App.css';

function App() {
  const hiddenEl = useRef(null);
  const client = new S3Client({ 
    region: 'eu-north-1'
  });

  function handleClick(event) {
      hiddenEl.current.click();
      console.log('click');
  }

  function handleChange(event) {
      const file = event.target.files[0];
      console.log(file);

      // Nån typ av validering behövs här.
      // uploadFile(file);
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
