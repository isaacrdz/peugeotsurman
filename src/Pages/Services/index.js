import React from 'react';
import PageWrapper from 'Components/PageWrapper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ServiceForm from './Form';
import LinkIcon from 'Components/socialIcons/IconLink';
import GoogleMap from 'Components/GMap';
import { Room } from '@material-ui/icons';
import useStyles from './styles';


const ServicePage = ({state}) => {
    const classes = useStyles();
    return (<PageWrapper>
        <Container maxWidth="lg">
            <img src="assets/images/services/servicio.jpg" style={{width: '100%'}} alt="servicios" />
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Box className={classes.addressBox}>
                        <h3>Agenda tu Cita de Servicio</h3>
                        <Box display="flex" flexDirection="column">
                            {state.service.options.map((opts,inx) => {
                                return <LinkIcon key={`opt${inx}`} {...opts} />
                            })}
                        </Box>
                    </Box>
                    <ServiceForm cars={state.cars} service={state.service} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <h3>Nuestra ubicación</h3>
                    <Box display="flex" alignContent="center">
                        <Room /> <p>{state.service.address}</p>
                    </Box>
                    <GoogleMap src={state.service.map} classes={classes} />
                </Grid>
            </Grid>
        </Container>
    </PageWrapper>);
}

export default ServicePage;