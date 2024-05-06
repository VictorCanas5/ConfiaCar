import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { TextField } from '@mui/material'

type CustomFieldType = {
    name: string,
    label: string,
    placeholder?: string,
    disabled: boolean,
    password?: boolean
    fnOnchange?(val: any): any
}
const CustomFieldText = (props: CustomFieldType) => {
    return (
        <div style={{zIndex:'5001'}}className="mb-2">
            <div className="input-group">
                <label className="input-group-text" style={{ minWidth: "130px", display: 'block', textAlign: "right", fontWeight: "bold" }} htmlFor={props.name}>{props.label}</label>
                <Field AS={TextField}disabled={props.disabled} className="form-control" type={!props.password ? "text" : "password"} id={props.name} name={props.name} placeholder={props.placeholder ? props.placeholder : ''} onKeyUp={props.fnOnchange} />
            </div>
            <ErrorMessage component="div" name={props.name} className="text-danger" />
        </div>
    )   
}
export default CustomFieldText