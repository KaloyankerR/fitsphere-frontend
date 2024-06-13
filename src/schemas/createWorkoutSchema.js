import * as Yup from "yup";

const createWorkoutSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string().max(
    500,
    "Description must be at most 500 characters"
  ),
});

export default createWorkoutSchema;
