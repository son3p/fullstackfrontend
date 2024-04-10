import * as yup from "yup";

const todoSchema = yup.object().shape({
    task: yup
        .string()
        .required("Task is required!"),
    priority: yup
        .string()
        .required("Priority is required"),
    estimated_time: yup
        .number("Must be a positive number!")
        .positive(),
    deadline: yup
        .date()
        .required("Deadline is required")
});

export default todoSchema