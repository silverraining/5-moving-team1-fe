"use client";

import { useState, useRef, useEffect } from "react";
import DropDownButton from "./DropDownButton";
import DropDownList from "./DropDownList";
import { ServiceType, RegionType } from "@/src/lib/constants";
import { Box } from "@mui/material";

interface DropDownWrapperProps {
  type: "region" | "service";
  label: string;
  forceMobileSize?: boolean;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

export default function DropDownWrapper({
  type,
  forceMobileSize,
  selectedValue,
  onSelect,
}: DropDownWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    selectedValue || (type === "region" ? "지역" : "서비스")
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedValue) {
      setSelectedItem(selectedValue);
    } else {
      setSelectedItem(type === "region" ? "지역" : "서비스");
    }
  }, [type, selectedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const items = type === "region" ? RegionType : ServiceType;
  const displayItems = ["전체", ...items];

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <Box ref={wrapperRef} sx={{ position: "relative" }}>
      <DropDownButton
        label={selectedItem}
        isSelected={isOpen}
        onClick={toggleDropdown}
        forceMobileSize={forceMobileSize}
      />
      {isOpen && (
        <DropDownList
          type={type}
          items={displayItems}
          selectedItem={selectedItem}
          onSelect={handleSelect}
        />
      )}
    </Box>
  );
}
