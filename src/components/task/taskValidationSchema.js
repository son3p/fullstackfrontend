import * as yup from "yup";

const taskSchema = yup.object().shape({
    task: yup
        .string()
        .required("Todo is required!"),
    priority: yup
        .string()
        .required("priority is required!"),
    estimated_time: yup
        .string()
        .required("estimated_time is required!"),
});

export default taskSchema