import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  showFieldError,
  capitalizeFirstLetter,
  trimAndLowerCase,
} from "Components/Forms/Utils";
import { EMAIL_PATTERN } from "Constants";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import useStyles from "../styles";
import { MsgDialog } from "Components/Dialogs";
import axios from "axios";

const reasons = ["Cotizar auto", "Prueba de manejo"];

const ContactForm = ({ cars, contact, vehicle }) => {
  const classes = useStyles();
  const { control, errors, handleSubmit } = useForm();
  const [showThaks, setShowThanks] = useState(false);
  const [msgDialog, setMsgDialog] = useState({ open: false });
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const userData = {
      ...data,
      reason: `${data.reason} - Nuevo registro Peugeot Garza Sada Monterrey`,
      emails: ["leonel.vargas@surman.com"],
      name: capitalizeFirstLetter(data.name),
      email: trimAndLowerCase(data.email),
      landing: "peugeot-surman",
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `https://apicarone.com/api/v1/utils/send-email`,
      userData,
      config
    );

    if (response.status === 200) {
      setShowThanks(true);
    } else
      setMsgDialog({
        open: true,
        title: "ERROR DE ENVÍO!",
        message: response?.error,
        onClose: () => {
          setMsgDialog({ open: false });
        },
      });
    setLoading(false);
  };

  useEffect(() => {
    if (showThaks && window.gtag) {
      window.gtag("config", "AW-711752316");
      window.gtag("event", "conversion", {
        send_to: "AW-711752316/lAuyCOqWldEBEPz0sdMC",
      });
    }
  }, [showThaks]);

  if (showThaks) {
    return (
      <Paper className={classes.formThanks}>
        <h2>Muchas Gracias</h2>
        <p>
          Por comunicarte con nosotros.
          <br />
          En breves momentos un asesor se pondrá en contacto contigo.
        </p>
      </Paper>
    );
  }

  return (
    <Box className={classes.form}>
      <h4>{contact.text}</h4>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Controller
          as={TextField}
          name="name"
          label="Nombre Completo:"
          {...showFieldError(errors.name, {
            required: "Por favor escriba su nombre completo",
          })}
          rules={{ required: true }}
          control={control}
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <Controller
          as={TextField}
          name="phone"
          label="Teléfono:"
          {...showFieldError(errors.phone, {
            required: "Por favor escriba su teléfono",
          })}
          rules={{ required: true }}
          control={control}
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <Controller
          as={TextField}
          name="email"
          label="Email:"
          {...showFieldError(errors.email, {
            required: "Por favor escriba su correo electrónico",
            pattern: "Escriba un correo electrónico válido",
          })}
          rules={{ required: true, pattern: EMAIL_PATTERN }}
          control={control}
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <Controller
          name="vehicle"
          control={control}
          defaultValue={cars[0].title}
          render={({ onChange, value }) => {
            return (
              <TextField
                select
                label="Vechiculo:"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                variant="outlined"
                size="small"
              >
                {cars.map((car) => (
                  <MenuItem key={car.id} value={car.title}>
                    {car.title}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
        <Controller
          name="reason"
          control={control}
          defaultValue={reasons[0]}
          render={({ onChange, value }) => {
            return (
              <TextField
                select
                label="Motivo:"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                variant="outlined"
                size="small"
              >
                {reasons.map((reason, inx) => (
                  <MenuItem key={`rs${inx}`} value={reason}>
                    {reason}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
        <Controller
          as={TextField}
          name="cpc"
          label="Código Promocional:"
          control={control}
          defaultValue=""
          variant="outlined"
          size="small"
        />
        <Controller
          as={TextField}
          rules={{ required: true }}
          multiline={true}
          rows={4}
          className={classes.text_field}
          name="comments"
          label="Comentario:"
          control={control}
          defaultValue=""
          {...showFieldError(errors.comments, {
            required: "Por favor escriba un comentario",
          })}
          variant="outlined"
          size="small"
        />
        <Divider />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          disabled={loading}
          fullWidth
        >
          ENVIAR
        </Button>
      </form>
      <MsgDialog {...msgDialog} />
    </Box>
  );
};

export default ContactForm;
