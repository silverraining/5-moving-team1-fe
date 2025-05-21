import React from "react";
import DropDownWrapper from "@/shared/components/drop-down/DropDownWrapper";

export default function Test() {
  return (
    <>
      <DropDownWrapper type={"region"} label={"지역"} />
      <DropDownWrapper type={"service"} label={"서비스"} />
    </>
  );
}
