import { FormControlLabel, Switch } from "@mui/material";
import { Field, useFormikContext } from "formik";
import React from "react";

type FormType = {
    name: string,
    label: string,
    values?: boolean
}

interface CustomValues {
    [key: string]: any;
}

const CheckComponent2 = (props: FormType) => {
    const { setFieldValue, values } = useFormikContext<CustomValues>();
    const isChecked = values[props.name]; // Obtener el valor del formulario según el nombre del campo

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFieldValue(name, checked); // Actualizar el valor en el formulario
    };

    return (
        <Field
            as={FormControlLabel}
            name={props.name}
            style={{ marginLeft: '1rem' }}
            control={<Switch checked={isChecked} onChange={handleChange} />} // Utilizar isChecked para controlar el estado del Switch
            label={props.label}
        />
    )
}

export default CheckComponent2;