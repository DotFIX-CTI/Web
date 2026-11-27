"use client";

import Image from "next/image";
import { api } from "@/api/api";
import { useEffect, useState } from "react";

const FALLBACK_AVATAR = "/img/user.png";
const blobUrlCache = new Map<number | string, string>();

interface ImagemFuncionarioProps {
  funcionarioID?: number | string | null;
  imgUrl?: string | null;
  nome: string;
  size?: number;
  className?: string;
}

export default function ImagemFuncionario({
  funcionarioID,
  imgUrl,
  nome,
  size = 32,
  className = "user",
}: ImagemFuncionarioProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (funcionarioID && blobUrlCache.has(funcionarioID)) {
      return blobUrlCache.get(funcionarioID)!;
    }
    return imgUrl || FALLBACK_AVATAR;
  });

  useEffect(() => {
    if (!funcionarioID) {
      setImgSrc(imgUrl || FALLBACK_AVATAR);
      return;
    }

    const cachedUrl = blobUrlCache.get(funcionarioID);
    if (cachedUrl) {
      setImgSrc(cachedUrl);
      return;
    }

    let ativa = true;
    let localObjectUrl: string | null = null;

    api
      .get<Blob>(`Funcionario/imagem/${funcionarioID}`, {
        responseType: "blob",
      })
      .then((res) => {
        if (!ativa) return;
        const url = URL.createObjectURL(res.data);
        localObjectUrl = url;
        blobUrlCache.set(funcionarioID, url);
        setImgSrc(url);
      })
      .catch(() => {
        if (!ativa) return;
        setImgSrc(imgUrl || FALLBACK_AVATAR);
      });

    return () => {
      ativa = false;
      if (localObjectUrl && !blobUrlCache.has(funcionarioID)) {
        URL.revokeObjectURL(localObjectUrl);
      }
    };
  }, [funcionarioID, imgUrl]);

  return (
    <Image
      src={imgSrc || FALLBACK_AVATAR}
      width={size}
      height={size}
      alt={`Foto de ${nome}`}
      className={className}
      onError={() => setImgSrc(FALLBACK_AVATAR)}
      unoptimized
    />
  );
}
