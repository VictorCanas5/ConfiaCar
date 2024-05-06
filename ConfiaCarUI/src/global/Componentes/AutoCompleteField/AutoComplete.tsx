import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";

export type SociaData = {
  value: number;
  label: string;
  nombreCompleto?: string;
  
};

type AutFieldType = {
  defaultValue: SociaData;
  name: string;
  id: string;
  label: string;
  Data: SociaData[] ;
  option?: string; // Opcional, ya que no lo estás usando
  handleFilter?: (selectedOption: any) => void;
};

export const AutocompleteField = (props: AutFieldType)  => {
    const isMobile = useMediaQuery("(max-width: 200px)");
    const [open, setOpen] = useState<boolean>(false);
  
    const handleOpen = () : void => {
      if (!isMobile) {
        setOpen(true);
      }
    };
  
    return (
      <Autocomplete
        id={props.id}
        size="small"
        options={props.Data}
        getOptionLabel={(option) => option.label || ''}
        defaultValue={props.defaultValue}
        open={open}
        onOpen={handleOpen}
        onClose={() => setOpen(false)}
        renderInput={(params) => (
          <TextField
          style={{minWidth:'100%', maxWidth:'200%'}}
            {...params}
            variant="standard"
            label={props.label}
            placeholder={props.label}
            onClick={handleOpen}
          />
        )}
        onChange={(event, newValue) => {
          props.handleFilter && props.handleFilter(newValue);
        }}
      />
    );
  };



