"use client";

import Image from "next/image";
import { api } from "@/api/api";
import { useEffect, useState } from "react";

const FALLBACK_IMAGEM = "/img/user.png";
const equipeBlobCache = new Map<string, string>();

interface ImagemEquipeProps {
  equipeID?: number | string | null;
  imgUrl?: string | null;
  nomeEquipe: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  cacheBustKey?: string | number;
}

export default function ImagemEquipe({
  equipeID,
  imgUrl,
  nomeEquipe,
  className,
  fill = false,
  sizes,
  cacheBustKey,
}: ImagemEquipeProps) {
  const cacheKey =
    equipeID !== undefined && equipeID !== null
      ? `${equipeID}:${cacheBustKey ?? imgUrl ?? ""}`
      : null;

  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (cacheKey && equipeBlobCache.has(cacheKey)) {
      return equipeBlobCache.get(cacheKey)!;
    }
    return imgUrl || FALLBACK_IMAGEM;
  });

  useEffect(() => {
    if (!equipeID || !cacheKey) {
      setImgSrc(imgUrl || FALLBACK_IMAGEM);
      return;
    }

    const cachedUrl = equipeBlobCache.get(cacheKey);
    if (cachedUrl) {
      setImgSrc(cachedUrl);
      return;
    }

    let ativa = true;
    let localObjectUrl: string | null = null;

    api
      .get<Blob>(`Equipe/imagem/${equipeID}`, {
        responseType: "blob",
      })
      .then((res) => {
        if (!ativa) return;
        const url = URL.createObjectURL(res.data);
        localObjectUrl = url;
        equipeBlobCache.set(cacheKey, url);
        setImgSrc(url);
      })
      .catch(() => {
        if (!ativa) return;
        setImgSrc(imgUrl || FALLBACK_IMAGEM);
      });

    return () => {
      ativa = false;
      if (localObjectUrl && !equipeBlobCache.has(cacheKey)) {
        URL.revokeObjectURL(localObjectUrl);
      }
    };
  }, [equipeID, imgUrl, cacheKey]);

  return (
    <Image
      src={imgSrc || FALLBACK_IMAGEM}
      alt={`Imagem da equipe ${nomeEquipe}`}
      className={className}
      fill={fill}
      sizes={sizes}
      onError={() => setImgSrc(FALLBACK_IMAGEM)}
      unoptimized
    />
  );
}
