import { TextField } from "@mui/material";
import { Field } from "formik";


type TextComp = {
    id:string,
    name:string,
    DefaultValue: any,
    HelperText?:string,
    type:string
}

const TextComponent = (props:TextComp) => {

    return(
<Field as={TextField}  autoComplete="off"  className="form-control" type={props.type} id={props.name} name={props.name} label={props.id} variant="standard" fullWidth defaultValue={props.DefaultValue} />    );

}

export default TextComponent;