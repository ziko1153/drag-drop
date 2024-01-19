import './App.css';
import React,{useState,useRef} from 'react';

function App() {

  const [images,setImages] = useState([]);
  const [isDragging,setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  function selectFiles() {
    fileInputRef.current.click();
  }


  function onFileSelect(event) {

    const files = event.target.files;
    if(files.length == 0) return;

    for(let i = 0; i< files.length; i++) {
      if(files[i].type.split('/')[0] !== 'image') continue;

      if(!images.some(e => e.name === files[i].name)) {
            setImages((prevImages) => [
                ...prevImages,
                {
                  name: files[i].name,
                  url: URL.createObjectURL(files[i])
                }
              ]);
      }
  }

    
  
  }

  function deleteImage (index) {
    setImages((prevImages) => {
     return prevImages.filter((_,i) => i !== index)
    })
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);

  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    for(let i = 0; i< files.length; i++) {
      if(files[i].type.split('/')[0] !== 'image') continue;

      if(!images.some(e => e.name === files[i].name)) {
            setImages((prevImages) => [
                ...prevImages,
                {
                  name: files[i].name,
                  url: URL.createObjectURL(files[i])
                }
              ]);
      }
  }
}
  console.log(images);

  return (
    <div className="card">
      <div className='top'>
        <p>Drag & Drop image uploading</p> 
      </div>

      <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ? (
        <span className='select'>
        Drop Images here
      </span>
        ) : (
          <>
           Drag & Drop image here or {" "}
        <span className='select' role='button' 
        onClick={selectFiles}>Browse</span>
          </>
        )}

       
        <input ref={fileInputRef} onChange={onFileSelect} name='file' type='file' className='file' multiple></input>
      </div>

    <div className='conatiner'>
      {images.map((image,index) => (
          <div className='image' key={index}>
            <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
            <img src={image.url} alt={images.name} width={100} height={100} />
          </div>
      )) }

    </div>
      <button type='button'>
        Upload
      </button>
      
    </div>
  );
}

export default App;
