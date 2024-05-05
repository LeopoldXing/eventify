import React, {startTransition, useState} from 'react';
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

type DropdownProps = {
  categoryList: any[],
  value: string,
  onChangeHandler?: (value: string) => void
}

const CategoryDropdown = ({categoryList, value, onChangeHandler}: DropdownProps) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {

  };

  return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="form-select">
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(categoryList) && categoryList.map(category => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
          ))}
          <AlertDialog>
            <AlertDialogTrigger className="pl-6 py-2 rounded-b-lg">Open</AlertDialogTrigger>
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
