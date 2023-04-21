import { Box, Link, HStack, Divider } from "@chakra-ui/react";

export const Footer = ()=>{
    return (
        <Box w="100%" h={12} color="gray">
            <Divider mt={3} mb={3} />
            <HStack spacing={3} ml={3}>
                <Link textDecoration="none" href="https://www.runebox.xyz/">Runebox</Link>
                <Link textDecoration="none" href="https://github.com/rune-box">Github</Link>
                <Link textDecoration="none" href="https://twitter.com/_runebox_">Twitter</Link>
            </HStack>
        </Box>
    );
}