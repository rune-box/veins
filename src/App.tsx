import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { StartPage } from "./pages/StartPage"
import { RoutesData } from "./data/RoutesData"
import { HomePage } from "./pages/HomePage"
import { NearByPage } from "./pages/NearByPage"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
    <BrowserRouter>
        <Routes>
          <Route path={RoutesData.Home} element={<HomePage />} />
          <Route path={RoutesData.Start} element={<StartPage />} />
          <Route path={RoutesData.NearBy} element={<NearByPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  </ChakraProvider>
)
