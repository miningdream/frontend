import { getUser } from "../api";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Icon } from "@chakra-ui/react";
import { PersonFill, GearFill, PersonVideo3 } from "react-bootstrap-icons";

import Navbar from "../partials/navbar";
import DataProfile from "./profile/data-profile";
import Settings from "./profile/settings";

import config from "../config.json";
import banner_dark from "../images/banner_dark.jpg";

function SideBar({ value, onChange, language }) {
    const handleNavigation = (target) => {
        if(onChange && typeof onChange === "function") onChange(target);
    }

    return (
        <>
            <Box
                w={[null, null, "15%", "15%"]}
                bgColor="#1C1C1C"
                display={["none", "none", "inline", "inline"]}
                h="91.111vh"
            >
                <Box
                    my="10px"
                    aria-label={
                        language === "en"
                        ? "Profile Data"
                        : language === "id"
                        ? "Data Profil"
                        : "Profile Data"
                    }
                    fontSize={[null, null, "13px", "15px"]}
                    color={value === "data-profile" ? "black" : "white"}
                    bgColor={value === "data-profile" ? "white" : null}
                    transition="all 0.2s"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={value !== "data-profile" ? { bgColor: "white", color: "black" } : null}
                    p="20px"
                    w="100%"
                    onClick={() => handleNavigation("data-profile")}
                >
                    {
                        language === "en"
                        ? "Profile Data"
                        : language === "id"
                        ? "Data Profil"
                        : "Profile Data"
                    }
                </Box>
                <Box
                    my="10px"
                    aria-label={
                        language === "en"
                        ? "Settings"
                        : language === "id"
                        ? "Pengaturan"
                        : "Settings"
                    }
                    fontSize={[null, null, "13px", "15px"]}
                    color={value === "settings" ? "black" : "white"}
                    bgColor={value === "settings" ? "white" : null}
                    transition="all 0.2s"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={value !== "settings" ? { bgColor: "white", color: "black" } : null}
                    p="20px"
                    w="100%"
                    onClick={() => handleNavigation("settings")}
                >
                    {
                        language === "en"
                        ? "Settings"
                        : language === "id"
                        ? "Pengaturan"
                        : "Settings"
                    }
                </Box>
            </Box>
            <Box
                w={["15%", "15%", null, null]}
                bgColor="#1C1C1C"
                display={["inline", "inline", "none", "none"]}
                h="91.111vh"
            >
                <Box
                    my="10px"
                    aria-label={
                        language === "en"
                        ? "Profile Data"
                        : language === "id"
                        ? "Data Profil"
                        : "Profile Data"
                    }
                    fontSize="14.71px"
                    color={value === "data-profile" ? "black" : "white"}
                    bgColor={value === "data-profile" ? "white" : null}
                    transition="all 0.2s"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={value !== "data-profile" ? { bgColor: "white", color: "black" } : null}
                    p="20px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => handleNavigation("data-profile")}
                >
                    <Icon as={PersonFill} />
                </Box>
                <Box
                    my="10px"
                    aria-label={
                        language === "en"
                        ? "My Courses"
                        : language === "id"
                        ? "Kursus Saya"
                        : "My Courses"
                    }
                    fontSize={[null, null, "13px", "15px"]}
                    color={value === "courses" ? "black" : "white"}
                    bgColor={value === "courses" ? "white" : null}
                    transition="all 0.2s"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={value !== "courses" ? { bgColor: "white", color: "black" } : null}
                    p="20px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => handleNavigation("courses")}
                >
                    <Icon as={PersonVideo3} />
                </Box>
                <Box
                    my="10px"
                    aria-label={
                        language === "en"
                        ? "Settings"
                        : language === "id"
                        ? "Pengaturan"
                        : "Settings"
                    }
                    fontSize={[null, null, "13px", "15px"]}
                    color={value === "settings" ? "black" : "white"}
                    bgColor={value === "settings" ? "white" : null}
                    transition="all 0.2s"
                    fontWeight="bold"
                    cursor="pointer"
                    _hover={value !== "settings" ? { bgColor: "white", color: "black" } : null}
                    p="20px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => handleNavigation("settings")}
                >
                    <Icon as={GearFill} />
                </Box>
            </Box>
        </>
    )
}

function Profile() {

    let [user, setUser] = useState(null);
    let [section, setSection] = useState("");
    let [language, setLanguage] = useState("en");
    let { settings: setting } = useParams();

    const handleNavigation = (target) => {
        let path = "/profile";
        if(target !== "data-profile") path += `/${target}`;
        window.location.href = path;
    }

    useEffect(() => {
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
    
            if(config.profile.navItems.includes(setting)) {
                if(setting === "data-profile") window.history.pushState(null, "", "/profile");
                setSection(setting);
            }
            else {
                window.history.pushState(null, "", "/profile");
                setSection("data-profile");
            }
        }
        initialize();
    }, [setting]);

    return (
        <>
            <Helmet>
                <meta name="description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="og:title" content="Profile │ Smart Miners" />
                <meta property="og:url" content="/profile" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={user ? `${config.domain}${user.avatar_url}` : banner_dark} />
                <meta property="og:image:width" content={user ? "800" : "1920"} />
                <meta property="og:image:height" content={user ? "800" : "1080"} />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Profile │ Smart Miners" />
                <meta property="twitter:image" content={user ? `${config.domain}${user.avatar_url}` : banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Profile │ Smart Miners</title>
            </Helmet>
            <Navbar user={user} lang={language} />
            <Flex>
                <SideBar value={section} onChange={handleNavigation} language={language} />
                <Box w="85%">
                    {
                        section === "data-profile"
                        ? <DataProfile />
                        : section === "settings"
                        ? <Settings onChangeLanguage={setLanguage} />
                        : ""
                    }
                </Box>
            </Flex>
        </>
    );
}

export default Profile;