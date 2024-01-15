import styled from "styled-components";
import Navbar from "../partials/navbar";
import Footer from "../partials/footer"

import { getUser, authenticationCreateUser } from "../api";
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
    Flex,
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

function FormInputDisplayName({ value, placeholder, onChange, errorMessage }) {
    return (
        <FormControl>
            <Input
                type="text"
                value={value}
                onChange={(e) => {
                    if(onChange && typeof onChange === "function") onChange(e)
                }}
                variant="flushed"
                placeholder={placeholder}
                borderColor="#494949"
                w="90%"
            />
        </FormControl>
    );
}

function FormInput({ label, type, value, placeholder, onChange, error }) {
    return (
        <FormControl m="30px 0" isInvalid={error && error.type === label ? true : false}>
            <Input
                type={type || "text"}
                value={value}
                onChange={(e) => {
                    if(onChange && typeof onChange === "function") onChange(e)
                }}
                variant="flushed"
                placeholder={placeholder}
                borderColor="#494949"
            />
            <FormErrorMessage fontSize="12px" m="0">
                {(error && error.message) || ""}
            </FormErrorMessage>
        </FormControl>
    );
}

function Register() {
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let [language, setLanguage] = useState("en");

    let [firstname, setFirstname] = useState("");
    let [lastname, setLastName] = useState("")
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPwd, setConfirmPwd] = useState("");

    const initialize = async() => {
        let lang = sessionStorage.getItem("language");
        if(lang) setLanguage(lang);

        let user = null;
        try {
            user = await getUser();
        } catch (error) {
            console.log(error);
        }
        if(user && user.data) window.location.href = "/profile";
    }
    
    const handleSubmit = async() => {
        setLoading(true);
        try {
            let isError = false;
            if(!firstname.length && !lastname.length) {
                setError({ type: "first-second-name", message: "At least one of these must be fill!" });
                isError = true;
            }
            if(!isError && !username.length) {
                setError({ type: "username", message: "You can't leave Username blank!" });
                isError = true;
            }
            if(!isError && !email.length) {
                setError({ type: "email", message: "You can't leave Email blank!" });
                isError = true;
            }
            if(!isError && !password.length) {
                setError({ type: "password", message: "You can't leave Password blank!" });
                isError = true;
            }
            if((!isError && !confirmPwd.length) || confirmPwd !== password) {
                setError({ type: "confirm-password", message: "Confirm Password must same as Password!" });
                isError = true;
            }
            
            if(!isError) {
                let body = {
                    username: username,
                    display_name: `${firstname}${lastname.length ? ` ${lastname}` : ''}`,
                    email: email,
                    password: password
                }
                await authenticationCreateUser(body);
                window.location.href = "/profile";
            }
        } catch (error) {
            let [type] = error.response.data.message.split(" ");
            setError({ type: type.toLowerCase(), message: error.response.data.message });
        }
        setLoading(false);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Sign Up │ Smart Miners" />
                <meta property="og:url" content="/register" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Sign Up │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Sign Up │ Smart Miners</title>
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
                            Sign Up
                        </Heading>
                        <Form>
                            <Box m="30px 0">
                                <Flex justify="space-between">
                                    <FormInputDisplayName
                                        value={firstname}
                                        onChange={(e) => {
                                            if(error && error.type === "first-last-name") setError(null);
                                            setFirstname(e.target.value);
                                        }}
                                        placeholder="First Name"
                                    />
                                    <FormInputDisplayName
                                        value={lastname}
                                        onChange={(e) => {
                                            if(error && error.type === "first-last-name") setError(null);
                                            setLastName(e.target.value);
                                        }}
                                        placeholder="Last Name"
                                    />
                                </Flex>
                                {
                                    error && error.type === "first-last-name"
                                    ? (
                                        <Text m="0" fontSize="12px" color="#E53E3E">{error.message}</Text>
                                    )
                                    : ""
                                }
                            </Box>
                            <FormInput
                                label="username"
                                value={username}
                                onChange={(e) => {
                                    if(error && error.type === "username") setError(null);
                                    setUsername(e.target.value);
                                }}
                                placeholder="Username"
                                error={error}
                            />
                            <FormInput
                                label="email"
                                value={email}
                                type="email"
                                onChange={(e) => {
                                    if(error && error.type === "email") setError(null);
                                    setEmail(e.target.value);
                                }}
                                placeholder="example@gmail.com"
                                error={error}
                            />
                            <FormInput
                                label="password"
                                value={password}
                                onChange={(e) => {
                                    if(error && error.type === "password") setError(null);
                                    setPassword(e.target.value);
                                }}
                                placeholder="Password"
                                type="password"
                                error={error}
                            />
                            <FormInput
                                label="confirm-password"
                                value={confirmPwd}
                                onChange={(e) => {
                                    if(error && error.type === "confirm-password") setError(null);
                                    setConfirmPwd(e.target.value);
                                }}
                                placeholder="Confirm Password"
                                type="password"
                                error={error}
                            />
                        </Form>
                        <Wrap
                            margin="30px 0"
                        >
                            <WrapItem
                                w="100%"
                            >
                                <Button
                                    w="100%"
                                    type="submit"
                                    bgColor="#FF9345"
                                    colorScheme="orange"
                                    borderRadius="0"
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                >
                                    <Text>Sign Up</Text>
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
                                    Already have an account? <Link href="/login" color="#FF9345">Log In</Link>
                                </Text>
                            </WrapItem>
                        </Wrap>
                    </FormContainer>
                </RightContainer>
            </Container>
            <Footer language={language} />
        </>
    );
}

export default Register;