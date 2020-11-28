import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2)
    }
}));

type Props = {
    color: "inherit" | "primary" | "secondary" | undefined;
    size: number;
  };

const Spinner: React.FC<Props> = ({
    color = 'primary',
    size = 40
}: Props) => {
    const classes = useStyles();

    return (
        <CircularProgress className={classes.progress} color={color} size={size} />
    );
};

export default Spinner;
