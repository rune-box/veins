import React, { useEffect } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Link,
  Container,
  useDisclosure,
  //useColorModeValue,
  Stack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../icons/Logo';
import { RoutesData } from '../data/RoutesData';
import { FaUser } from 'react-icons/fa';
import { ViewData } from '../data/ViewData';
import { JoyIDIcon } from '../icons/Icons';

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const toast = useToast();

  const connectWithJoyID = async () => {
    //
  }
  const tryDisconnect = () => {}

  return (
    <Box w="100%" bg="gray.50" px={4}>
      <Container as={Stack} maxW={'6xl'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8}>
            <Logo boxSize={12} title="Veins" />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link as={ReactLink} to={RoutesData.Start}>
                Veins
              </Link>
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {ViewData.wallet ? <Menu>
                <MenuButton colorScheme='cyan' size="lg"
                  as={Button} leftIcon={<FaUser />}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >Disconnect</MenuButton>
                <MenuList alignItems={'center'}>
                  <MenuItem onClick={tryDisconnect}>accounts.json</MenuItem>
                </MenuList>
              </Menu> : <Menu>
                <MenuButton colorScheme='cyan' size="lg"
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >Connect</MenuButton>
                <MenuList alignItems={'center'}>
                  <MenuItem icon={<JoyIDIcon/>} onClick={connectWithJoyID}>JoyID</MenuItem>
                </MenuList>
              </Menu> }
              {/* <ColorModeSwitcher /> */}
            </Stack>
          </Flex>
        </Flex>
      </Container>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {/* <Link as={ReactLink} to={RoutesData.Start}>
              Select Data Folder
            </Link> */}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};