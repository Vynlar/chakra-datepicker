import React from "react";

import {
  ThemeProvider,
  CSSReset,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import theme from "./chakra";
import { DatepickerField } from "./Datepicker";

function App() {
  const [date, setDate] = React.useState(new Date());

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box p="8" maxW="sm" mx="auto">
        <FormControl>
          <FormLabel>Start date</FormLabel>
          <DatepickerField
            selected={date}
            onDateSelected={(date) => setDate(date.date)}
          />
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default App;
