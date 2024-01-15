import styled from "styled-components";
import { getUser, getNews } from "../api";
import { useEffect, useState } from "react";
import {
    Heading,
    Box,
    WrapItem,
    Wrap,
    Card,
    CardBody,
    CardHeader,
    Container as CardContainer,
    Img,
    Text,
    CardFooter
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import Navbar from "../partials/navbar";
import Footer from "../partials/footer"

import banner_dark from "../images/banner_dark.jpg";

const Container = styled.div`
width: 100%;
`;

function News() {

    let [language, setLanguage] = useState("en");
    let [user, setUser] = useState(null);
    let [news, setNews] = useState([]);

    const initialize = async() => {
        let lang = sessionStorage.getItem("language");
        if(lang) setLanguage(lang);

        let response = null;
        let response_news = null;
        try {
            response = await getUser();
            response_news = await getNews();
        } catch (error) {
            console.log(error);
        }
        setNews(response_news ? response_news.articles.filter(value => value.urlToImage).splice(0, 20) : []);
        setUser(response && response.user);
    }
    
    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="News │ Smart Miners" />
                <meta property="og:url" content="/news" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="News │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Home │ Smart Miners</title>
            </Helmet>
            <Navbar user={user} lang={language} />
            <Box
                bgColor="#0F0F0F"
                color="white"
                p="4.5rem"
            >
                <Heading as="h1" fontSize="64px" textAlign="center">
                    {
                        language === "en"
                        ? "World Mining News"
                        : language === "id"
                        ? "Berita Pertambangan Dunia"
                        : "World Mining News"
                    }
                </Heading>
            </Box>
            <Container>
                <Box my={20}>
                    <CardContainer maxW="container.xl" mt={10}>
                        <Wrap spacing={10} justify="center">
                            {
                                news.map(value => {
                                    let date = new Date(value.publishedAt);
                                    let months = {
                                        0: language === "en" ? "January" : language === "id" ? "Januari" : "January",
                                        1: language === "en" ? "February" : language === "id" ? "Februari" : "February",
                                        2: language === "en" ? "March" : language === "id" ? "Maret" : "March",
                                        3: "April",
                                        4: language === "en" ? "May" : language === "id" ? "Mei" : "May",
                                        5: language === "en" ? "June" : language === "id" ? "Juni" : "June",
                                        6: language === "en" ? "July" : language === "id" ? "Juli" : "July",
                                        7: language === "en" ? "August" : language === "id" ? "Agustus" : "August",
                                        8: "September",
                                        9: language === "en" ? "October" : language === "id" ? "Oktober" : "October",
                                        10: "November",
                                        11: language === "en" ? "December" : language === "id" ? "Desember" : "December"
                                    }
                                    return (
                                        <WrapItem>
                                            <Card maxW="387px" h="500px">
                                                <Img
                                                    h="168.41px"
                                                    w="387px"
                                                    src={value.urlToImage}
                                                    alt={value.title}
                                                />
                                                <CardHeader>
                                                    <Heading size="md">
                                                        {value.title.length > 53 ? `${value.title.substring(0, 50)}...` : value.title}
                                                    </Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>
                                                        {value.description.length > 100 ? `${value.description.substring(0, 97)}...` : value.description}
                                                    </Text>
                                                </CardBody>
                                                <CardFooter>
                                                    <Text color="#969696">{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>
                                                </CardFooter>
                                                <Box
                                                    bgColor="#717171"
                                                    p="20px"
                                                    color="white"
                                                    cursor="pointer"
                                                    transition="all 0.2s"
                                                    _hover={{ bgColor: "#616161" }}
                                                    _active={{ bgColor: "#505050" }}
                                                    onClick={() => window.open(value.url, "_blank")}
                                                >
                                                    {
                                                        language === "en"
                                                        ? "Read More"
                                                        : language === "id"
                                                        ? "Baca Selengkapnya"
                                                        : "Read More"
                                                    }
                                                </Box>
                                            </Card>
                                        </WrapItem>
                                    );
                                })
                            }
                        </Wrap>
                    </CardContainer>
                </Box>
            </Container>
            {
                news.length
                ? <Footer language={language} />
                : ""
            }
        </>
    );
}

export default News;