import React, { useEffect, useState } from 'react';
import fetchData from 'Api';
import { useForm, Controller } from "react-hook-form";
import { showFieldError,capitalizeFirstLetter,trimAndLowerCase } from 'Components/Forms/Utils';
import { EMAIL_PATTERN } from 'Constants';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useStyles from '../styles';
import { MsgDialog } from 'Components/Dialogs';

const services = ["10,000 km","20,000 km","30,000 km","40,000 km","50,000 km","60,000 km","70,000 km","80,000 km","Otro"];

const ServiceForm = ({cars,service}) => {
    const classes = useStyles();
    const { control, errors, handleSubmit } = useForm();
    const [showThaks, setShowThanks] = useState(false);
    const [msgDialog, setMsgDialog] = useState({open:false});

    const onFormSubmit = (data) =>{
        const userData = {...data, name: capitalizeFirstLetter(data.name), email: trimAndLowerCase(data.email) };
        
        fetchData.post('service/userData.php',userData).then(rsp => {
            console.log('RSP', rsp);
            if(rsp.sent){
                setShowThanks(true);
            }else{
                setMsgDialog({open:true, title:"ERROR DE ENVÍO!", message: rsp.error, onClose: () =>{
                    setMsgDialog({open:false});
                }})
            }
        })
        
        
    }

    useEffect(() => {
        if(showThaks && window.gtag){
            window.gtag('config', 'AW-711752316');
            window.gtag('event', 'conversion', {'send_to': 'AW-711752316/lAuyCOqWldEBEPz0sdMC'});
        }
    },[showThaks]);

    if(showThaks){
        return (<Paper className={classes.formThanks}>
            <h2>Muchas Gracias</h2>
            <p>Por comunicarte con nosotros.<br/>En breves momentos un asesor se pondrá en contacto contigo.</p>
        </Paper>)
    }

    return (<Box className={classes.form}>
        <h4>{service.text}</h4>
       <form onSubmit={handleSubmit(onFormSubmit)}>
            <Controller as={TextField} name="name" label="Nombre Completo:" {...showFieldError(errors.name,{required: "Por favor escriba su nombre completo"})} rules={{ required: true}} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="phone" label="Teléfono:" {...showFieldError(errors.phone,{required: "Por favor escriba su teléfono"})} rules={{ required: true }} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="email" label="Email:" {...showFieldError(errors.email,{required: "Por favor escriba su correo electrónico", pattern: 'Escriba un correo electrónico válido'})} rules={{ required: true, pattern: EMAIL_PATTERN }} control={control} defaultValue="" variant="outlined" size="small" />
            <Controller name="vehicle" control={control} render={({ onChange, value }) =>{
                return (<TextField select label="Vechiculo:" value={value} onChange={(e) => onChange(e.target.value)} variant="outlined" size="small">
                    {cars.map((car) => <MenuItem key={car.id} value={car.title}>{car.title}</MenuItem>)}
                    <MenuItem value="otro">Otro</MenuItem>
                </TextField>);
            }} />
            <Controller as={TextField} name="vin" label="VIN:" control={control} defaultValue="" variant="outlined" size="small" />
            <Controller as={TextField} name="placas" label="Placas:" control={control} defaultValue="" variant="outlined" size="small" />
            <Controller name="service" control={control} render={({ onChange, value }) =>{
                return (<TextField select label="¿Qué servicio le realizarás a tu Peugeot?:" value={value} onChange={(e) => onChange(e.target.value)} variant="outlined" size="small">
                    {services.map((srv) => <MenuItem key={srv} value={srv}>{srv}</MenuItem>)}
                </TextField>);
            }} />
            <Controller as={TextField} rules={{ required: true }} multiline={true} rows={4} className={classes.text_field} name="comments" label="Comentario:" control={control} defaultValue="" {...showFieldError(errors.comments,{required: "Por favor escriba un comentario"})} variant="outlined" size="small" />
            <Divider />
            <Button type="submit" variant="contained" color="primary" disableElevation fullWidth>ENVIAR</Button>
       </form>
       <MsgDialog {...msgDialog} />
    </Box>)
}

export default ServiceForm;