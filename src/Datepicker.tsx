import React from "react";
import {
  Flex,
  Text,
  AspectRatio,
  Box,
  Grid,
  Stack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import { MdToday } from "react-icons/md";
import { useDayzed, RenderProps as DayzedRenderProps } from "dayzed";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novovember",
  "December",
];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps extends DayzedRenderProps {
  todayRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}

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
        <AnimateSharedLayout>
          {props.calendars.map((calendar) => (
            <Stack
              alignItems="stretch"
              key={`${calendar.year}-${calendar.month}`}
            >
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
                  {monthNames[calendar.month]} {calendar.year}
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

              <Grid
                templateColumns="repeat(7, 35px)"
                gap="1"
                px="4"
                pb="4"
                pt="2"
              >
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

                {calendar.weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    if (!day) return null;
                    const otherMonth = day.prevMonth || day.nextMonth;

                    return (
                      <AspectRatio
                        as="button"
                        key={`${weekIndex}-${dayIndex}`}
                        position="relative"
                        ratio={1}
                        borderRadius="full"
                        outline="none"
                        transition="color 0.3s, background-color 0.3s"
                        color={
                          otherMonth && !day.selected ? "gray.500" : "black"
                        }
                        fontWeight={day.today ? "bold" : "normal"}
                        _hover={{
                          bg: day.selected ? undefined : "yellow.100",
                        }}
                        _focus={{
                          border: "2px solid",
                          borderColor: "blue.400",
                        }}
                        ref={day.selected ? props.todayRef : null}
                        {...props.getDateProps({ dateObj: day })}
                      >
                        <>
                          {day.selected && (
                            <motion.div
                              layoutId="selected-date"
                              style={{ zIndex: -1 }}
                            >
                              <Box
                                borderRadius="full"
                                position="absolute"
                                top="0"
                                bottom="0"
                                left="0"
                                right="0"
                                bg="yellow.400"
                              />
                            </motion.div>
                          )}
                          <Box>{day.date.getDate()}</Box>
                        </>
                      </AspectRatio>
                    );
                  })
                )}
              </Grid>
            </Stack>
          ))}
        </AnimateSharedLayout>
      </Box>
    </Flex>
  );
};

type UseDayzedProps = Parameters<typeof useDayzed>[0];
interface DatepickerProps extends UseDayzedProps {
  selectedRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}

const Datepicker = (props: DatepickerProps) => {
  const dayzedData = useDayzed(props);

  return <Calendar {...dayzedData} todayRef={props.selectedRef} />;
};

interface DatepickerFieldProps extends UseDayzedProps {}

type PopoverState = "open" | "closed" | "closing";

export const DatepickerField = (props: DatepickerFieldProps) => {
  const selectedRef = React.useRef<HTMLButtonElement>();

  const [popoverState, setPopoverState] = React.useState<PopoverState>(
    "closed"
  );
  const isVisible = popoverState === "open" || popoverState === "closing";

  function onClose() {
    setPopoverState("closing");
  }

  const formatDate = (date: Date | Date[] | undefined): string => {
    if (!date) return "";
    if (Array.isArray(date)) {
      return date.map((date) => date.toLocaleDateString()).join(", ");
    }
    return date.toLocaleDateString();
  };

  return (
    <InputGroup>
      <Input
        borderColor="gray.400"
        value={formatDate(props.selected)}
        placeholder="Choose a date..."
      />
      <InputRightElement
        height="100%"
        alignItems="center"
        justifyContent="center"
        pr="1"
      >
        <Popover
          initialFocusRef={selectedRef}
          placement="top-end"
          isOpen={isVisible}
          onOpen={() => setPopoverState("open")}
          onClose={onClose}
        >
          <PopoverTrigger>
            <IconButton
              icon={<MdToday />}
              variant="ghost"
              size="sm"
              fontSize="24px"
              justifyContent="center"
              display="flex"
              color="gray.600"
              aria-label="Open calendar picker"
            />
          </PopoverTrigger>
          <PopoverContent
            zIndex={4}
            border="none"
            boxShadow="none"
            p="0"
            width="auto"
            maxWidth="none"
          >
            <AnimatePresence>
              <motion.div
                style={{ originX: 1, originY: 0 }}
                animate={popoverState}
                variants={{
                  closed: {
                    opacity: 0,
                    scaleX: 0.5,
                    scaleY: 0.5,
                  },
                  closing: {
                    opacity: 0,
                    scaleX: 0.5,
                    scaleY: 0.5,
                  },
                  open: { opacity: 1, scaleX: 1, scaleY: 1 },
                }}
                transition={{ duration: 0.2 }}
                onAnimationComplete={() => {
                  if (popoverState === "closing") {
                    setPopoverState("closed");
                  }
                }}
              >
                <PopoverArrow bg="yellow.400" border="none" />
                <PopoverBody p="0">
                  {isVisible && (
                    <Datepicker
                      selectedRef={selectedRef}
                      showOutsideDays
                      {...props}
                      onDateSelected={(dateObj) => {
                        setTimeout(() => {
                          onClose();
                        }, 500);
                        props.onDateSelected(dateObj);
                      }}
                    />
                  )}
                </PopoverBody>
              </motion.div>
            </AnimatePresence>
          </PopoverContent>
        </Popover>
      </InputRightElement>
    </InputGroup>
  );
};

export default Datepicker;
