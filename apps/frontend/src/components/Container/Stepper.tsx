import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

interface Props {
    stepNames: string[]
    stepComponents: ((buttonAction) => React.ReactNode)[]
}

export default function HorizontalNonLinearStepper({stepNames, stepComponents}: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return stepNames.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };



    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                stepNames.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };




    return (
        <>
            <Stepper
                sx={{
                    marginY: "16px",
                    width: "100%",
                    zIndex: 2,
                }}
                alternativeLabel
                nonLinear
                activeStep={activeStep}
            >
                {stepNames.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton
                            disableTouchRipple
                            disableRipple
                            color="inherit"
                            onClick={handleStep(index)}
                            sx={{
                                paddingRight: "0px",
                            }}
                        >
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            {/* Stepper Content*/}
            <div className={"w-[90%]"}>
                {stepComponents[activeStep](handleComplete)}
            </div>

            {/* TODO icon shows completed and change to representative icons */}
        </>
    );
}