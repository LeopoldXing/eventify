import React, {startTransition, useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {createCategory, getAllCategories} from "@/lib/actions/category.actions";
import {ICategory} from "@/lib/database/models/category.model";

type DropdownProps = {
  value?: string,
  onChangeHandler?: () => void
}

const CategoryDropdown = ({value, onChangeHandler}: DropdownProps) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({categoryName: newCategory.trim()}).then((category) => {
      setCategoryList((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getAllCategoryList = async () => {
      const allCategoryList = await getAllCategories();
      Array.isArray(allCategoryList) && setCategoryList(allCategoryList);
    }
    getAllCategoryList();
  }, [newCategory]);

  return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="form-select">
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(categoryList) && categoryList.map(category => (
              <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
          ))}
          <AlertDialog>
            <AlertDialogTrigger className="pl-6 py-2 w-full rounded-sm text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Category name" className="form-input mt-3" onChange={(e) => setNewCategory(e.target.value)}/>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </SelectContent>
      </Select>
  );
};

export default CategoryDropdown;
