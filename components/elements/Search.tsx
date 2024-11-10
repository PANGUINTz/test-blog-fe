"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SearchIcon } from "lucide-react";
import CreateBlog from "./CreateBlog";
import { createBlog } from "@/lib/types";

const Search = ({
  submit,
  error,
  searchTerm,
  setSearchTerm,
}: {
  submit: (e: React.FormEvent, data: createBlog) => void;
  error: { [key: string]: string };
  searchTerm: { title: string; category: string };
  setSearchTerm: (value: any) => void;
}) => {
  const [searchActive, setSearchActive] = useState(false);

  // const handleChange = (value: Partial<SearchState>) => {
  //   setSearchTerm((prev) => ({ ...prev, ...value }));
  // };

  return (
    <>
      <div className="md:flex gap-5 mb-5 items-center hidden ">
        <div className="relative w-full">
          <SearchIcon
            className={`absolute top-1/2 -translate-y-1/2 left-3 size-5 ${
              searchTerm.title?.length > 0 && "hidden"
            }`}
          />
          <Input
            type="search"
            placeholder="Search"
            className="focus:ring-0 placeholder:absolute placeholder:left-10"
            onChange={(e) =>
              setSearchTerm((prev: any) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <Select
          onValueChange={(value) =>
            setSearchTerm((prev: any) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
            <SelectValue placeholder="Community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="pets">Pets</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="ashion">Fashion</SelectItem>
            <SelectItem value="exercise">Exercise</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
        <CreateBlog submit={submit} error={error} />
      </div>

      {/* Mobile Responsive */}
      <div className="flex justify-between gap-5 mb-5 items-center sm:hidden ">
        <SearchIcon
          className="cursor-pointer"
          onClick={() => setSearchActive(!searchActive)}
        />
        <div className={`relative w-full ${!searchActive && "hidden"}`}>
          <SearchIcon
            className={`absolute top-1/2 -translate-y-1/2 left-3 size-5 ${
              searchTerm.title?.length > 0 && "hidden"
            }`}
          />
          <Input
            type="search"
            placeholder="Search"
            className="focus:ring-0 placeholder:absolute placeholder:left-10"
            onChange={(e) =>
              setSearchTerm((prev: any) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className={`flex ${searchActive && "hidden"}`}>
          <Select
            onValueChange={(value) =>
              setSearchTerm((prev: any) => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Community" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="pets">Pets</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="ashion">Fashion</SelectItem>
              <SelectItem value="exercise">Exercise</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
          <CreateBlog submit={submit} error={error} />
        </div>
      </div>
    </>
  );
};

export default Search;
