import { useState } from "react";
import { authenticationLogOutUser } from "../api";
import {
    Button,
    ButtonGroup,
    Flex,
    Img,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { PersonCircle } from "react-bootstrap-icons";
import nav_icon from "../images/nav_icon.png";

function Navbar({ user, lang }) {
    let [display, changeDisplay] = useState("none");

    const handleTarget = (target) => window.location.href = `/${target}`;
    const handleLogOut = async() => {
        try {
            await authenticationLogOutUser();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Flex
            as="nav"
            aria-label="navbar"
            boxShadow="2xl"
        >
            {/* Desktop Navbar */}
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                padding="5px"
                backgroundColor="white"
                display={["none", "none", "flex", "flex"]}
            >
                <Flex
                    alignItems="center"
                    margin="0 10px"
                >
                    <Img
                        height="30px"
                        width="auto"
                        cursor="pointer"
                        src={nav_icon}
                        alt='smart_miners_banner_light'
                        onClick={() => handleTarget("")}
                    />
                    <ButtonGroup
                        margin="0 30px"
                    >
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label={
                                lang === "en"
                                ? "courses"
                                : lang === "id"
                                ? "kursus"
                                : "courses"
                            }
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("courses")}
                        >
                            {
                                lang === "en"
                                ? "Courses"
                                : lang === "id"
                                ? "Kursus"
                                : "Courses"
                            }
                        </Button>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label={
                                lang === "en"
                                ? "news"
                                : lang === "id"
                                ? "berita"
                                : "news"
                            }
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("news")}
                        >
                            {
                                lang === "en"
                                ? "News"
                                : lang === "id"
                                ? "Berita"
                                : "News"
                            }
                        </Button>
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="faq"
                            my={5}
                            w="100%"
                            cursor="pointer"
                            onClick={() => handleTarget("faq")}
                        >
                            FAQ
                        </Button>
                    </ButtonGroup>
                </Flex>
                <ButtonGroup alignItems="center" mr="10px">
                    {
                        user
                        ? (
                            <Menu>
                                <MenuButton as={Button}>
                                    <Icon as={PersonCircle} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleTarget("profile")}>
                                        {
                                            lang === "en"
                                            ? "Settings"
                                            : lang === "id"
                                            ? "Pengaturan"
                                            : "Settings"
                                        }
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut}>
                                        {
                                            lang === "en"
                                            ? "Log Out"
                                            : lang === "id"
                                            ? "Keluar"
                                            : "Log Out"
                                        }
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )
                        : (
                            <>
                                <Button
                                    variant="ghost"
                                    aria-label={
                                        lang === "en"
                                        ? "login"
                                        : lang === "id"
                                        ? "masuk"
                                        : "login"
                                    }
                                    my={5}
                                    w="100%"
                                    cursor="pointer"
                                    onClick={() => window.location.href = "/login"}
                                >
                                    {
                                        lang === "en"
                                        ? "Log In"
                                        : lang === "id"
                                        ? "Masuk"
                                        : "Log In"
                                    }
                                </Button>
                                <Button
                                    aria-label="Sign Up"
                                    my={5}
                                    w="100%"
                                    cursor="pointer"
                                    colorScheme="orange"
                                    onClick={() => window.location.href = "/register"}
                                >
                                    {
                                        lang === "en"
                                        ? "Sign Up"
                                        : lang === "id"
                                        ? "Daftar"
                                        : "Sign Up"
                                    }
                                </Button>
                            </>
                        )
                    }
                </ButtonGroup>
            </Flex>
            
            {/* Mobile Navbar */}
            <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                padding="21px"
                backgroundColor="white"
                display={["flex", "flex", "none", "none"]}
                boxShadow="2xl"
            >
                <Img
                    height="30px"
                    width="auto"
                    cursor="pointer"
                    src={nav_icon}
                    alt='smart_miners_banner_light'
                    onClick={() => handleTarget("")}
                />
                <Flex
                    alignItems="center"
                >
                    <IconButton
                        aria-label="Open Menu"
                        size="lg"
                        mr={2}
                        icon={
                            <HamburgerIcon />
                        }
                        onClick={() => changeDisplay('flex')}
                        display={['flex', 'flex', 'none', 'none']}
                    />
                </Flex>
            </Flex>

            <Flex
                w='100vw'
                display={display}
                bgColor="gray.50"
                zIndex={20}
                h="100vh"
                pos="fixed"
                top="0"
                left="0"
                overflowY="auto"
                flexDir="column"
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={2}
                        mr={2}
                        aria-label="Open Menu"
                        size="lg"
                        icon={
                            <CloseIcon />
                        }
                        onClick={() => changeDisplay('none')}
                    />
                </Flex>

                <Flex
                    flexDir="column"
                    align="center"
                >
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label={
                            lang === "en"
                            ? "courses"
                            : lang === "id"
                            ? "kursus"
                            : "courses"
                        }
                        my={5}
                        w="100%"
                        cursor="pointer"
                        onClick={() => handleTarget("courses")}
                    >
                        {
                            lang === "en"
                            ? "Courses"
                            : lang === "id"
                            ? "Kursus"
                            : "Courses"
                        }
                    </Button>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label={
                            lang === "en"
                            ? "news"
                            : lang === "id"
                            ? "berita"
                            : "news"
                        }
                        my={5}
                        w="100%"
                        cursor="pointer"
                        onClick={() => handleTarget("news")}
                    >
                        {
                            lang === "en"
                            ? "News"
                            : lang === "id"
                            ? "Berita"
                            : "News"
                        }
                    </Button>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="faq"
                        my={5}
                        w="100%"
                        cursor="pointer"
                        onClick={() => handleTarget("faq")}
                    >
                        FAQ
                    </Button>
                </Flex>
                <ButtonGroup
                    w="100%"
                    margin="0 10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {
                        user
                        ? (
                            <Menu>
                                <MenuButton as={Button}>
                                    <Icon as={PersonCircle} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleTarget("profile")}>
                                        {
                                            lang === "en"
                                            ? "Settings"
                                            : lang === "id"
                                            ? "Pengaturan"
                                            : "Settings"
                                        }
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut}>
                                        {
                                            lang === "en"
                                            ? "Log Out"
                                            : lang === "id"
                                            ? "Keluar"
                                            : "Log Out"
                                        }
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )
                        : (
                            <>
                                <Button
                                    variant="ghost"
                                    aria-label="Login"
                                    my={5}
                                    w="100%"
                                    cursor="pointer"
                                    onClick={() => window.location.href = "/login"}
                                >
                                    {
                                        lang === "en"
                                        ? "Log In"
                                        : lang === "id"
                                        ? "Masuk"
                                        : "Log In"
                                    }
                                </Button>
                                <Button
                                    aria-label="Sign Up"
                                    my={5}
                                    w="100%"
                                    cursor="pointer"
                                    colorScheme="orange"
                                    onClick={() => window.location.href = "/register"}
                                >
                                    {
                                        lang === "en"
                                        ? "Sign Up"
                                        : lang === "id"
                                        ? "Daftar"
                                        : "Sign Up"
                                    }
                                </Button>
                            </>
                        )
                    }
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}

export default Navbar;