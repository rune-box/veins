import { Box, Button, Code, Flex, HStack, Heading, Input, InputGroup, InputLeftAddon, Text, VStack, useToast } from "@chakra-ui/react"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom";
import { RoutesData } from "../data/RoutesData";
export const StartPage = () => {
    const toast = useToast();
    const nav = useNavigate();

    return (
        <VStack spacing={4}>
            <NavBar />
            <VStack>
                Start
            </VStack>
            <Footer />
        </VStack>
    );
}