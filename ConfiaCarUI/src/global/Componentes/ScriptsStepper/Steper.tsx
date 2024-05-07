import React from "react";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StoreIcon from '@mui/icons-material/Store';
import { Stack, Step, StepConnector, StepIconProps, StepLabel, stepConnectorClasses, styled } from "@mui/material";
import Stepper from '@mui/material/Stepper';

type SteperType= {
    NameStep1:string[],
    NameStep2?:string,
    NameStep3?:string,
    Step:number

}
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));
  
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <GroupAddIcon />,
      2: <GroupAddIcon />,
      3: <GroupAddIcon />,
    };
  
    return (
      <ColorlibStepIconRoot  ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot >
    );
  }

const StepperComponent = (props:SteperType) => {

    return(

    <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={props.Step} connector={<ColorlibConnector />}>
                {props.NameStep1.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
                ))}
        </Stepper>
    </Stack>
    )

}

export default StepperComponent;