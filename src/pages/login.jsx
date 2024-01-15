import styled from "styled-components";
import Navbar from "../partials/navbar";
import Footer from "../partials/footer"

import { getUser, authenticationUser } from "../api";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
    FormControl,
    Input,
    Text,
    Button,
    Heading,
    Wrap,
    WrapItem,
    Link,
    FormHelperText,
    FormErrorMessage,
    Box
} from "@chakra-ui/react";

import banner_dark from "../images/banner_dark.jpg";
import login_register from "../images/login_register_background.png";

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 91vh;
`;

const LeftContainer = styled.div`
display: flex;
background-color: white;
justify-content: center;
align-items: center;
flex-wrap: wrap;
height: 100%;
width: 50%;

@media only screen and (max-width: 670px) {
    display: none;
}
`;

const RightContainer = styled.div`
display: flex;
background-color: white;
justify-content: center;
align-items: center;
flex-wrap: wrap;
height: 100%;
width: 50%;

@media only screen and (max-width: 670px) {
    width: 100%;
}
`;

const FormContainer = styled.div`
margin: 10px 0;
width: 50%;

@media only screen and (max-width: 900px) {
    width: 80%;
}
`;

const Form = styled.form`
margin: 15px 0;
`;

function Login() {
    let [language, setLanguage] = useState("en");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [search] = useSearchParams();

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
        }
        initialize();
    }, [search]);

    const handleSubmit = async() => {
        setLoading(true);
        let response = null;
        try {
            let body = { username, password };
            response = await authenticationUser(body);
        } catch (error) {
            console.log(error);
        }
        if(response) window.location.href = "/";
        else setError(true);
        setLoading(false);
    }
    
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
                <title>Log In │ Smart Miners</title>
            </Helmet>
            <Navbar lang={language} />
            <Container>
                <LeftContainer>
                    <Box
                        h="100%"
                        w="100%"
                        bg={`url(${login_register})`}
                        bgPos="center"
                        bgRepeat="no-repeat"
                        bgColor="#FE7144"
                        bgSize="cover"
                    >

                    </Box>
                </LeftContainer>
                <RightContainer>
                    <FormContainer>
                        <Heading
                            as="h2"
                            color="#FF906D"
                            textAlign="center"
                            fontWeight="bold"
                        >
                            {
                                language === "en"
                                ? "Log In"
                                : language === "id"
                                ? "Masuk"
                                : "Log In"
                            }
                        </Heading>
                        <Form>
                            <FormControl m="30px 0">
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        if(error) setError(false);
                                        setUsername(e.target.value)
                                    }}
                                    variant="flushed"
                                    placeholder={
                                        language === "en"
                                        ? "Username"
                                        : language === "id"
                                        ? "Nama Pengguna"
                                        : "Username"
                                    }
                                    borderColor="#494949"
                                />
                            </FormControl>
                            <FormControl m="30px 0" isInvalid={error}>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        if(error) setError(false);
                                        setPassword(e.target.value);
                                    }}
                                    variant="flushed"
                                    placeholder={
                                        language === "en"
                                        ? "Password"
                                        : language === "id"
                                        ? "Kata Sandi"
                                        : "Password"
                                    }
                                    borderColor="#494949"
                                />
                                <FormErrorMessage>
                                    {
                                        error 
                                        ? (
                                            language === "en"
                                            ? "Wrong username or password!"
                                            : language === "id"
                                            ? "Nama pengguna atau kata sandi salah!"
                                            : "Wrong username or password!"
                                        )
                                        : ""
                                    }
                                </FormErrorMessage>
                                {
                                    !error
                                    ? (
                                        <FormHelperText
                                            color="#E54B19"
                                            cursor="pointer"
                                            m="0"
                                            onClick={() => window.location.href = "/login/forget-password"}
                                        >
                                            {
                                                language === "en"
                                                ? "Forget Password?"
                                                : language === "id"
                                                ? "Lupa Kata Sandi?"
                                                : "Forget Password?"
                                            }
                                        </FormHelperText>
                                    )
                                    : ""
                                }
                            </FormControl>
                        </Form>
                        <Wrap
                            margin="30px 0"
                        >
                            <WrapItem
                                w="100%"
                            >
                                <Button
                                    w="100%"
                                    type="button"
                                    bgColor="#FF9345"
                                    colorScheme="orange"
                                    borderRadius="0"
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                >
                                    <Text>
                                        {
                                            language === "en"
                                            ? "Log In"
                                            : language === "id"
                                            ? "Masuk"
                                            : "Log In"
                                        }
                                    </Text>
                                </Button>
                            </WrapItem>
                            <WrapItem
                                w="100%"
                            >
                                <Text
                                    w="100%"
                                    size="16px"
                                    textAlign="center"
                                >
                                    {
                                        language === "en"
                                        ? "Don't have account yet?"
                                        : language === "id"
                                        ? "Belum punya akun?"
                                        : "Don't have account yet?"
                                    } <Link href="/register" color="#FF9345">
                                        {
                                            language === "en"
                                            ? "Register"
                                            : language === "id"
                                            ? "Daftar"
                                            : "Register"
                                        }
                                    </Link>
                                </Text>
                            </WrapItem>
                        </Wrap>
                    </FormContainer>
                </RightContainer>
            </Container>
            <Footer language={language} />
        </>
    )
}

export default Login;