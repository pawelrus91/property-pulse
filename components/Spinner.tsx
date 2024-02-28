"use client";

import ClipLoader from "react-spinners/CircleLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

type SpinnerProps = {
  loading: boolean;
};

export default function Spinner({ loading }: SpinnerProps) {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}
