import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function useGetSearchParam(arg: string) {
  const [searchParams] = useSearchParams();
  return searchParams.get(arg as string);
}
