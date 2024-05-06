import { ErrorMessage, Field } from "formik";
import '../../styles/GlobalStyles.css'

type SelectdataComponent = {
    name: string,
    label: string,
    placeholder?: string,
    disabled: boolean,
    options: { value: any, label: string, group?: string }[],
    isMulti?: boolean,
    addDefault: boolean,
    onChange?: (selectedValue: any) => void
}

const SelectComponent2 = (props: SelectdataComponent) => {
    const Grupos: string[] = [];
    props.options.filter((o: any) => o.group !== undefined).forEach((o) => { 
        if (o.group !== undefined && !Grupos.includes(o.group)) Grupos.push(o.group);
    });

    return (
        <div className="propiedadesContenedorSelectComponent" >
            <label className="" htmlFor={props.name}>
                {props.label}
            </label>
            <Field
                id={props.name}
                name={props.name}
                component="select"
                className="selectBox propiedadesFuenteSelector" 
                disabled={props.disabled}
                style={{ overflowX: 'scroll', minWidth:'40%', maxWidth:'100%' }}
                onChange={(event:any) => {
                    const selectedValue = event.target.value;

                    if (props.onChange) {
                        props.onChange(selectedValue);
                    }
                }}
            >
                {props.placeholder !== undefined && (
                    <option key="default">{props.placeholder ? props.placeholder : ''}</option>
                )}

                {props.options
                    .filter((o) => o.group === undefined)
                    .map((optn, index) => (
                        <option key={'nogroup' + index} value={optn.value} label={optn.label} />
                    ))}

                {Grupos.map((g, gi) => (
                    <optgroup key={'g' + gi} label={g}>
                        {props.options
                            .filter((o) => o.group !== undefined && o.group === g)
                            .map((optn, index) => (
                                <option key={'opt__' + index} value={optn.value} label={optn.label} />
                            ))}
                    </optgroup>
                ))}
            </Field>
            <ErrorMessage component="div" name={props.name} className="text-danger" />
        </div>
    );
};

export default SelectComponent2;