import { FormControlLabel, Switch } from "@mui/material";
import { Field } from "formik";
import React from "react";

type FormType = {
    name: string,
    label: string,
    values?: boolean
}

const CheckComponent = (props: FormType) => {

    return (
        <Field as={FormControlLabel} name={props.name} style={{ marginLeft: '1rem' }} control={<Switch />} label={props.label} initialValues={props.values} />

    )
}

export default CheckComponent;  