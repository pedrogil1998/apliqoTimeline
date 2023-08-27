import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { makeStyles } from '@mui/styles';
import { TimelineDot } from '@mui/lab';

const useStyles = makeStyles({
    timeline: {
        transform: "rotate(90deg)"
    },
    timelineContentContainer: {
        textAlign: "left"
    },
    timelineContent: {
        display: "inline-block",
        transform: "rotate(-90deg)",
        textAlign: "center",
        minWidth: 50
    },
    timelineIcon: {
        transform: "rotate(-90deg)"
    }
});

export default function BasicTimeline() {
    const classes = useStyles();

    return (
        <Timeline className={classes.timeline} align="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot className={classes.timelineIcon} />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}><div className={classes.timelineContent}>Eat</div></TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot className={classes.timelineIcon} />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}><div className={classes.timelineContent}>Code</div></TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot className={classes.timelineIcon} />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContentContainer}><div className={classes.timelineContent}>Sleep</div></TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}