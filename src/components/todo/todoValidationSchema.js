import * as yup from "yup";

const todoSchema = yup.object().shape({
    task: yup
        .string()
        .required("Title is required!")
});

export default todoSchema