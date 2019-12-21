import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import Error from "./Error";
import "./FormikForm.scss"

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be 3 characters long!')
        .max(255, "Username must be shorted than 255")
        .required("Must enter a name"),
    email: Yup.string()
        .email('Must be a valid email address!')
        .max(255, "Username must be shorted than 255")
        .required("Must enter an email"),
    password: Yup.string()
        .required('Please Enter your password')
        .matches(
            /^[a-zA-Z0-9]{8,}/,
            "Password must be 8 characters long!"
        ),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"
        ),
    phone: Yup.string()
        .required('Please Enter your phone number')
        .matches(
            /\+380\d{3}\d{2}\d{2}\d{2}$/,
            "Phone is not valid!"
        ),
});

export default function FormikForm() {
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                phone: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);

                setTimeout(() => {
                    alert("Correct form");
                    resetForm();
                    setSubmitting(false);
                }, 500)
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
                <div className="formWrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p className="text"><label htmlFor="username">Username</label></p>
                            <input type="text"
                                   className={errors.username && touched.username ? "form-control error" : "form-control"}
                                   name="username"
                                   id="username"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.username}
                            />
                            <Error touched={touched.username} message={errors.username}/>
                        </div>
                        <div className="form-group">
                            <p className="text"><label htmlFor="email">Email address</label></p>
                            <input type="email"
                                   className={errors.email && touched.email ? "form-control error" : "form-control"}
                                   name="email"
                                   id="email"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.email}
                            />
                            <Error touched={touched.email} message={errors.email}/>
                        </div>
                        <div className="form-group">
                            <p className="text"><label htmlFor="password">Password</label></p>
                            <input type="password"
                                   className={errors.password && touched.password ? "form-control error" : "form-control"}
                                   name="password"
                                   id="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}
                            />
                            <Error touched={touched.password} message={errors.password}/>
                        </div>
                        <div className="form-group">
                            <p className="text"><label htmlFor="confirmPassword">Confirm Password</label></p>
                            <input type="password"
                                   className={errors.confirmPassword && touched.confirmPassword ? "form-control error" : "form-control"}
                                   name="confirmPassword"
                                   id="confirmPassword"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.confirmPassword}
                            />
                            <Error touched={touched.confirmPassword} message={errors.confirmPassword}/>
                        </div>
                        <div className="form-group">
                            <p className="text"><label htmlFor="phone">Phone number</label></p>
                            <input type="tel"
                                   className={errors.phone && touched.phone ? "form-control error" : "form-control"}
                                   name="phone"
                                   id="phone"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.phone}
                            />
                            <Error touched={touched.phone} message={errors.phone}/>
                        </div>
                        <button type="submit" className="submit" disabled={isSubmitting}>
                            Sign up
                        </button>
                    </form>
                </div>
            )}
        </Formik>
    );
}