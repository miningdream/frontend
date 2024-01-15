import { getUser } from "../../api";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Box,
    Container,
    Flex,
    Heading,
    IconButton,
    Text
} from "@chakra-ui/react";

import Navbar from "../../partials/navbar";
import banner_dark from "../../images/banner_dark.jpg";
import questions from "./questions.json";

function Question({ question, answer }) {
    let [isOpen, onCloseOpen] = useState(false);
    return (
        <Box
            p={5}
            mt={5}
            border="solid #808080 0.2px"
            borderRadius="15px"
        >
            <Flex justify="space-between" align="center">
                <Heading fontSize="24px">{question}</Heading>
                <IconButton
                    variant="ghost"
                    fontSize="20px"
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={() => onCloseOpen(!isOpen)}
                />
            </Flex>
            {isOpen ? <Text>{answer}</Text> : ""}
        </Box>
    )
}

function Faq() {

    let [user, setUser] = useState(null);
    let [language, setLanguage] = useState("en");

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
                <meta property="og:title" content="FAQ │ Smart Miners" />
                <meta property="og:url" content="/faq" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="FAQ │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>FAQ │ Smart Miners</title>
            </Helmet>
            <Navbar user={user} lang={language} />
            <Box
                bgColor="#0F0F0F"
                color="white"
                p="4.5rem"
            >
                <Heading as="h1" fontSize="64px" textAlign="center">
                    FAQ
                </Heading>
            </Box>
            <Container maxW="container.xl" my={20}>
                {questions.map(value => <Question {...value} />)}
            </Container>
        </>
    )
}

export default Faq;