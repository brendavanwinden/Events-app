import { Box, Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react";

export default function EventSkeleton() {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="brand.card"
      borderColor="brand.accent"
      w="100%"
      maxW="300px"
      mx="auto"
      boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
    >
      <Stack>
        <Stack
          minH="60px"
          css={{
            "--start-color": "brand.text",
            "--end-color": "brand.accent",
          }}
        >
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
      w="100%"
      maxW="300px"
      mx="auto"
      bg="brand.card"
      borderColor="brand.accent"
      boxShadow="0 4px 20px rgba(255, 255, 255, 0.08)"
      mt="75px"
    >
      <Stack>
        <Stack minH="60px">
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
