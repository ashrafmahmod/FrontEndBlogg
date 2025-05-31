import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import "./admin-table.css";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  });
  // delete category handler using sweet alert
  const delteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        // swal("category Has Been Deleted", {
        //   icon: "success",
        // });
        dispatch(deleteCategory(categoryId));
      }
      // else {
      //   swal("Something went wrong!");
      // }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>

              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => {
              return (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <b>{item.title}</b>
                  </td>

                  <td>
                    <div className="table-button-group">
                      <button onClick={() => delteCategoryHandler(item._id)}>
                        Delete Category
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoriesTable;
