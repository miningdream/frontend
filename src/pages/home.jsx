import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getUser, getNews } from "../api";
import { useEffect, useState, useRef } from "react";
import { Whatsapp, Discord } from "react-bootstrap-icons";
import { Helmet } from "react-helmet-async";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    IconButton,
    Img,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

import Navbar from "../partials/navbar";
import Footer from "../partials/footer"
import Slider from "react-slick";

import banner_dark from "../images/banner_dark.jpg";
import home_background from "../images/home_background.png";
import person from "../images/person.png";

const Container = styled.div`
background: url(${home_background});
background-position: center;
background-size: cover;
bacground-repeat: no-repeat;
width: 100%;
height: 91vh;
`;

const HeaderContainer = styled.div`
width: 100%;
height: 80%;
display: flex;
justify-content: center;
align-items: center;
`;

const HeadingGroup = styled.header`
width: 90%;
`;

function Home() {

    let headingRef = useRef(null);
    let { isOpen, onClose, onOpen } = useDisclosure();
    let [user, setUser] = useState(null);
    let [news, setNews] = useState([]);
    let [index, setIndex] = useState(0);
    let [language, setLanguage] = useState("en");

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
    
    const initializeAnimated = async() => {
        try {
            await gsap.fromTo(
                headingRef.current,
                {
                    x: -100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    useGSAP(() => {
        initializeAnimated();
    }, { scope: headingRef })

    useEffect(() => {
        initialize();
    }, []);

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Home │ Smart Miners" />
                <meta property="og:url" content="/" />
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
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="lg">
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader fontWeight="bolder" textAlign="center" fontSize="30px">
                        Join Our Community
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text size="20px" align="center">Explore new journey to be a great miners</Text>
                    </ModalBody>

                    <ModalFooter alignItems="center" justifyContent="center">
                        <IconButton
                            variant="outline"
                            colorScheme="teal"
                            icon={<Icon as={Whatsapp} />}
                            fontSize="30px"
                            mr={1.5}
                            p="25px"
                            w="60px"
                            h="60px"
                        />
                        <IconButton
                            variant="outline"
                            colorScheme="blue"
                            icon={<Icon as={Discord} />}
                            fontSize="30px"
                            ml={1.5}
                            p="25px"
                            w="60px"
                            h="60px"
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Navbar user={user} lang={language} />
            <Container>
                <HeaderContainer>
                    <HeadingGroup>
                        <Heading color="white" fontSize={["2rem", "3rem", "4rem", "5rem"]} ref={headingRef}>
                            <Text>
                                {
                                    language === "en"
                                    ? "Learn More"
                                    : language === "id"
                                    ? "Belajar Lebih"
                                    : "Learn More"
                                }
                            </Text>
                            <Text>
                                {
                                    language === "en"
                                    ? "Mines More"
                                    : language === "id"
                                    ? "Tambang Lebih"
                                    : "Mines More"
                                }
                            </Text>
                        </Heading>
                    </HeadingGroup>
                </HeaderContainer>
                <ButtonGroup
                    w="100%"
                    justifyContent="center"
                >
                    <Button
                        colorScheme="orange"
                        fontStyle="italic"
                        height="66.13px"
                        width="244.11px"
                        fontSize="24.49px"
                        onClick={onOpen}
                    >
                        {
                            language === "en"
                            ? "Join Now"
                            : language === "id"
                            ? "Bergabung"
                            : "Join Now"
                        }
                    </Button>
                </ButtonGroup>
            </Container>
            <Flex justify="center" align="center" mt="130px" mb="130px">
                <Box w={["100%", "100%", "80%", "80%"]}>
                    <Stack direction="row" align="flex-end">
                        <Heading
                            as="h3"
                            fontWeight="bold"
                            fontSize="48px" 
                            color="black"
                            m="0"
                        >
                            {
                            language === "en"
                            ? "NEWS"
                            : language === "id"
                            ? "BERITA"
                            : "NEWS"
                        }
                        </Heading>
                        <Heading
                            as="h5"
                            fontSize="15px" 
                            color="#FF6F41"
                            m="0"
                            cursor="pointer"
                            onClick={() => window.open(news[index].url, "_blank")}
                        >
                            {language === "en" ? "Read More" : language === "id" ? "Baca Selengkapnya" : "Read More"} {">"}{">"}
                        </Heading>
                    </Stack>
                    <Slider {...settings} afterChange={setIndex}>
                        {
                            news.map((value, indexNews) =>
                                <Box
                                    key={indexNews}
                                    h="700px"
                                    w="100%"
                                    borderRadius="10px"
                                    bg={`url(${value.urlToImage})`}
                                    bgPos="center"
                                    bgRepeat="no-repeat"
                                    bgSize="cover"
                                >
                                    <Flex align="flex-end" justify="center" h="100%" w="100%">
                                        <Box
                                            color="white"
                                            bgColor="rgba(0, 0, 0, 0.5)"
                                            w="100%"
                                            p="10px"
                                            cursor="pointer"
                                            transition="all 0.2s"
                                            _hover={{ bgColor: "rgba(0, 0, 0, 0.7)" }}
                                            _active={{ bgColor: "rgba(0, 0, 0, 0.9)" }}
                                            onClick={() => window.open(value.url, "_blank")}
                                        >
                                            <Heading
                                                as="h5"
                                            >
                                                {value.title.length > 60 ? `${value.title.substring(0, 57)}...` : value.title}
                                            </Heading>
                                            <Text>
                                                {value.description.length > 150 ? `${value.description.substring(0, 147)}...` : value.description}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            )
                        }
                    </Slider>
                </Box>
            </Flex>
            <Flex justify="center" align="center" mt="65px" mb="130px">
                <Box w={["100%", "100%", "80%", "80%"]}>
                    <Flex align="center" justify="space-between">
                        <Box w="35%" display={["none", "none", "none", "flex"]}>
                            <Img
                                h="523px"
                                w="auto"
                                src={person}
                            />
                        </Box>
                        <Box w={["100%", "100%", "100%", "65%"]}>
                            <Heading as="h2" fontSize={["36px", "56px", "76px", "96px"]} color="#FF3E00">
                                {
                                    language === "en"
                                    ? "Need a Consultor?"
                                    : language === "id"
                                    ? "Butuh Konsultan?"
                                    : "Need a Consultor?"
                                }
                            </Heading>
                            <Text color="#616161">
                                {
                                    language === "en"
                                    ? "Explore your interests and talents with an expert to maximize your potential!"
                                    : language === "id"
                                    ? "Jelajahi minat dan bakat Anda bersama ahlinya untuk memaksimalkan potensi Anda!"
                                    : "Explore your interests and talents with an expert to maximize your potential!"
                                }
                            </Text>
                            <ButtonGroup mt="50px">
                                <Box
                                    as="button"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="10px"
                                    fontSize={["12px", "16px", "18px", "24px"]}
                                    fontWeight="bold"
                                    bgColor="black"
                                    color="white"
                                    cursor="pointer"
                                    w={["100px", "150px", "180px", "200px"]}
                                    h={["40px", "49px", "50px", "58px"]}
                                    transition="all 0.2s"
                                    _hover={{ color: "#c9c4c4" }}
                                    _active={{ color: "#afaaaa" }}
                                >
                                    <Text>
                                        {
                                            language === "en"
                                            ? "Consult Now"
                                            : language === "id"
                                            ? "Konsultasi"
                                            : "Consult Now"
                                        }
                                    </Text>
                                </Box>
                            </ButtonGroup>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Footer language={language} />
        </>
    );
}

export default Home;