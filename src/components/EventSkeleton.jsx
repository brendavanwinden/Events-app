import { Box, Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react";

export default function EventSkeleton() {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mx="auto"
      maxW="250px"
      bg="gray.800"
      borderColor="gray.600"
      minW="250px"
      boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
    >
      <Stack>
        <Stack minH="180px">
          <SkeletonText noOfLines={2} />
        </Stack>

        <Skeleton
          borderRadius="md"
          mb={3}
          objectFit="cover"
          height="150px"
          width="100%"
        />

        <VStack>
          <SkeletonText noOfLines={3} />
        </VStack>
      </Stack>
    </Box>
  );
}

export function EventDetailSkeleton() {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mx="auto"
      maxW="80vw"
      bg="gray.800"
      borderColor="gray.600"
      display={"grid"}
      columnCount={"1"}
      justifyContent={"center"}
      textAlign={"center"}
      boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
      mt={"30px"}
      mb={"30px"}
    >
      <Stack>
        <Stack minH="180px">
          <SkeletonText noOfLines={2} />
        </Stack>

        <Skeleton borderRadius="md" mb={3} objectFit="cover" />

        <VStack>
          <SkeletonText noOfLines={3} />
        </VStack>
      </Stack>
    </Box>
  );
}
