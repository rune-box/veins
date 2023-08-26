import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Code, Flex, HStack, Heading, IconButton, Image, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, Select, Spacer, Stack, StackDivider, Text, VStack, useToast } from "@chakra-ui/react"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { MathUtils } from "../utils/MathUtils";
import { ViewData } from "../data/ViewData";
import { ColorUtils } from "../utils/ColorUtils";
import { ViewModelBridge } from "../client/ViewModelBridge";
import { NervosUtils } from "../utils/NervosUtils";
import { Buffer } from 'buffer';
import { createSpore, predefinedSporeConfigs } from '@spore-sdk/core';
import { helpers, RPC } from '@ckb-lumos/lumos';
import {getBlobAsync} from '../html/GetBlobFromCanvas';
import html2canvas from 'html2canvas';
import { RepeatIcon } from "@chakra-ui/icons";
//(window as any).Buffer = (window as any).Buffer || require("buffer").Buffer;
//global.Buffer = Buffer;
// @ts-ignore
window.Buffer = Buffer;

export const StartPage = () => {
    const [account, setAccount] = React.useState(ViewData.wallet?.account || "");
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
    const L = (window as any).L;
    var themap: any;
    const mapStyle = {
        width: "256px",
        height: "256px"
    };

    const prepare = async () => {
        getGeo();

        const addr = ViewData.wallet?.account || "";
        if (!addr || addr.length === 0)
            return;
        setAccount(addr);

        // const res = await axios.get(`${ViewModelBridge.nervosApi}get-account-info?network=${ViewModelBridge.nervosNetwork}&account=${addr}`, {
        //     headers: {
        //         Accept: 'application/vnd.api+json',
        //         'Content-Type': 'application/vnd.api+json',
        //     },
        //     data: {
        //         'Content-Type': 'application/vnd.api+json'
        //     }
        // });
        //const res = await axios.get(`${ViewModelBridge.nervosApi}get-account-info?network=${ViewModelBridge.nervosNetwork}&account=${addr}`);
        // console.log(res.data);
        // const attributes = res.data.data.attributes;

        try{
            const res = await fetch(`${ViewModelBridge.nervosApi}get-account-info?network=${ViewModelBridge.nervosNetwork}&account=${addr}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                },
            });
            const resResult = await res.json();
            console.log(resResult);
            const attributes = resResult.data.attributes;
            
            ViewData.ckbBalance = NervosUtils.parseBalanceStr(attributes["balance"] as string);
            const txs = Number.parseInt(attributes["transactions_count"]);
            setCkbBalance(ViewData.ckbBalance);
            setTxsCount(txs);
        }
        catch {}
    }

    const afterGotGeo = (position: any) => {
        const glp = position as GeolocationPosition;
        const speed = glp.coords.speed || 0;
        const altitude = glp.coords.altitude || 0;
        const accuracy = glp.coords.accuracy;
        //setSetNum(accuracy % 4);

        ViewData.latitude = glp.coords.latitude;
        ViewData.longitude = glp.coords.longitude;
        const _timestamp = glp.timestamp;
        setLatitude(ViewData.latitude);
        setLongitude(ViewData.longitude);
        setTimestamp(_timestamp);

        const latNum = MathUtils.getDecimalPlacesCount(ViewData.latitude);
        const r = 10 ^ latNum * ViewData.latitude % 255;
        const longNum = MathUtils.getDecimalPlacesCount(ViewData.longitude);
        const g = 10 ^ longNum * ViewData.longitude % 255;
        const b = _timestamp % 255;
        setColor0(ColorUtils.rgbToHex(r, g, b));
        setColor1(ColorUtils.rgbToHex(g, b, r));
        setColor2(ColorUtils.rgbToHex(b, r, g));

        if (L && !themap) {
            try{
                themap = L.map("mapContainer")
                    .setView([ViewData.latitude, ViewData.longitude], 9);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(themap);
                L.marker([ViewData.latitude, ViewData.longitude]).addTo(themap)
                    .bindPopup(`${ckbBalance} CKB</br>-- ${getNameOfWealthStatus()} --`)
                    .openPopup();
            }
            catch{}
        }
    }
    const getGeo = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(afterGotGeo);
        }
    }
    const getNameOfWealthStatus = () => {
        if (ckbBalance < 1000) return "Shrimp";
        else if (ckbBalance >= 1000 && ckbBalance < 100000) return "Fish";
        else if (ckbBalance >= 100000 && ckbBalance < 1000000) return "Shark";
        else if (ckbBalance >= 1000000 && ckbBalance < 10000000) return "Whale";
        else if (ckbBalance >= 10000000) return "Humpback whale";
        else return "";
    }
    const getIconOfWealthStatus = () => {
        if (ckbBalance < 1000) return "🦐";
        else if (ckbBalance >= 1000 && ckbBalance < 100000) return "🐟";
        else if (ckbBalance >= 100000 && ckbBalance < 1000000) return "🦈";
        else if (ckbBalance >= 1000000 && ckbBalance < 10000000) return "🐋";
        else if (ckbBalance >= 10000000) return "🐋🐋🐋";
        else return "";
    }

    const doMint = async (contentData: ArrayBuffer, contentType: string) => {
        if (!ViewData.wallet) {
            return;
        }

        let { txSkeleton } = await createSpore({
            data: {
                content: contentData,
                contentType: contentType,
                contentTypeParameters: {
                    immortal: false, // enabling the immortal extension
                },
            },
            fromInfos: [ViewData.wallet.account],
            toLock: {
                codeHash: "0xd23761b364210735c19c60561d213fb3beae2fd6172743719eff6920e020baac",
                hashType: "type",
                args: "0x0001da14bbbd07a15a4bc29163c01a878b362d375247"
            },
        });
        // Get testnet config
        const config = predefinedSporeConfigs.Aggron4;
        // Convert TransactionSkeleton to Transaction
        const tx = helpers.createTransactionFromSkeleton(txSkeleton);
        // Send the transaction
        const rpc = new RPC(config.ckbNodeUrl);
        const hash = await rpc.sendTransaction(tx, 'passthrough');
        console.log(`${hash} finished!`)
    }
    // const doImage = (err: any, canvas: HTMLCanvasElement) => {
    //     const imgType = "image/jpeg";
    //     //const jpeg = canvas.toDataURL("image/jpeg", 0.8);
    //     canvas.toBlob(async (blob) => {
    //         if (!blob) return;
    //         const data = await blob.arrayBuffer();
    //         console.log(data);
    //         await doMint(data, imgType);
    //     }, imgType, 0.8);
    // }
    const mintLocation2Spore = async () => {
        //(window as any).leafletImage(themap, doImage);
        const eleMapContainer = document.getElementById("mapContainer");
        if(!eleMapContainer){
            return;
        }
        const canvas = await html2canvas(eleMapContainer);
        const imgType = "image/jpeg";
        const blob = await getBlobAsync(canvas, imgType, 0.8);
        if (!blob) return;
        console.log(`image size: ${blob.size}`);
        const data = await blob.arrayBuffer();
        console.log(`bytes length of image: ${data.byteLength}`);
        await doMint(data, imgType);
    }
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        //
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        prepare();
    }, []);
    return (
        <VStack spacing={4}>
            <NavBar />
            {/* <Heading size="lg" mt={5} mb={5}>Settings:</Heading> */}
            {account && account.length > 5 ? <HStack>
                <Text>Robohash avatar Set: </Text>
                <Select w={24} variant='flushed' value={setNum}
                    onChange={(e) => {
                        setSetNum(parseInt(e.target.value));
                    }}>
                    <option value="1">Robot</option>
                    <option value="2">Monster</option>
                    <option value="3">Disembodied head</option>
                    <option value="4">Kitten</option>
                </Select>
            </HStack> : null}
            <Flex p={5}>
                <Card width="300px" height="420px" bgGradient={`linear(to-b, ${color1}, ${color2})`} shadow="lg">
                    <CardHeader>{account.substring(0, 4) + "..." + account.substring(account.length - 4)}</CardHeader>
                    <CardBody>
                        <Image
                            boxSize='260px'
                            objectFit='cover'
                            src={`https://robohash.org/${account}.png?set=set${setNum}`}
                            alt='Dan Abramov' />
                    </CardBody>
                    <CardFooter color="gray"></CardFooter>
                </Card>
            </Flex>
            <HStack>
                <Text>Wealth status: </Text>
                <Badge>{getNameOfWealthStatus()} {getIconOfWealthStatus()}</Badge>
            </HStack>
            <Heading size="lg" mt={5} mb={5}>Properties Value come from:</Heading>
            <Flex>
                <Card width="300px" height="420px" borderColor={color1} border={1} mr={10}>
                    <CardHeader>Geo Data <IconButton ml={4} size="sm" aria-label={"Refresh"} icon={<RepeatIcon />} isRound={true}
                        onClick={getGeo} /></CardHeader>
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
                <Spacer />
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
            {account && account.length > 5 ? <div id="mapContainer" style={mapStyle}></div> : null}
            {account && account.length > 5 ? <Flex p={5}>
                <Menu>
                    <MenuButton colorScheme='cyan' size="lg"
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>Mint My Location</MenuButton>
                    <MenuList alignItems={'center'}>
                        <MenuItem onClick={mintLocation2Spore}>Spore</MenuItem>
                    </MenuList>
                </Menu>
            </Flex> : null}
            <Footer />
        </VStack>
    );
}
