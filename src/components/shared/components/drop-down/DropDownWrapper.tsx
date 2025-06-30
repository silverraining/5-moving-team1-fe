"use client";

import { useState } from "react";
import DropDownButton from "./DropDownButton";
import DropDownList from "./DropDownList";
import { RegionType, ServiceType } from "@/src/lib/constants";

interface DropDownWrapperProps {
  type: "region" | "service";
  label: string;
}

export default function DropDownWrapper({ type, label }: DropDownWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("전체");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const items = type === "region" ? RegionType : ServiceType;
  const displayItems = ["전체", ...items];

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <DropDownButton
        label={selectedItem}
        isSelected={isOpen}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <DropDownList
          type={type}
          items={displayItems}
          selectedItem={selectedItem}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
