import { getUser } from "../api";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Star, StarFill } from "react-bootstrap-icons";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Checkbox,
    Container,
    Divider,
    Flex,
    Heading,
    Icon,
    Img,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Wrap,
    WrapItem
} from "@chakra-ui/react";

import Navbar from "../partials/navbar";
import banner_dark from "../images/banner_dark.jpg";

function Courses() {

    let [user, setUser] = useState(null);
    let [language, setLanguage] = useState("en");
    let [loading, setLoading] = useState(false);
    let [query, setQuery] = useState("");

    // Filter 
    let [isFree, setFree] = useState(false);
    let [isCertified, setCertified] = useState(false);
    let [isFiveStars, setFiveStars] = useState(false);
    let [isFourStars, setFourStars] = useState(false);
    let [isThreeStars, setThreeStars] = useState(false);

    // Filter Topic
    let [isTechnology, setTechnology] = useState(false);
    let [isLeadership, setLeadership] = useState(false);
    let [isManagement, setManagement] = useState(false);

    // Filter Level
    let [isBeginner, setBeginner] = useState(false);
    let [isIntermediate, setIntermediate] = useState(false);
    let [isAdvanced, setAdvanced] = useState(false);

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
                <meta property="og:title" content="Courses │ Smart Miners" />
                <meta property="og:url" content="/courses" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={banner_dark} />
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <meta property="twitter:title" content="Courses │ Smart Miners" />
                <meta property="twitter:image" content={banner_dark} />
                <meta property="twitter:description" content="Get training from experts, courses, and guidance to master the mining industry in Indonesia." />
                <title>Courses │ Smart Miners</title>
            </Helmet>
            <Navbar user={user} lang={language} />
            <Box bgColor="#0E0E0E" p="4.5rem" color="white">
                <Heading as="h1" fontSize="64px">
                    Course
                </Heading>
            </Box>
            <Flex mx={[5, 10, 15, 20]} my={10} justify="space-between" flexWrap={["wrap", "wrap", null, null]}>
                <Box
                    w="20%"
                    display={["none", "none", "inline", "inline"]}
                >
                    <InputGroup>
                        <InputLeftElement cursor="pointer">
                            <Search />
                        </InputLeftElement>
                        <Input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for course"
                            borderRadius="32.2px"
                            border="solid 0.2px #777777"
                            _placeholder={{ color: "#4D4D4D" }}
                        />
                    </InputGroup>
                    <Stack mt="20px">
                        <Checkbox isChecked={isFree} onChange={(e) => setFree(e.target.checked)}>Free Course</Checkbox>
                        <Checkbox isChecked={isCertified} onChange={(e) => setCertified(e.target.checked)}>Certified Course</Checkbox>
                    </Stack>
                    <Stack mt="20px" w="max-content">
                        <Heading as="h3" fontWeight="bolder">Rating</Heading>
                        <Checkbox isChecked={isFiveStars} onChange={(e) => setFiveStars(e.target.checked)}>
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={2} />
                            5 Stars
                        </Checkbox>
                        <Checkbox isChecked={isFourStars} onChange={(e) => setFourStars(e.target.checked)}>
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={Star} color="#E4A01C" mr={2} />
                            4 Stars
                        </Checkbox>
                        <Checkbox isChecked={isThreeStars} onChange={(e) => setThreeStars(e.target.checked)}>
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                            <Icon as={Star} color="#E4A01C" mr={0.5} />
                            <Icon as={Star} color="#E4A01C" mr={2} />
                            3 Stars
                        </Checkbox>
                    </Stack>
                    <Divider my={5} />
                    <Stack mt="20px" w="max-content">
                        <Heading as="h3" fontWeight="bolder">Topic</Heading>
                        <Checkbox isChecked={isTechnology} onChange={(e) => setTechnology(e.target.checked)}>Technology</Checkbox>
                        <Checkbox isChecked={isLeadership} onChange={(e) => setLeadership(e.target.checked)}>Leadership</Checkbox>
                        <Checkbox isChecked={isManagement} onChange={(e) => setManagement(e.target.checked)}>Management</Checkbox>
                    </Stack>
                    <Divider my={5} />
                    <Stack mt="20px" w="max-content">
                        <Heading as="h3" fontWeight="bolder">Level</Heading>
                        <Checkbox isChecked={isBeginner} onChange={(e) => setBeginner(e.target.checked)}>Beginner</Checkbox>
                        <Checkbox isChecked={isIntermediate} onChange={(e) => setIntermediate(e.target.checked)}>Intermediate</Checkbox>
                        <Checkbox isChecked={isAdvanced} onChange={(e) => setAdvanced(e.target.checked)}>Advanced</Checkbox>
                    </Stack>
                </Box>

                {/**Mobile */}
                <Box
                    w="100%"
                    display={["inline", "inline", "none", "none"]}
                >
                    <Accordion allowToggle={true}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <InputGroup>
                                        <InputLeftElement cursor="pointer">
                                            <Search />
                                        </InputLeftElement>
                                        <Input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search for course"
                                            borderRadius="32.2px"
                                            border="solid 0.2px #777777"
                                            _placeholder={{ color: "#4D4D4D" }}
                                        />
                                    </InputGroup>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Wrap>
                                    <WrapItem>
                                        <Stack mt="20px">
                                            <Checkbox isChecked={isFree} onChange={(e) => setFree(e.target.checked)}>Free Course</Checkbox>
                                            <Checkbox isChecked={isCertified} onChange={(e) => setCertified(e.target.checked)}>Certified Course</Checkbox>
                                        </Stack>
                                    </WrapItem>
                                    <WrapItem>
                                        <Stack mt="20px" w="max-content">
                                            <Heading as="h3" fontWeight="bolder">Rating</Heading>
                                            <Checkbox isChecked={isFiveStars} onChange={(e) => setFiveStars(e.target.checked)}>
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={2} />
                                                5 Stars
                                            </Checkbox>
                                            <Checkbox isChecked={isFourStars} onChange={(e) => setFourStars(e.target.checked)}>
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={Star} color="#E4A01C" mr={2} />
                                                4 Stars
                                            </Checkbox>
                                            <Checkbox isChecked={isThreeStars} onChange={(e) => setThreeStars(e.target.checked)}>
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={StarFill} color="#E4A01C" mr={0.5} />
                                                <Icon as={Star} color="#E4A01C" mr={0.5} />
                                                <Icon as={Star} color="#E4A01C" mr={2} />
                                                3 Stars
                                            </Checkbox>
                                        </Stack>
                                    </WrapItem>
                                    <WrapItem>
                                        <Stack mt="20px" w="max-content">
                                            <Heading as="h3" fontWeight="bolder">Topic</Heading>
                                            <Checkbox isChecked={isTechnology} onChange={(e) => setTechnology(e.target.checked)}>Technology</Checkbox>
                                            <Checkbox isChecked={isLeadership} onChange={(e) => setLeadership(e.target.checked)}>Leadership</Checkbox>
                                            <Checkbox isChecked={isManagement} onChange={(e) => setManagement(e.target.checked)}>Management</Checkbox>
                                        </Stack>
                                    </WrapItem>
                                    <WrapItem>
                                        <Stack mt="20px" w="max-content">
                                            <Heading as="h3" fontWeight="bolder">Level</Heading>
                                            <Checkbox isChecked={isBeginner} onChange={(e) => setBeginner(e.target.checked)}>Beginner</Checkbox>
                                            <Checkbox isChecked={isIntermediate} onChange={(e) => setIntermediate(e.target.checked)}>Intermediate</Checkbox>
                                            <Checkbox isChecked={isAdvanced} onChange={(e) => setAdvanced(e.target.checked)}>Advanced</Checkbox>
                                        </Stack>
                                    </WrapItem>
                                </Wrap>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
                <Box
                    mt={[10, 10, null, null]}
                    w={["100%", "100%", "75%", "75%"]}
                >
                    <Container maxW="container.2xl">
                        <Box
                            cursor="pointer"
                            border="solid #606060 0.2px"
                            borderRadius="5px"
                            p={8}
                        >
                            <Flex
                                align="center"
                                display={["none", "none", "flex", "flex"]}
                            >
                                <Img
                                    h="87px"
                                    w="172px"
                                    borderRadius="5px"
                                    src="https://ccweb.imgix.net/https%3A%2F%2Fwww.classcentral.com%2Fimages%2Fcollections%2Fcollection-ivy-league-moocs-social.jpg?ar=16%3A9&auto=format&cs=strip&fit=crop&h=256&ixlib=php-4.1.0&w=454&s=42491aff0148bb0d046219d55469fc44"
                                    alt="banner"
                                />
                                <Heading as="h5" ml={5}>
                                    Course Title
                                </Heading>
                            </Flex>
                            <Wrap display={["flex", "flex", "none", "none"]}>
                                <WrapItem
                                    w="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Img
                                        h="87px"
                                        w="172px"
                                        borderRadius="5px"
                                        src="https://ccweb.imgix.net/https%3A%2F%2Fwww.classcentral.com%2Fimages%2Fcollections%2Fcollection-ivy-league-moocs-social.jpg?ar=16%3A9&auto=format&cs=strip&fit=crop&h=256&ixlib=php-4.1.0&w=454&s=42491aff0148bb0d046219d55469fc44"
                                        alt="banner"
                                    />
                                </WrapItem>
                                <WrapItem w="100%">
                                    <Heading as="h5" ml={5} w="100%" textAlign="center">
                                        Course Title
                                    </Heading>
                                </WrapItem>
                            </Wrap>
                            <Text mt={5}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo aliquid error, tempora ipsam dolore alias eius quod quo, reprehenderit temporibus necessitatibus repellat laboriosam recusandae eos praesentium ut accusamus labore?
                            </Text>
                            <Text mt={10} color="#898989">
                                Free
                            </Text>
                        </Box>
                    </Container>
                </Box>
            </Flex>
        </>
    )
}

export default Courses;