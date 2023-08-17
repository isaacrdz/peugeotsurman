import React from 'react';
import SocialIcons from 'Components/socialIcons';

const Footer = ({classes,state}) => {
    const { footer } = state;
    const { title, url } = footer.legal;
    return (<div className={classes.footer}>
        <a className="text" href={url} target="_blank">{title}</a>
        <div className="text">{footer.address}</div>
        <SocialIcons social={state.social} />
    </div>)
}

export default Footer;