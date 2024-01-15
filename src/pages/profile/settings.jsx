import styled from "styled-components";
import { Component } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getUser, authenticationDeleteUser, setUserNotification } from "../../api";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Container,
    FormControl,
    Heading,
    Icon,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Stack,
    Text
} from "@chakra-ui/react";

import Select from "react-select";

const Bold = styled.span`
font-weight: bold;
font-style: italic;
`;

const options = [
    {
        label: "English",
        value: "en"
    },
    {
        label: "Indonesia",
        value: "id"
    }
]

class Settings extends Component {
    constructor({ onChangeLanguage }) {
        super();
        this.onChangeLanguage = onChangeLanguage;
        this.state = {
            user: null,
            isOpen: false,
            language: {
                label: "English",
                value: "en"
            },
            password: "",
            loading: false,
            error: null,
            promotional_email: false,
            news: false,
            consultation_update: false
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
            let lang = null;
            let language = sessionStorage.getItem("language");
            if(language) {
                let index = options.map(i => i.value).indexOf(language);
                lang = options[index];
            }
            this.setState({
                user: (response && response.user) || null,
                language: lang || { label: "English", value: "en" },
                promotional_email: (response && response.user && response.user.notification.promotional_email) || false,
                news: (response && response.user && response.user.notification.news) || false,
                consultation_update: (response && response.user && response.user.notification.consultation_update) || false
            });
        }
        initialize();
    }

    onOpen = () => {
        if(this.state.loading) return;
        this.setState({ isOpen: true });
    }

    onClose = () => {
        if(this.state.loading) return;
        this.setState({ isOpen: false, password: "" });
    }

    handleNotification = async(label, check) => {
        try {
            let body = {
                promotional_email: this.state.promotional_email,
                news: this.state.news,
                consultation_update: this.state.consultation_update
            };
            body[label] = check;
            await setUserNotification(body);
            this.setState({ [label]: check });
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteAccount = async() => {
        if(!this.state.user) return;
        if(this.state.password !== this.state.user.password) {
            this.setState({
                error: {
                    type: 0,
                    message: this.state.language.value === "en" ? "Please insert a valid password!" : this.state.language.value === "id" ? "Silakan masukkan kata sandi yang valid!" : "Please insert a valid password!"
                }
            });
            setTimeout(() => this.setState({ error: null }), 2500);
            return;
        }

        this.setState({ loading: true });
        try {
            await authenticationDeleteUser();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
            this.setState({
                error: {
                    type: 1,
                    message: this.state.language.value === "en" ? "There's something wrong! Please try again later" : this.state.language.value === "id" ? "Ada yang salah! Silakan coba lagi nanti" : "There's something wrong! Please try again later"
                },
                loading: false
            });
            setTimeout(() => this.setState({ error: null }), 2500);
        }
    }

    render() {
        return (
            <Container maxW="container.xl">
                <Modal isOpen={this.state.isOpen} onClose={this.onClose} isCentered={true} size="xl">
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent>
                        <ModalHeader
                            textAlign="center"
                            fontSize={["24px", "27px", "30px", "36px"]}
                            fontWeight="bold"
                        >
                            {
                                this.state.language.value === "en"
                                ? "Delete Your Account"
                                : this.state.language.value === "id"
                                ? "Hapus Akun Anda"
                                : "Delete Your Account"
                            }
                        </ModalHeader>

                        <ModalBody>
                            <Text fontSize="15px">
                                {
                                    this.state.language.value === "en"
                                    ? "If you’re sure to delete your account permanently, insert your password"
                                    : this.state.language.value === "id"
                                    ? "Jika Anda yakin untuk menghapus akun Anda secara permanen, masukkan kata sandi Anda"
                                    : "If you’re sure to delete your account permanently, insert your password"
                                }
                            </Text>
                            <Input
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                            {
                                this.state.error
                                ? (
                                    <Alert status='error' mt="10px">
                                        <AlertIcon />
                                        <AlertTitle>{this.state.error.message}</AlertTitle>
                                    </Alert>
                                )
                                : ""
                            }
                        </ModalBody>

                        <ModalFooter>
                            <ButtonGroup>
                                <Button
                                    variant="solid"
                                    colorScheme="red"
                                    rightIcon={<DeleteIcon />}
                                    borderRadius="0"
                                    onClick={this.handleDeleteAccount}
                                    isLoading={this.state.loading}
                                >
                                    {
                                        this.state.language.value === "en"
                                        ? "Delete Account"
                                        : this.state.language.value === "id"
                                        ? "Hapus Akun"
                                        : "Delete Account"
                                    }
                                </Button>
                                <Box
                                    as="button"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="18px"
                                    fontWeight="bold"
                                    bgColor="black"
                                    color="white"
                                    cursor="pointer"
                                    opacity={this.state.loading ? 0.5 : 1}
                                    w="90px"
                                    transition="all 0.2s"
                                    _hover={this.state.loading ? null : { color: "#c9c4c4" }}
                                    _active={this.state.loading ? null : { color: "#afaaaa" }}
                                    onClick={this.onClose}
                                >
                                    {
                                        this.state.language.value === "en"
                                        ? "Back"
                                        : this.state.language.value === "id"
                                        ? "Kembali"
                                        : "Back"
                                    }
                                </Box>
                            </ButtonGroup>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Box
                    mt="100px"
                >
                    <Box>
                        <FormControl>
                            <Heading as="h3" fontSize="24px">
                                {
                                    this.state.language.value === "en"
                                    ? "Notifications"
                                    : this.state.language.value === "id"
                                    ? "Notifikasi"
                                    : "Notifications"
                                }
                            </Heading>
                            <Stack>
                                <Checkbox
                                    isChecked={this.state.promotional_email}
                                    onChange={(e) => this.handleNotification("promotional_email", e.target.checked)}
                                >
                                    {
                                        this.state.language.value === "en"
                                        ? <>Promotional email notifications from <Bold>Smart Miners</Bold></>
                                        : this.state.language.value === "id"
                                        ? <>Notifikasi email promosi dari <Bold>Smart Miners</Bold></>
                                        : <>Promotional email notifications from <Bold>Smart Miners</Bold></>
                                    }
                                </Checkbox>
                                <Checkbox
                                    isChecked={this.state.news}
                                    onChange={(e) => this.handleNotification("news", e.target.checked)}
                                >
                                    {
                                        this.state.language.value === "en"
                                        ? "Mining News from world news"
                                        : this.state.language.value === "id"
                                        ? "Berita Penambangan dari berita dunia"
                                        : "Mining News from world news"
                                    }
                                </Checkbox>
                                <Checkbox
                                    isChecked={this.state.consultation_update}
                                    onChange={(e) => this.handleNotification("consultation_update", e.target.checked)}
                                >
                                    {
                                        this.state.language.value === "en"
                                        ? "Email notification for consultation update"
                                        : this.state.language.value === "id"
                                        ? "Pemberitahuan email tentang konsultasi"
                                        : "Email notification for consultation update"
                                    }
                                </Checkbox>
                            </Stack>
                        </FormControl>
                    </Box>
                    <Box mt="50px">
                        <FormControl w={["100%", "80%", "40%", "20%"]}>
                            <Heading as="h3" fontSize="24px">
                                {
                                    this.state.language.value === "en"
                                    ? "Language"
                                    : this.state.language.value === "id"
                                    ? "Bahasa"
                                    : "Language"
                                }
                            </Heading>
                            <Select
                                onChange={(target) => {
                                    sessionStorage.setItem("language", target.value);
                                    this.onChangeLanguage(target.value);
                                    this.setState({ language: target });
                                }}
                                value={this.state.language}
                                options={options}
                            />
                        </FormControl>
                    </Box>
                    <Box mt="50px">
                        <FormControl>
                            <Heading as="h3" fontSize="24px">
                                {
                                    this.state.language.value === "en"
                                    ? "Account"
                                    : this.state.language.value === "id"
                                    ? "Akun"
                                    : "Account"
                                }
                            </Heading>
                            <Button
                                variant="solid"
                                colorScheme="red"
                                rightIcon={<Icon as={DeleteIcon} />}
                                onClick={this.onOpen}
                                borderRadius="0"
                            >
                                {
                                    this.state.language.value === "en"
                                    ? "Delete Account"
                                    : this.state.language.value === "id"
                                    ? "Hapus Akun"
                                    : "Delete Account"
                                }
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default Settings;