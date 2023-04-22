import { Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { CkbIcon, JoyIDIcon } from "../icons/Icons";
import { Footer } from "../components/Footer";
import { CloseIcon } from "@chakra-ui/icons";

export const HomePage = () => {
    return (
        <VStack spacing={4}>
            <NavBar />
            <Box ml={5} mr={5} p={5}>
                <HStack spacing={10}>
                    <JoyIDIcon width="300px" height="300px" />
                    <CloseIcon width="30px" height="30px"/>
                    <CkbIcon width="300px" height="300px" />
                </HStack>
            </Box>
            <Footer />
        </VStack>
    );
}