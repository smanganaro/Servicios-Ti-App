import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "./Button.js"

const styles = {
};

const useStyles = makeStyles(styles);

export default function CustomizedButtons() {
    const classes = useStyles();

    return (
        <div>
            <Button

                color="primary"
            >
                Add New
            </Button>
        </div>
    );
}