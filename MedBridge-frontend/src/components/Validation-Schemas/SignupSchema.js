import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Doctor's Name is Required"),
  username: Yup.string().required("Doctor's Username is Required"),
  speciality: Yup.string().required("Doctor's Speciality is Needed"),
  contactNo: Yup.string().required("Contact No. is Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,15}$/,
      "Password must be at least 4 characters, no more than 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit"
    ),
  email: Yup.string()
    .required()
    .matches(/@gmail\.com$/, "Enter proper Email Address"),
});
