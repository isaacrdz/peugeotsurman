import useStyles from './styles';

const GoogleMap = ({src}) => {
    const classes = useStyles();
    return (<iframe src={src} className={classes.map} aria-hidden="false" tabIndex="0"></iframe>)
}

export default GoogleMap;