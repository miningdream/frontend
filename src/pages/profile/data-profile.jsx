import { Component } from "react";
import { sendVerifiedEmail, authenticationEditUser, getUser } from "../../api";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    ButtonGroup,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Img,
    Spinner,
    Text,
    Wrap,
    WrapItem
} from "@chakra-ui/react";

import account_icon from "../../images/account_icon.png";
import config from "../../config.json";

class DataProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            displayName: "",
            email: "",
            password: "",
            verified: null,
            avatar_data: null,
            avatar_url: null,
            loading: null,
            error: null,
            language: "en"
        }
    }

    componentDidMount() {
        const initialize = async() => {
            let response = null;
            try {
                response = await getUser();
            } catch (error) {
                console.log(error);
            }
            if(response && response.user) {
                let { user } = response;
                let language = sessionStorage.getItem("language");
                this.setState({
                    username: user.username,
                    displayName: user.display_name,
                    email: user.email,
                    password: user.password,
                    verified: user.verified,
                    avatar_data: null,
                    avatar_url: user.avatar_url ? config.domain + user.avatar_url : null,
                    language: language || "en"
                });
            }
        }
        initialize();
    }

    handleResendEmail = async() => {
        if((this.state.loading && this.state.loading === 1) || this.state.verified) return;

        this.setState({ loading: 1 });
        let status;
        try {
            status = await sendVerifiedEmail();
        } catch (error) {
            console.log(error);
            status = 500;
        }
        window.alert(
            status === 204
            ? (
                this.state.language === "en"
                ? "Successfully re-send email!"
                : this.state.language === "id"
                ? "Berhasil mengirim ulang email!"
                : "Successfully re-send email!"
            )
            : (
                this.state.language === "en"
                ? "Failed to send Email! Please try again!"
                : this.state.language === "id"
                ? "Gagal mengirim Email! Silakan coba lagi!"
                : "Failed to send Email! Please try again!"
            )
        )
        this.setState({ loading: null });
    }

    handleSave = async() => {
        if(this.state.loading && this.state.loading === 2) return;
        this.setState({ loading: 2 });

        try {
            let data = new FormData();
            data.append("username", this.state.username);
            data.append("display_name", this.state.displayName);
            data.append("email", this.state.email);
            data.append("password", this.state.password);
            data.append("avatar", this.state.avatar_data);
            await authenticationEditUser(data);
        } catch (error) {
            console.log(error);
        }
        this.setState({ loading: null });
    }

    render() {
        return (
            <Container maxW="container.xl">
                {
                    this.state.verified !== null && this.state.verified === false
                    ? (
                        <Alert status='warning' variant="solid">
                            <AlertIcon />
                            <AlertTitle>
                                {
                                    this.state.language === "en"
                                    ? "Please verify your account!"
                                    : this.state.language === "id"
                                    ? "Harap verifikasi akun Anda!"
                                    : "Please verify your account!"
                                }
                            </AlertTitle>
                            <AlertDescription>
                                {
                                    this.state.language === "en"
                                    ? "We've sent you an email verification to your email. Please check it. If the verification email isn't sent yet"
                                    : this.state.language === "id"
                                    ? "Kami telah mengirimkan email verifikasi ke email Anda. Tolong diperiksa. Jika email verifikasi belum terkirim"
                                    : "We've sent you an email verification to your email. Please check it. If the verification email isn't sent yet"
                                }
                            </AlertDescription>
                            <Box
                                as="button"
                                ml="10px"
                                border="solid 0.2px white"
                                borderRadius="5px"
                                transition="all 0.2s"
                                opacity={this.state.loading && this.state.loading === 1 ? 0.6 : 1}
                                _active={{ opacity: 0.6 }}
                                w="80px"
                                h="25px"
                                onClick={this.handleResendEmail}
                            >
                                {
                                    this.state.language === "en"
                                    ? "Resend"
                                    : this.state.language === "id"
                                    ? "Kirim"
                                    : "Resend"
                                }
                            </Box>
                        </Alert>
                    )
                    : ""
                }
                <Box
                    mt="100px"
                >
                    <Center>
                        <Img
                            h={["150px", "180px", "230px", "280px", "334px"]}
                            w={["150px", "180px", "230px", "280px", "334px"]}
                            borderRadius="full"
                            src={this.state.avatar_url || account_icon}
                            alt="account_icon"
                        />
                    </Center>
                    <Flex align="center" justify="center">
                        <FormControl w="max-content">
                            <FormLabel cursor="pointer">
                                {
                                    this.state.language === "en"
                                    ? "Change Avatar"
                                    : this.state.language === "id"
                                    ? "Ubah Avatar"
                                    : "Change Avatar"
                                }
                            </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    let regex = /^(blob?:)?(https?:\/\/)?.+$/gi;
                                    if(this.state.avatar_data && regex.test(this.state.avatar_url)) URL.revokeObjectURL(this.state.avatar_url);
                                    this.setState({ avatar_data: e.target.files[0], avatar_url: URL.createObjectURL(e.target.files[0]) });
                                }}
                                display="none"
                            />
                        </FormControl>
                    </Flex>
                    <Wrap spacing={10}>
                        <WrapItem w={["100%", "100%", "100%", "47%", "47%"]}>
                            <FormControl
                                w="100%"
                            >
                                <FormLabel fontWeight="bold" fontSize="15px">
                                    {
                                        this.state.language === "en"
                                        ? "Username"
                                        : this.state.language === "id"
                                        ? "Nama Pengguna"
                                        : "Username"
                                    }
                                </FormLabel>
                                <Input
                                    type="text"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    borderRadius="0"
                                    border="solid black 0.2px"
                                    placeholder={this.user ? this.user.username : ""}
                                    _hover={{ border: "solid black 0.2px" }}
                                />
                            </FormControl>
                        </WrapItem>
                        <WrapItem w={["100%", "100%", "100%", "47%", "47%"]}>
                            <FormControl
                                w="100%"
                            >
                                <FormLabel fontWeight="bold" fontSize="15px">
                                    {
                                        this.state.language === "en"
                                        ? "Display Name"
                                        : this.state.language === "id"
                                        ? "Nama Tampilan"
                                        : "Display Name"
                                    }
                                </FormLabel>
                                <Input
                                    type="text"
                                    value={this.state.displayName}
                                    onChange={(e) => this.setState({ displayName: e.target.value })}
                                    borderRadius="0"
                                    border="solid black 0.2px"
                                    placeholder={this.user ? this.user.display_name : ""}
                                    _hover={{ border: "solid black 0.2px" }}
                                />
                            </FormControl>
                        </WrapItem>
                        <WrapItem w={["100%", "100%", "100%", "47%", "47%"]}>
                            <FormControl
                                w="100%"
                            >
                                <FormLabel fontWeight="bold" fontSize="15px">
                                    {
                                        this.state.language === "en"
                                        ? "Email"
                                        : this.state.language === "id"
                                        ? "Surel"
                                        : "Email"
                                    }
                                </FormLabel>
                                <Input
                                    type="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    borderRadius="0"
                                    border="solid black 0.2px"
                                    placeholder={this.user ? this.user.email : ""}
                                    _hover={{ border: "solid black 0.2px" }}
                                />
                            </FormControl>
                        </WrapItem>
                        <WrapItem w={["100%", "100%", "100%", "47%", "47%"]}>
                            <FormControl
                                w="100%"
                            >
                                <FormLabel fontWeight="bold" fontSize="15px">
                                    {
                                        this.state.language === "en"
                                        ? "Password"
                                        : this.state.language === "id"
                                        ? "Kata Sandi"
                                        : "Password"
                                    }
                                </FormLabel>
                                <Input
                                    type="password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    borderRadius="0"
                                    border="solid black 0.2px"
                                    _hover={{ border: "solid black 0.2px" }}
                                />
                            </FormControl>
                        </WrapItem>
                    </Wrap>
                    {
                        this.state.error
                        ? (
                            <Alert status='error' variant="solid">
                                <AlertIcon />
                                <AlertTitle>{this.state.error.message}</AlertTitle>
                            </Alert>
                        )
                        : ""
                    }
                    <ButtonGroup mt="20px">
                        <Box
                            as="button"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize={["12px", "14px", "16px", "18px"]}
                            fontWeight="bold"
                            bgColor="black"
                            color="white"
                            cursor={this.state.loading && this.state.loading === 2 ? "default" : "pointer"}
                            opacity={this.state.loading && this.state.loading === 2 ? 0.5 : 1}
                            w={["60px", "75px", "90px", "110px"]}
                            h={["26px", "33px", "40px", "48px"]}
                            transition="all 0.2s"
                            _hover={this.state.loading && this.state.loading === 2 ? null : { color: "#c9c4c4" }}
                            _active={this.state.loading && this.state.loading === 2 ? null : { color: "#afaaaa" }}
                            onClick={this.handleSave}
                        >
                            <Text>
                                {this.state.loading && this.state.loading === 2
                                ? <Spinner />
                                : (
                                    this.state.language === "en"
                                    ? "Save"
                                    : this.state.language === "id"
                                    ? "Simpan"
                                    : "Save"
                                )}
                            </Text>
                        </Box>
                    </ButtonGroup>
                </Box>
            </Container>
        )
    }
}

export default DataProfile;