import { Input } from "@chakra-ui/react";

export function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Input
      type="search"
      value={searchInput}
      onChange={handleChange}
      placeholder="Search for your Event"
      _placeholder={{ textAlign: "center" }}
      fontSize={{ base: "12px", md: "14px", lg: "16px" }}
      border="1px solid white"
      borderRadius="4px"
      padding="8px"
      width="40vw"
      marginBottom="40px"
      textAlign="center"
      fontWeight={500}
      mt={{ base: "70px", md: "90px" }}
      mb="50px"
    />
  );
}
