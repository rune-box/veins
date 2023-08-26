import { Box, Button, Center, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Text, VStack } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import React, { useEffect } from "react";
import { ViewData } from "../data/ViewData";
import { MathUtils } from "../utils/MathUtils";
import { RepeatIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
class Person {
    account: string = "";
    balance: number = 0;

    x: number = 0;
    y: number = 0;

    width: number = 30;
    height: number = 100;
    
    constructor(){
    }
}

export const NearByPage = () => {
    const [items, setItems] = React.useState(new Array<Person>());
    const [me, setMe] = React.useState(new Person());
    const [personA, setPersonA] = React.useState(new Person());
    const [personB, setPersonB] = React.useState(new Person());
    const baseW = 30;
    const baseH = 100;
    const randomPerson = (account: string, ckbAmount: number, canvasWidth: number, canvasHeight: number) : Person=> {
        const factor = ckbAmount / 10000;
        const w = baseW * factor;
        const h = baseH * factor;
        const p: Person = {
            account: account,
            balance: ckbAmount,
            x: MathUtils.randomInt(w, canvasWidth - w),
            y: MathUtils.randomInt(h, canvasHeight - h),
            width: w,
            height: h,
        }
        return p;
    }
    const refresh = () => {
        // const people: Array<Person> = [];
        // const me: Person = randomPerson("ME", ViewData.ckbBalance, 1200, 1200);
        // people.push(me);

        // const ranA = randomPerson("Test A", MathUtils.randomInt(10, 100000), 1200, 1200);
        // people.push(ranA);
        // const ranB = randomPerson("Test B", MathUtils.randomInt(10, 100000), 1200, 1200);
        // people.push(ranB);

        // setItems([...people]);

        setMe(randomPerson("ME", ViewData.ckbBalance, 1200, 1200));
        setPersonA(randomPerson("Test A", MathUtils.randomInt(500, 100000), 1200, 1200));
        setPersonB(randomPerson("Test B", MathUtils.randomInt(500, 100000), 1200, 1200));
    }

    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        //
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        refresh();
      }, []);
      //
    return (
        <VStack spacing={4}>
            <NavBar />
            <HStack>
                <Button leftIcon={<RepeatIcon />} onClick={refresh}>Refresh</Button>
            </HStack>
            {/* <HStack width="100%">
                <Text>Me's Balance: </Text>
                <Slider aria-label='slider-ex-4' defaultValue={me.balance} min={500} max={100000} onChangeEnd={(val) => {
                    const factor = val / 10000; me.width = baseW * factor; me.height = baseH * factor; me.balance = val; setMe(me);
                }}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </HStack>
            <HStack width="100%">
                <Text>PersonA's Balance: </Text>
                <Slider aria-label='slider-ex-4' defaultValue={personA.balance} min={500} max={100000} onChangeEnd={(val) => {
                    const factor = val / 10000; personA.width = baseW * factor; personA.height = baseH * factor; personA.balance = val; setPersonA(personA);
                }}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </HStack>
            <HStack width="100%">
                <Text>PersonB's Balance: </Text>
                <Slider aria-label='slider-ex-4' defaultValue={personB.balance} min={500} max={100000} onChangeEnd={(val) => {
                    const factor = val / 10000; personB.width = baseW * factor; personB.height = baseH * factor; personB.balance = val; setPersonB(personB);
                }}>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </HStack> */}
            <Text>This is a map simulator to simulate the positions with the characters around me, and the effect of money on the size of the characters.</Text>
            <Box width="100%" height="1200px" borderWidth="1px" borderColor="gray.100" overflow="hidden">
                {/* {items.map((item: Person, index: number) => (
                    <Box pos="absolute" top={`${item.y}px`} left={`${item.x}px`} width={`${item.width}px`} height={`${item.height}px`} key={index}
                        borderWidth="1px" borderColor="gray">
                            <Center><FaUser/></Center>
                        {item.account}
                    </Box>
                ))} */}
                <Box pos="absolute" top={`${me.y}px`} left={`${me.x}px`} width={`${me.width}px`} height={`${me.height}px`}
                    borderWidth="1px" borderColor="gray">
                        <Center><FaUser/></Center>
                    <Center fontWeight="bold">{me.account}</Center>
                    <Center color="gray.100">{me.balance}</Center>
                </Box>
                <Box pos="absolute" top={`${personA.y}px`} left={`${personA.x}px`} width={`${personA.width}px`} height={`${personA.height}px`}
                    borderWidth="1px" borderColor="gray">
                        <Center><FaUser/></Center>
                    <Center fontWeight="bold">{personA.account}</Center>
                    <Center color="gray.100">{personA.balance}</Center>
                </Box>
                <Box pos="absolute" top={`${personB.y}px`} left={`${personB.x}px`} width={`${personB.width}px`} height={`${personB.height}px`}
                    borderWidth="1px" borderColor="gray">
                        <Center><FaUser/></Center>
                    <Center fontWeight="bold">{personB.account}</Center>
                    <Center color="gray.100">{personB.balance}</Center>
                </Box>
            </Box>
            <Footer />
        </VStack>
    );
}