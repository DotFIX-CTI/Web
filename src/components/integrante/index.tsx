import Image from "next/image"

export default function Integrante() {
  return (
    <article className="center gap-2">
      <Image
        src="/img/user.png"
        width={64}
        height={64}
        alt="Picture of the author"
        className="user"
      />
      <div>
        <h5>Arthur Sales</h5>
        <p>arthur@gmail.com</p>
      </div>
    </article>
  );
}
