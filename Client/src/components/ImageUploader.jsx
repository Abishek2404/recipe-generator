import { useState, useRef } from "react";
import { useRecipe } from "../context/RecipeContext";

function ImageUploader() {
  const [preview, setPreview]         = useState(null);
  const [dragActive, setDragActive]   = useState(false);
  const fileInputRef                  = useRef(null);
  const { analyzeImage, loading }     = useRecipe();

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    analyzeImage(file);
  };

  const handleDrop       = (e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); };
  const handleDragOver   = (e) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave  = ()  => setDragActive(false);
  const handleInputChange = (e) => handleFile(e.target.files[0]);
  const handleClick      = ()  => fileInputRef.current?.click();

  return (
    <div className="image-uploader">
      <h2>Upload Food Photo</h2>
      <p className="uploader-subtitle">
        Take a photo of ingredients in your fridge or a dish you want to recreate
      </p>

      <div
        className={`drop-zone${dragActive ? "drag-active" : ""}${preview ? "has-preview" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {preview ? (
          <img src={preview} alt="Uploaded food" className="preview-image" />
        ) : (
          <div className="drop-zone-content">
            <span className="upload-icon"></span>
            <p>Drag & drop your food photo here</p>
            <p className="or-text">or click to browse</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="file-input"
        />
      </div>

      {loading && (
        <div className="analyzing-indicator">
          <div className="spinner"></div>
          <p>Analyzing your image with AI...</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;