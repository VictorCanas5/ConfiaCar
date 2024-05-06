export interface ColumnTypeI  {
    name:string;
    label:string;
    options?: {
        filter?: boolean;
        customBodyRenderLite?: (dataIndex: number) => JSX.Element;
        customBodyRender?: (_value: any, tableMeta: { rowData: any }) => JSX.Element;
      };
};

export interface ColumnTypeI2  {
    name:string;
    label:string;
    options?: {
        filter?: boolean;
        customBodyRenderLite?: (dataIndex: number) => JSX.Element;
        customBodyRender?: (_value: any, tableMeta: { rowIndex: number, rowData: any[], tableData: any[] }) => JSX.Element;
      };
};

export interface optionsTypeI {
    filterType: "dropdown" | "checkbox" | "multiselect" | undefined;
    responsive: "vertical" | "standard" | "simple"  | undefined;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    scrollX: boolean;
    selectableRows: "single" | "multiple" | "none";
    onRowClick?: any;
    onRowsSelect?:any;
};

export interface optionsI {
     value: number,
     label: string 
}

export interface FilaSeleccionada {
    dataIndex: number;
    dataIndexes: number[];
    rowIndex: number;
    rowSelected: boolean;
    data: any[]; 
  }

 export interface StyleI {
    position: 'absolute' | 'fixed' | 'relative' | 'static';
    top:string;
    left: string;
    transform:string;
    width: number;
    bgcolor:string;
    p:number;
  }