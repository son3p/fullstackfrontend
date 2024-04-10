import * as yup from "yup";

const todoSchema = yup.object().shape({
    task: yup
        .string()
        .required("Task is required!"),
    estimated_time: yup
        .number("Must be a positive number!")
        .positive(),
    priority: yup
        .string()
        .required("Priority is required!"),
    deadline: yup
        .date()
});

export default todoSchema