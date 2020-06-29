import React from "react";
import {
  Flex,
  Text,
  AspectRatio,
  Box,
  Grid,
  Stack,
  IconButton,
} from "@chakra-ui/core";
import { useDayzed, RenderProps as DayzedRenderProps } from "dayzed";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CalendarProps extends DayzedRenderProps {}

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = (props: CalendarProps) => {
  return (
    <Flex>
      <Box
        boxShadow="lg"
        borderRadius="lg"
        border="4px solid"
        borderColor="yellow.400"
        overflow="hidden"
      >
        {props.calendars.map((calendar) => (
          <Stack alignItems="stretch">
            <Flex p="2" bg="yellow.400" alignItems="center">
              <IconButton
                aria-label="Previous month"
                variant="ghost"
                size="sm"
                fontSize="24px"
                borderRadius="full"
                color="black"
                colorScheme="yellow"
                _hover={{ bg: "yellow.200" }}
                icon={<MdChevronLeft />}
                {...props.getBackProps({ calendars: props.calendars })}
              />

              <Text textAlign="center" fontWeight="bold" mx="auto">
                {monthNamesShort[calendar.month]} {calendar.year}
              </Text>

              <IconButton
                aria-label="Next month"
                variant="ghost"
                size="sm"
                fontSize="24px"
                borderRadius="full"
                color="black"
                colorScheme="yellow"
                _hover={{ bg: "yellow.200" }}
                icon={<MdChevronRight />}
                {...props.getForwardProps({ calendars: props.calendars })}
              />
            </Flex>
            <Grid templateColumns="repeat(7, 1fr)" gap="1" px="4" pb="4" pt="2">
              {weekdayNamesShort.map((weekdayName) => (
                <Box
                  justifySelf="center"
                  fontWeight="bold"
                  color="gray.500"
                  key={weekdayName}
                  fontSize="sm"
                  mb="1"
                >
                  {weekdayName.toUpperCase()}
                </Box>
              ))}

              {calendar.weeks.map((week, weekIndex) => (
                <>
                  {week.map((day, dayIndex) => {
                    if (!day) return null;
                    const today =
                      day.date.toDateString() === new Date().toDateString();

                    return (
                      <AspectRatio
                        as="button"
                        key={`${weekIndex}-${dayIndex}`}
                        ratio={1}
                        borderRadius="full"
                        transition="background-color 0.1s"
                        fontWeight={today ? "bold" : "normal"}
                        bg={day.selected ? "yellow.400" : "transparent"}
                        _hover={{
                          bg: "yellow.400",
                        }}
                        {...props.getDateProps({ dateObj: day })}
                      >
                        <Box>{day.date.getDate()}</Box>
                      </AspectRatio>
                    );
                  })}
                </>
              ))}
            </Grid>
          </Stack>
        ))}
      </Box>
    </Flex>
  );
};

const Datepicker = (props: any) => {
  const dayzedData = useDayzed(props);

  return <Calendar {...dayzedData} />;
};

export default Datepicker;
