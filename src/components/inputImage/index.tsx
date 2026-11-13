import Icon from "@/utils/icon";
import style from "./input.module.css";

export default function InputImage() {
  return (
    <>
      <label htmlFor="Imagem" className="label">
        Imagem *
      </label>
      <article className={`${style.input}`}>
        <Icon name="imagechange" size={36} />
      </article>
    </>
  );
}
