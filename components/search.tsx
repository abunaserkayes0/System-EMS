"use client";
import React, { useState } from "react";
import { Input, Select } from "antd"; // Replace with your actual UI library import
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface SearchComponentProps {
  // onSearch: (value: string, category: string | null) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = () => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(null);

  // const handleSearch = () => {
  //   if (onSearch) {
  //     onSearch(value, category);
  //   }
  // };

  return (
    <div className="flex rounded-2xl w-48 px-4 bg-white ">
      <SearchOutlined />

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-none"
      />
    </div>
  );
};

export default SearchComponent;
