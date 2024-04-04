import * as yup from "yup";

const todoSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required!")
        .min(1, "Must be at least 1 characters!")
        .max(100, "Must be maximum 100 characters!"),
});

export default todoSchema