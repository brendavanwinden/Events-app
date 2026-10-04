import { Input } from "@chakra-ui/react";

export function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Input
      type="search"
      bg="brand.card"
      value={searchInput}
      onChange={handleChange}
      placeholder="Search for your Event"
      _placeholder={{ textAlign: "center", color: "brand.text" }}
      fontSize={{ base: "12px", md: "14px", lg: "16px" }}
      border="1px solid"
      borderColor="brand.text"
      borderRadius="4px"
      padding="8px"
      width={{ base: "85%", md: "65%", lg: "50%" }}
      maxWidth={"550px"}
      textAlign={"center"}
      fontWeight={500}
      mt={{ base: "70px", md: "90px" }}
      mb="50px"
    />
  );
}
