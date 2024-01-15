import styled from "styled-components";
import { getUser, authenticationGetPassword, authenticationChangePassword, sendEmail } from "../api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Center,
    Container as CardContainer,
    FormControl,
    Heading,
    Img,
    Input,
    Spinner,
    Text,
} from "@chakra-ui/react";

import Navbar from "../partials/navbar";
import Footer from "../partials/footer";

import banner_dark from "../images/banner_dark.jpg";
import check_mark from "../images/check_mark_password.png";

const Container = styled.div`
display: flex;
justify-content: center;
background-color: #FE7144;
align-items: center;
width: 100%;
height: 91vh;
`;

function ChangePassword() {
    let [search] = useSearchParams();
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

    const handleSubmit = async() => {
        if(!password.length || !confirmPassword.length) {
            setError({ type: 0, message: "Don't leave Password or Confirm Password form blank!" });
            setTimeout(() => setError(null), 2500);
            return;
        }
        if(password !== confirmPassword) {
            setError({ type: 0, message: "Confirm Password must same as Password!" });
            setTimeout(() => setError(null), 2500);
            return;
        }

        setLoading(true);
        try {
            let key = search.get("key");
            let id = search.get("id");
            await authenticationChangePassword(key, id, password);
        } catch (error) {
            console.log(error);
            setError({ type: 1, message: "There's something wrong with the system! Please try again!" });
            setLoading(false);
            setTimeout(() => setError(null), 2500);
            return;
        }
        window.location.href = "/login";
        
    }

    return (
        <Card p="50px">
            <CardHeader>
                <Heading fontWeight="bold" textAlign="center" fontSize="40px">
                    Change Password
                </Heading>
            </CardHeader>
            <CardBody>
                <CardContainer maxW="sm">
                    <Box>
                        <FormControl>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="flushed"
                                placeholder="New Password"
                                borderColor="#494949"
                                isRequired={true}
                            />
                        </FormControl>
                        <FormControl mt="20px">
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="flushed"
                                placeholder="Confirm Password"
                                borderColor="#494949"
                                isRequired={true}
                            />
                        </FormControl>
                        {
                            error
                            ? (
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>{error.message}</AlertTitle>
                                </Alert>
                            )
                            : ""
                        }
                    </Box>
                </CardContainer>
            </CardBody>
            <CardFooter>
                <CardContainer maxW="sm">
                    <ButtonGroup>
                        <Box
                            as="button"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="10px"
                            fontSize={["12px", "14px", "16px", "18px"]}
                            fontWeight="bold"
                            bgColor="black"
                            color="white"
                            cursor={loading ? "default" : "pointer"}
                            opacity={loading ? 0.5 : 1}
                            w={["60px", "75px", "90px", "110px"]}
                            h={["26px", "33px", "40px", "48px"]}
                            transition="all 0.2s"
                            _hover={loading ? null : { color: "#c9c4c4" }}
                            _active={loading ? null : { color: "#afaaaa" }}
                            onClick={handleSubmit}
                        >
                            <Text>
                                {loading ? <Spinner /> : "Submit"}
                            </Text>
                        </Box>
                    </ButtonGroup>
                </CardContainer>
            </CardFooter>
        </Card>
    );
}

function SendEmail() {
    let [email, setEmail] = useState("");
    let [success, setSuccess] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

    const handleSubmit = async() => {
        if(loading) return;
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        if(!email.length || !validateEmail(email)) {
            setError({ type: 0, message: "Please fill this input with valid email!" });
            setTimeout(() => setError(null), 2500);
            return;
        }

        setLoading(true);
        try {
            await sendEmail(email);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError({ type: 1, message: "There's something wrong with the system! Please try again!" });
            setTimeout(() => setError(null), 2500);
        }
        setLoading(false);
    }

    return (
        <Card p="30px">
            <CardHeader>
                <Heading fontWeight="bold" textAlign="center" fontSize="40px">
                    {
                        success
                        ? (
                            <Center>
                                <Img
                                    h="100px"
                                    w="auto"
                                    src={check_mark}
                                    alt="check-mark"
                                />
                            </Center>
                        )
                        : "Forget Password"
                    }
                </Heading>
            </CardHeader>
            <CardBody>
                {
                    success
                    ? (
                        <CardContainer maxW="sm">
                            <Text>Successfully send a change password Email!</Text>
                        </CardContainer>
                    )
                    : (
                        <CardContainer maxW="sm">
                            <Box>
                                <Text>Enter your email and we’ll send you a link to reset your password</Text>
                            </Box>
                            <Box mt="20px">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="flushed"
                                    placeholder="example@gmail.com"
                                    borderColor="#494949"
                                    isRequired={true}
                                />
                                {
                                    error
                                    ? (
                                        <Alert status='error'>
                                            <AlertIcon />
                                            <AlertTitle>{error.message}</AlertTitle>
                                        </Alert>
                                    )
                                    : ""
                                }
                            </Box>
                        </CardContainer>
                    )
                }
            </CardBody>
            {
                !success
                ? (
                    <CardFooter>
                        <CardContainer maxW="sm">
                            <ButtonGroup>
                                <Box
                                    as="button"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderRadius="10px"
                                    fontSize={["12px", "14px", "16px", "18px"]}
                                    fontWeight="bold"
                                    bgColor="black"
                                    color="white"
                                    cursor={loading ? "default" : "pointer"}
                                    opacity={loading ? 0.5 : 1}
                                    w={["60px", "75px", "90px", "110px"]}
                                    h={["26px", "33px", "40px", "48px"]}
                                    transition="all 0.2s"
                                    _hover={loading ? null : { color: "#c9c4c4" }}
                                    _active={loading ? null : { color: "#afaaaa" }}
                                    onClick={handleSubmit}
                                >
                                    <Text>
                                        {loading ? <Spinner /> : "Submit"}
                                    </Text>
                                </Box>
                            </ButtonGroup>
                        </CardContainer>
                    </CardFooter>
                )
                : ""
            }
        </Card>
    );
}

function ForgetPassword() {
    let [search] = useSearchParams();
    let [type, setType] = useState(null);
    let [language, setLanguage] = useState("en");

    useEffect(() => {
        const initialize = async() => {
            let lang = sessionStorage.getItem("language");
            if(lang) setLanguage(lang);

            let data = null;
            try {
                data = await getUser();
            } catch (error) {
                console.log(error);
            }
            if(data && data.user) {
                let r = search.get("r");
                if(r) window.location.href = r;
                else window.location.href = "/profile";
            }
            else {
                let key = search.get("key");
                let id = search.get("id");

                let status = 404;
                if(key && id) {
                    try {
                        status = await authenticationGetPassword(key, id);
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(status);

                if(status === 204) setType("password");
                else if(status) setType("email");
            }
        }
        initialize();
    }, [search]);

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Log In │ Smart Miners" />
                <meta property="og:url" content="/login" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Log In │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Forget Password │ Log In │ Smart Miners</title>
            </Helmet>
            <Navbar lang={language} />
            <Container>
                {
                    type
                    ? (
                        type === "password"
                        ? <ChangePassword />
                        : <SendEmail />
                    )
                    : ""
                }
            </Container>
            <Footer language={language} />
        </>
    );
}

export default ForgetPassword;