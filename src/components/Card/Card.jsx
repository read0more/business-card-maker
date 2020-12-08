import React, { memo, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { toPng } from "html-to-image";
import styles from "./Card.module.css";

const DEFAULT_IMAGE = "/images/default_logo.png";

function getStyles(theme) {
  switch (theme) {
    case "dark":
      return styles.dark;
    case "light":
      return styles.light;
    case "colorful":
      return styles.colorful;
    default:
      throw new Error(`unknown theme: ${theme}`);
  }
}

const Card = memo(({ card }) => {
  const { name, company, title, email, message, theme, fileURL } = card;
  const cardRef = useRef();
  const url = fileURL || DEFAULT_IMAGE;

  const downloadCard = useCallback(() => {
    toPng(cardRef.current).then((png) => {
      const link = document.createElement("a");
      link.download = "card.png";
      link.href = png;
      link.click();
    });
  }, [cardRef]);

  return (
    <li className={`${styles.card} ${getStyles(theme)}`} ref={cardRef}>
      <img className={styles.avatar} src={url} alt="profile" />
      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.company}>{company}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.email}>{email}</p>
        <p className={styles.message}>{message}</p>
      </div>
      <FontAwesomeIcon
        icon={faDownload}
        className={styles.icon}
        onClick={downloadCard}
      />
    </li>
  );
});

export default Card;
