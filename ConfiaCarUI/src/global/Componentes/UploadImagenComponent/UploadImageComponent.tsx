import { Button, Modal, Upload, UploadFile, UploadProps, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { GetServerUrl } from "../../variables";
import axios, { Axios } from "axios";


type UploadImage = {
  url:string
}
/********************************************* */
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(reader.result as string);
  });
/********************************************* */

const UploadImageComponent = (props:UploadImage) => {
    const [fileList, setFileList] :any = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
  
    const handleUpload = () => {
      const formData:any = new FormData();
      fileList.forEach((file:any) => {
        formData.append('files[]', file as RcFile);
      });
      setUploading(true);
      const UploadImage = (Valores: {file:string}) =>
      new Promise((resolver: any, Denegar: any) => {
      axios.post(`${GetServerUrl()}${props.url}`, Valores)
      .then(res => {
      resolver(res);
      
      })
      .catch(err => {
      Denegar(err);
      })
      })
    };
  
    const prop: UploadProps = {
      onRemove: (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
      },
      beforeUpload: (file) => {
        setFileList([...fileList, file]);
  
        return false;
      },
      fileList,
    };
  

    return (
        <>
        <Modal open={true}>
            
          <Upload listType="picture" defaultFileList={[fileList]} {...prop}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={() => {console.log(fileList)}}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
          </Modal>
        </>
      );
}

export default UploadImageComponent;