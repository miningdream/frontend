import { getUser } from "../api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    Box,
    Flex,
    Heading,
    Img
} from "@chakra-ui/react";

import Navbar from "../partials/navbar";
import Footer from "../partials/footer";
import banner_dark from "../images/banner_dark.jpg";
import background from "../images/404_background.png";

function Unavailable() {

    let [user, setUser] = useState(null);
    let [language, setLanguage] = useState("en");
    let { pathname } = useLocation();

    const initialize = async() => {
        let lang = sessionStorage.getItem("language");
        if(lang) setLanguage(lang);

        let response = null;
        try {
            response = await getUser();
        } catch (error) {
            console.log(error);
        }
        setUser(response && response.user);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Home │ Smart Miners" />
                <meta property="og:url" content={pathname} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Home │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Home │ Smart Miners</title>
            </Helmet>
            <Navbar user={user} lang={language} />
            <Flex
                bgColor="#FF6A3A"
                justify="center"
                align="center"
                w="100%"
                h="91vh"
            >
                <Box>
                    <Img
                        h={["120px", "170px", "200px", "229px"]}
                        w="auto"
                        src={background}
                        alt="404"
                    />
                    <Heading
                        as="h3"
                        color="#7E3A24"
                        textAlign="center"
                        mt={5}
                        letterSpacing={10}
                        fontSize="24px"
                        fontWeight="bold"
                    >
                        Page Not Found
                    </Heading>
                </Box>
            </Flex>
            <Footer language={language} />
        </>
    )
}

export default Unavailable;