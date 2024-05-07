import { Backdrop } from "@mui/material";
import { Modal, Result } from "antd";
import React from "react";
type TypeMessage = {
    title: string,
    subtitle: string,
    open:boolean,
    onClick:any,
    status:any
}

const Message = (props:TypeMessage) => {


    return(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        onClick={props.onClick}
    >
        <Modal zIndex={10000} open={props.open}  closeIcon={[]}  footer={[]}>
            <Result
                style={{color:"#fff"}}
                status={props.status}
                extra=""
                title={props.title}
                subTitle={props.subtitle}
              />
        </Modal>
  </Backdrop>

    );
}

export default Message;