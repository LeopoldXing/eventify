"use server";

import {CreateCategoryParams} from "@/types";
import {handleError} from "@/lib/utils";
import Category from "@/lib/database/models/category.model";
import {connectToDatabase} from "@/lib/database";

/**
 * Create a new category
 * @param categoryName category name entered by the user
 */
const createCategory = async ({categoryName}: CreateCategoryParams) => {
  try {
    const newCategory = await Category.create({name: categoryName});
    return JSON.parse(JSON.stringify(newCategory));
  } catch (e) {
    handleError(e);
  }
}

/**
 * get all categories in a list from the database
 */
const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categoryList = await Category.find();
    return JSON.parse(JSON.stringify(categoryList));
  } catch (e) {
    handleError(e);
  }
}

export {createCategory, getAllCategories};
