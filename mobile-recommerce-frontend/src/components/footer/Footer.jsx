import "../footer/Footer.css";

import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link
} from "@mui/material";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock
} from "react-icons/fa";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <Box className="footer">

            <Container maxWidth="xl">

                <Grid
                 container
                 spacing={8}
                 justifycontent="space-between"
                 alignitems="flex-start"
                >

                    {/* Company */}

                    <Grid size={{ xs: 12, md: 4 }}>

                        <div className="footer-logo">

                            <h2>

                                <span className="logo-dark">
                                    AMBATTUR
                                </span>

                                <span className="logo-orange">
                                    MOBILES
                                </span>

                            </h2>

                            <p className="footer-tagline">
                                Trusted Refurbished Mobiles & Repair
                            </p>

                        </div>

                        <Typography className="footer-description">

                            Professional mobile repair, refurbished smartphones,
                            premium accessories and expert technicians serving
                            Ambattur with quality service at affordable prices.

                        </Typography>

                        <div className="footer-social">

                            <IconButton>
                                <FaFacebookF />
                            </IconButton>

                            <IconButton>
                                <FaInstagram />
                            </IconButton>

                            <IconButton>
                                <FaLinkedinIn />
                            </IconButton>

                            <IconButton>
                                <FaYoutube />
                            </IconButton>

                        </div>

                    </Grid>

                    {/* Quick Links */}

                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>

                        <Typography className="footer-heading">

                            Quick Links

                        </Typography>

                        <Link href="/">Home</Link>
                        <Link href="/repair">Book Repair</Link>
                        <Link href="/refurbished">Refurbished Mobiles</Link>
                        <Link href="/accessories">Accessories</Link>
                        <Link href="/contact">Contact</Link>

                    </Grid>

                    {/* Services */}

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                        <Typography className="footer-heading">

                            Services

                        </Typography>

                        <Typography>Screen Replacement</Typography>
                        <Typography>Battery Replacement</Typography>
                        <Typography>Charging Port Repair</Typography>
                        <Typography>Water Damage Repair</Typography>
                        <Typography>Software Repair</Typography>

                    </Grid>

                    {/* Contact */}

                    <Grid size={{ xs: 12, md: 3 }}>

                        <Typography className="footer-heading">

                            Contact

                        </Typography>

                        <div className="contact-item">

                            <FaMapMarkerAlt />

                            <span>

                                Ambattur,
                                Chennai,
                                Tamil Nadu

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaPhoneAlt />

                            <span>

                                +91 98765 43210

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaEnvelope />

                            <span>

                                support@ambatturmobiles.in

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaClock />

                            <span>

                                All Days
                                <br />
                                9:00 AM – 9:00 PM

                            </span>

                        </div>

                    </Grid>

                </Grid>

                <div className="footer-bottom">

                    © {year} Ambattur Mobiles. All Rights Reserved.

                </div>

            </Container>

        </Box>

    );

}

export default Footer;