import React, { useState } from "react";
import "./App.css";
import Hero from "./Hero";
import ContactFormWithSocialButtons from "./ContactForm";
import SimpleThreeColumns from "./Steps";
import Banner from "./Banner";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import AuthProvider, { useAuth } from "./components/AuthContext";
import AccountPage from "./pages/AccountPage";
import EventPage from "./EventPage/EventPage";
import EventListPage from "./EventListPage/EventListPage";
import EventManagePage from "./EventManagePage/EventManagePage";

function Layout() {
  return (
    <Flex direction={"column"}>
      <Banner />
      <Outlet />
    </Flex>
  );
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const shortTimeout = setTimeout(() => {
      toast({
        title: "Warp Drive Starting",
        description: "Please wait while we configure the warp drive.",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }, 3000);
    const longTimeout = setTimeout(() => {
      toast({
        title: "Aligning Star Gates",
        description: "Don't worry, we'll be done shortly",
        duration: 15000,
        isClosable: true,
        position: "top",
      });
    }, 10000);
    let formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setIsSubmitting(true);
    auth
      .signIn(email, password)
      .then(() => {
        setIsSubmitting(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsSubmitting(false);
        const { data } = error.response;
        toast({
          title: data.message || "Oops! Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => {
        clearTimeout(shortTimeout);
        clearTimeout(longTimeout);
      });
  }

  return (
    <Box
      as={"div"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
    >
      <form onSubmit={handleSubmit}>
        <Flex
          bg={"white"}
          p={10}
          alignItems={"center"}
          flexDirection={"column"}
          borderRadius={"md"}
          border={"1px solid #E2E8F0"}
        >
          <FormControl variant="floating" id="email" isRequired>
            <Input placeholder=" " name={"email"} />
            <FormLabel>Email</FormLabel>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired mt={5}>
            <Input type={"password"} placeholder="" name={"password"} />
            <FormLabel>Password</FormLabel>
          </FormControl>
          <Button mt={5} type={"submit"} isLoading={isSubmitting}>
            Sign in
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <SimpleThreeColumns />
                <ContactFormWithSocialButtons />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/event/manage/:eventId" element={<EventManagePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
