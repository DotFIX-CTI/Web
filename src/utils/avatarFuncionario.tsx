"use client";

import { api } from "@/api/api";
import Image from "next/image";
import { useEffect, useState } from "react";

const FALLBACK_AVATAR = "/img/user.png";
const blobUrlCache = new Map<number | string, string>();

interface AvatarFuncionarioProps {
  funcionarioID?: number | string | null;
  imgUrl?: string | null;
  nome: string;
  size?: number;
  className?: string;
}

export default function AvatarFuncionario({
  funcionarioID,
  nome,
  size = 32,
  className = "user",
}: AvatarFuncionarioProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (!funcionarioID) return FALLBACK_AVATAR;
    return blobUrlCache.get(funcionarioID) ?? FALLBACK_AVATAR;
  });

  useEffect(() => {
    if (!funcionarioID) {
      setImgSrc(FALLBACK_AVATAR);
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
        setImgSrc(FALLBACK_AVATAR);
      });

    return () => {
      ativa = false;
      if (localObjectUrl && !blobUrlCache.has(funcionarioID)) {
        URL.revokeObjectURL(localObjectUrl);
      }
    };
  }, [funcionarioID]);

  return (
    <Image
      src={imgSrc || FALLBACK_AVATAR}
      width={40}
      height={40}
      alt={`Foto de ${nome}`}
      className={className}
      unoptimized
    />
  );
}
