"use client";

import React, {useState, useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromQuery} from "@/lib/utils";
import {getAllCategories} from "@/lib/actions/category.actions";
import {ICategory} from "@/lib/database/models/category.model";

const CategoryFilter = () => {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initializeCategoryList = async () => {
      const allCategoryList = await getAllCategories();
      if (Array.isArray(allCategoryList)) {
        setCategoryList(allCategoryList);
      }
    }
    initializeCategoryList();
  }, []);

  const handleCategorySelect = (category: string) => {
    let newUrl = "";
    if (category && category !== "all") {
      newUrl = formUrlQuery({params: searchParams.toString(), key: "category", value: category})
    } else {
      newUrl = removeKeysFromQuery({params: searchParams.toString(), keysToRemove: ["category"]})
    }
    router.push(newUrl, {scroll: false});
  }

  return (
      <Select onValueChange={(value: string) => handleCategorySelect(value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="select-item p-regular-14">All</SelectItem>
          {Array.isArray(categoryList) && categoryList.map(category => (
              <SelectItem key={category._id} value={category.name} className={"select-item p-regular-14"}>{category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
};

export default CategoryFilter;
