import React, { useCallback, useRef, useState } from "react";
import styles from "./CardInput.module.css";

const CardInput = () => {
  const [filename, setFilename] = useState("No file");
  const inputFileRef = useRef();

  const handleFileUploaded = useCallback(() => {
    let filename = inputFileRef.current.files[0].name;
    filename = filename.substring(0, filename.lastIndexOf(".")) || filename;
    setFilename(filename);
  });

  return (
    <address className={styles["card-input"]}>
      <input type="text" className={styles.name} />
      <input type="text" className={styles.company} />
      <select className={styles.theme}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input type="text" className={styles.position} />
      <input type="email" className={styles.email} />
      <textarea className={styles.introduce} />
      <label className={styles["file-label"]}>
        {filename}
        <input
          type="file"
          className={styles.file}
          accept="image/*"
          ref={inputFileRef}
          onChange={handleFileUploaded}
        />
      </label>
      <button className={styles.delete}>Delete</button>
    </address>
  );
};

export default CardInput;
