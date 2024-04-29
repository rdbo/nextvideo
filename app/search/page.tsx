"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const params = useSearchParams();
  const searchQuery = params.get("query");

  useEffect(() => {
    if (!searchQuery) {
      router.push("/");
      return;
    }
  }, []);

  return <h1>{searchQuery}</h1>;
}
