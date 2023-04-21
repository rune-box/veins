import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Code, Flex, HStack, Heading, Image, Input, InputGroup, InputLeftAddon, Spacer, Stack, StackDivider, Text, VStack, useToast } from "@chakra-ui/react"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom";
import { RoutesData } from "../data/RoutesData";
import React, { useEffect } from "react";
import axios from "axios";
import { MathUtils } from "../utils/MathUtils";
import { ViewData } from "../data/ViewData";
import { CkbIcon } from "../icons/Icons";
import { ColorUtils } from "../utils/ColorUtils";
import { ViewModelBridge } from "../client/ViewModelBridge";
import { NervosSettings } from "../client/NervosSettings";
import { NervosUtils } from "../utils/NervosUtils";
export const StartPage = () => {
    const [account, setAccount] = React.useState("");
    const [ckbBalance, setCkbBalance] = React.useState(0);
    const [txsCount, setTxsCount] = React.useState(0);

    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [timestamp, setTimestamp] = React.useState(0);

    const [color0, setColor0] = React.useState("gray");
    const [color1, setColor1] = React.useState("gray");
    const [color2, setColor2] = React.useState("gray");
    const [setNum, setSetNum] = React.useState(1);
    const toast = useToast();
    const nav = useNavigate();

    const afterConnected = async () => {
        const addr = ViewData.wallet?.account || "";
        if(!addr || addr.length === 0)
            return;
        setAccount(addr);

        const res = await axios.get(`${NervosSettings.TestNet.API}addresses/${addr}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            },
            data: {
                'Content-Type': 'application/vnd.api+json'
            }
        });
        console.log(res.data);
        const attributes = res.data.data.attributes;
        const balance = NervosUtils.parseBalanceStr(attributes["balance"] as string);
        const txs = Number.parseInt(attributes["transactions_count"]);
        setCkbBalance(balance);
        setTxsCount(txs);
    }
    const afterDisConnected = () => {
        setAccount("");
        ViewData.wallet = null;
    }
    const afterGotGeo = (position: any) => {
        const glp = position as GeolocationPosition;
        const speed = glp.coords.speed || 0;
        const altitude = glp.coords.altitude || 0;
        const accuracy = glp.coords.accuracy;
        setSetNum(accuracy % 4);

        const _latitude = glp.coords.latitude;
        const _longitude = glp.coords.longitude;
        const _timestamp = glp.timestamp;
        setLatitude(_latitude);
        setLongitude(_longitude);
        setTimestamp(_timestamp);
        
        const latNum = MathUtils.getDecimalPlacesCount(_latitude);
        const r = 10 ^ latNum * _latitude % 255;
        const longNum = MathUtils.getDecimalPlacesCount(_longitude);
        const g = 10 ^ longNum * _longitude % 255;
        const b = _timestamp % 255;
        setColor0(ColorUtils.rgbToHex(r, g, b));
        setColor1(ColorUtils.rgbToHex(g, b, r));
        setColor2(ColorUtils.rgbToHex(b, r, g));
    }
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getGeo() {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(afterGotGeo);
            }
        };
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        getGeo();
        ViewModelBridge.afterConnected = afterConnected;
        ViewModelBridge.afterDisConnected = afterDisConnected;
      }, []);
    return (
        <VStack spacing={4}>
            <NavBar />
            <Flex p={5}>
                <Card width="300px" height="420px" borderColor={color1} border={1} mr={10}>
                    <CardHeader>Geo Data</CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Latitude
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                {latitude}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Longitude
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                {longitude}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Timestamp
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                {timestamp}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <CardFooter color="gray">Location Based</CardFooter>
                </Card>
                <Spacer/>
                {account && account.length > 5 ? <Card width="300px" height="420px" bgGradient={`linear(to-b, ${color1}, ${color2})`} shadow="lg">
                    <CardHeader>{account.substring(0, 4) + "..." + account.substring(account.length - 4)}</CardHeader>
                    <CardBody>
                        <Image
                            boxSize='260px'
                            objectFit='cover'
                            src={`https://robohash.org/${account}.png?set=set${setNum}`}
                            alt='Dan Abramov'/>
                    </CardBody>
                    <CardFooter color="gray"></CardFooter>
                </Card> : <CkbIcon width="260px" height="260px" /> }
                <Spacer/>
                <Card width="300px" height="420px" ml={10} borderColor={color2} border={1}>
                    <CardHeader>Account Data</CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                $CKB Balance
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                {ckbBalance}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                Transactions Count
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                {txsCount}
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    <CardFooter color="gray">Nervos</CardFooter>
                </Card>
            </Flex>
            <Footer />
        </VStack>
    );
}