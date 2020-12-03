import React, { memo, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./CardAddForm.module.css";

const CardAddForm = memo(({ FileInput, onAdd }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({ fileName: null, fileURL: null });

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const card = {
      id: Date.now(),
      name: nameRef.current.value || "",
      company: companyRef.current.value || "",
      theme: themeRef.current.value,
      title: titleRef.current.value || "",
      email: emailRef.current.value || "",
      message: messageRef.current.value || "",
      fileName: file.fileName || "",
      fileURL: file.fileURL || "",
    };

    formRef.current.reset();
    setFile({ fileName: null, fileURL: null });
    onAdd(card);
  };

  return (
    <form ref={formRef} className={styles.form}>
      <input
        ref={nameRef}
        className={styles.name}
        type="text"
        name="name"
        placeholder="name"
      />
      <input
        ref={companyRef}
        className={styles.company}
        type="text"
        name="company"
        placeholder="company"
      />
      <select
        ref={themeRef}
        className={styles.theme}
        name="theme"
        placeholder="theme"
      >
        <option placeholder="light" value="light">
          Light
        </option>
        <option placeholder="dark" value="dark">
          Dark
        </option>
        <option placeholder="colorful" value="colorful">
          Colorful
        </option>
      </select>
      <input
        ref={titleRef}
        className={styles.title}
        type="text"
        name="title"
        placeholder="title"
      />
      <input
        ref={emailRef}
        className={styles.email}
        type="text"
        name="email"
        placeholder="email"
      />
      <textarea
        ref={messageRef}
        className={styles.message}
        name="message"
        placeholder="message"
      />
      <div className={styles.fileInput}>
        <FileInput name={file.fileName} onFileChange={onFileChange} />
      </div>
      <div className={styles.submit}>
        <Button name="Add" onClick={onSubmit} />
      </div>
    </form>
  );
});

export default CardAddForm;
