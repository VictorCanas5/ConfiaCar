import { useState, useEffect } from "react";
import Viewer from 'react-viewer';
import { Box } from "@mui/material";

const ImgViewer = (props: any) => {

    const [openImg, setOpenImg] = useState(false)

    const [imgSrc, setimgSrc] = useState('')

    const fnCerrar = () => setOpenImg(false)

    const fnOpen = () => setOpenImg(true)

    useEffect(() => {
        if (props.typeByte) {
            // let Imagen_Bin_String = bin2string(props.imgSrc);
    
            // console.log(Imagen_Bin_String)
    
            // let Imagen_Base64 = btoa(Imagen_Bin_String);  
    
            // let Imagen_Base64 = btoa(props.imgSrc);  
    
            // console.log(Imagen_Base64)
    
            setimgSrc('data:image/png;base64,' + props.imgSrc)
    
            // console.log(props.imgSrc)
    
        } else {
            //setimgSrc(props.imgSrc)
        }
    }, [props.imgSrc])





  return (
    <div>
      <Box>
        <Viewer
                    zIndex={props.zIndex}
                    visible={openImg}
                    onClose={fnCerrar}
                    noToolbar={props.noToolbar}
                    images={[{ src: imgSrc, alt: '' }]}
                />
      </Box>
    </div>
  )
}

export default ImgViewer
