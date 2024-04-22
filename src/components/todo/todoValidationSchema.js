import * as yup from "yup";

const todoSchema = yup.object().shape({
    todo: yup
        .string()
        .required("Todo is required!"),
});

export default todoSchema