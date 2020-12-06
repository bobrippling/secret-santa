import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

const MaterialUIPickers = props => {
    const {
        selectedDate, setSelectedDate, variant, label
    } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant={variant}
                    format="dd/MM/yyyy"
                    autoOk
                    margin="normal"
                    id={label}
                    label={label}
                    value={selectedDate}
                    onChange={setSelectedDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date'
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default MaterialUIPickers;
