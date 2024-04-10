import * as yup from "yup";

const todoSchema = yup.object().shape({
    task: yup
        .string()
        .required("Task is required!"),
    body: yup
        .string()
        .required("body is required"),
    estimated_time: yup
        .number("Must be a positive number!")
        .positive()
});

export default todoSchema