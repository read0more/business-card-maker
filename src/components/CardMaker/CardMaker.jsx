import React, { useCallback, useEffect, useRef, useState } from "react";
import useInput from "../../Hooks/useInput";
import styles from "./CardMaker.module.css";

const CardMaker = ({ firebase, card, isNewCard }) => {
  const [firebaseCardRef, setFirebaseCardRef] = useState();
  const [name, setName, onNameChange] = useInput(card.name);
  const [company, setComapny, onCompanyChange] = useInput(card.company);
  const [theme, setTheme, onThemeChange] = useInput(card.theme);
  const [position, setPosition, onPositionChange] = useInput(card.position);
  const [email, setEmail, onEmailChange] = useInput(card.email);
  const [introduce, setIntroduce, onIntroduceChange] = useInput(card.introduce);
  const [filename, setFilename] = useState(card.filename ?? "");
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const positionRef = useRef();
  const emailRef = useRef();
  const introduceRef = useRef();
  const filenameRef = useRef();
  const inputFileRef = useRef();
  const isFirstRender = useRef(true);

  const setStateFromFirebase = useCallback(
    (snapshotValues) => {
      const {
        name,
        company,
        theme,
        position,
        email,
        introduce,
        filename,
      } = snapshotValues;

      setName(name);
      setComapny(company);
      setTheme(theme);
      setPosition(position);
      setEmail(email);
      setIntroduce(introduce);
      setFilename(filename);
    },
    [
      setComapny,
      setEmail,
      setIntroduce,
      setName,
      setPosition,
      setTheme,
      setFilename,
    ]
  );

  const updateFirebaseFromRef = useCallback(() => {
    if (isNewCard) {
      return;
    }

    const updates = {
      name: nameRef.current.value,
      company: companyRef.current.value,
      theme: themeRef.current.value,
      position: positionRef.current.value,
      email: emailRef.current.value,
      introduce: introduceRef.current.value,
      filename: filenameRef.current.value,
      // todo: filename 대신 filepath로(cloudinary 경로) 바꾸기
    };

    firebaseCardRef.update(updates);
  }, [firebaseCardRef, isNewCard]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, [firebaseCardRef]);

  useEffect(() => {
    if (isNewCard) {
      return;
    }

    const firebaseCardRef = firebase.getUserCardDatabaseRef(card.id);
    setFirebaseCardRef(firebaseCardRef);

    firebaseCardRef.on("value", (snapshot) => {
      const snapshotValues = snapshot.val();
      if (!firebaseCardRef || isFirstRender.current || !snapshotValues) {
        return;
      }

      setStateFromFirebase(snapshotValues);
    });
  }, [card.id, firebase, isNewCard, setStateFromFirebase]);

  const handleOnChange = (onChange, afterOnChangeCallback) => {
    return (event) => {
      onChange(event);
      afterOnChangeCallback();
    };
  };

  const handleFileUploaded = useCallback(() => {
    let filename = inputFileRef.current.files[0].name;
    filename = filename.substring(0, filename.lastIndexOf(".")) || filename;
    filenameRef.current.value = filename;
    setFilename(filename);
  }, []);

  const handleAdd = () => {
    const newCardRef = firebase.getUserDatabaseRef().push();
    newCardRef.set({
      name,
      company,
      theme,
      position,
      email,
      introduce,
      filename,
    });
  };

  const handleDelete = () => {
    firebaseCardRef.remove();
  };

  return (
    <address className={styles["card-maker"]}>
      <input
        type="text"
        className={styles.name}
        value={name}
        ref={nameRef}
        onChange={handleOnChange(onNameChange, updateFirebaseFromRef)}
      />
      <input
        type="text"
        className={styles.company}
        value={company}
        ref={companyRef}
        onChange={handleOnChange(onCompanyChange, updateFirebaseFromRef)}
      />
      <select
        className={styles.theme}
        value={theme}
        ref={themeRef}
        onChange={handleOnChange(onThemeChange, updateFirebaseFromRef)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input
        type="text"
        className={styles.position}
        value={position}
        ref={positionRef}
        onChange={handleOnChange(onPositionChange, updateFirebaseFromRef)}
      />
      <input
        type="email"
        className={styles.email}
        value={email}
        ref={emailRef}
        onChange={handleOnChange(onEmailChange, updateFirebaseFromRef)}
      />
      <textarea
        className={styles.introduce}
        value={introduce}
        ref={introduceRef}
        onChange={handleOnChange(onIntroduceChange, updateFirebaseFromRef)}
      />
      <label className={styles["file-label"]}>
        {filename || "No file"}
        <input type="hidden" ref={filenameRef} />
        <input
          type="file"
          className={styles.file}
          accept="image/*"
          ref={inputFileRef}
          onChange={handleOnChange(handleFileUploaded, updateFirebaseFromRef)}
        />
      </label>
      <button
        className={styles.button}
        onClick={isNewCard ? handleAdd : handleDelete}
      >
        {isNewCard ? "Add" : "Delete"}
      </button>
    </address>
  );
};

export default CardMaker;
