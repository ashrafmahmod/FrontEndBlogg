import { categoryActions } from "../slices/categorySlice";
import request from "../../utiities/request";
import { toast } from "react-toastify";
// fetch all categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");

      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// create category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(categoryActions.addCategory(data));
      toast.success("category is created");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// delete category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
