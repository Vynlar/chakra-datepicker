import React from "react";
import {
  ThemeProvider,
  CSSReset,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import theme from "./chakra";
import Datepicker from "./Datepicker";
import { DateObj } from "dayzed";

function App() {
  const [date, setDate] = React.useState(new Date());

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box p="8" maxW="sm" mx="auto">
        <Popover>
          <PopoverTrigger>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <Input
                borderColor="gray.400"
                value={date.toLocaleDateString()}
                placeholder="Choose a date..."
              />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent zIndex={4} border="none" boxShadow="none" p="0">
            <PopoverArrow bg="yellow.400" border="none" />
            <PopoverBody p="0">
              <Datepicker
                selected={date}
                onDateSelected={(dateObj: DateObj) => {
                  setDate(dateObj.date);
                }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </ThemeProvider>
  );
}

export default App;
