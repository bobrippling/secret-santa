import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    root: {
        width: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    margin: {
        height: theme.spacing(3)
    },
    marginBottom: {
        marginBottom: theme.spacing(4)
    }
}));

export const marks = () => {
    const result = [
        {
            value: 0, label: '£0'
        },
        {
            value: 50, label: '£50'
        }
    ];
    return result;
};

type Props = {
    priceRange: number | number[];
    setPriceRange: (range: number | number[]) => void;

    min: number;
    max: number;
}

const TrackFalseSlider: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const { priceRange, setPriceRange } = props;

    return (
        <div className={classes.root}>
            <Slider
                track={false}
                aria-labelledby="track-false-range-slider"
                marks={marks()}
                valueLabelDisplay="on"
                valueLabelFormat={x => `£${x}`}
                value={priceRange}
                min={props.min}
                max={props.max}
                onChange={(x, y) => {
                    setPriceRange(y);
                }}
            />
        </div>
    );
};

export default TrackFalseSlider;
