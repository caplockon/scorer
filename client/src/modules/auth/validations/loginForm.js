import * as yup from "yup"
import {validate} from "@/utils/validation";

const specs = {};

specs.email = yup.string()
    .required("LoginView.ErrorNoEmailProvided")
    .min(1, "LoginView.ErrorNoEmailProvided")
    .email("LoginView.ErrorInvalidEmailProvided");

specs.password = yup.string()
    .required("LoginView.ErrorNoPasswordProvided")
    .min(1, "LoginView.ErrorNoPasswordProvided");

const schema = yup.object(specs)

export const validateForm = function (value) {
    return validate(schema, value);
}
