import * as Yup from "yup";

const createRatingSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Please provide a rating between 1 and 5")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  comment: Yup.string(),
});

export default createRatingSchema;
