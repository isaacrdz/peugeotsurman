import React from "react";
import PageWrapper from "Components/PageWrapper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ContactForm from "./Form";
import LinkIcon from "Components/socialIcons/IconLink";
import GoogleMap from "Components/GMap";
import { Room } from "@material-ui/icons";
import useStyles from "./styles";

const ContactPage = ({ state }) => {
  const classes = useStyles();
  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Box className={classes.addressBox}>
              <h3>Agenda tu Cita</h3>
              <Box display="flex" flexDirection="column">
                {state.contact.options.map((opts, inx) => {
                  return <LinkIcon key={`opt${inx}`} {...opts} />;
                })}
              </Box>
            </Box>
            <ContactForm cars={state.cars} contact={state.contact} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <h3>Nuestra ubicación</h3>
            <Box display="flex" alignContent="center">
              <Room /> <p>{state.contact.address}</p>
            </Box>
            <GoogleMap src={state.contact.map} />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default ContactPage;
