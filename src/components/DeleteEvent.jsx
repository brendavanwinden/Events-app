import { Button, HStack, Dialog } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toaster } from "./ui/toaster";
import { EventContext } from "../context/EventsContext";
import { useContext } from "react";

export default function DeleteEvent({ isOpen, event, cancel, finish }) {
  const { fetchData } = useContext(EventContext);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        toaster.create({
          title: "Error",
          description: "Event is not deleted",
          type: "error",
        });
        return;
      }
      toaster.create({
        title: "Successful!",
        description: "Event was successfully deleted",
        type: "success",
      });
      navigate("/");
      finish();
      fetchData();
    } catch {
      toaster.create({
        title: "Error",
        description: "An error has occurred",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={cancel}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="brand.bg">
          <Dialog.Header justifyContent={"center"} color="brand.text">
            Are you sure you would like to delete this event?
          </Dialog.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Footer>
              <HStack justifyContent={"center"} width={"full"}>
                <Button
                  onClick={cancel}
                  variant="outline"
                  bg={"brand.accent"}
                  border="1px solid"
                  borderColor={"brand.accent"}
                  color="brand.text"
                >
                  No
                </Button>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  bg={"brand.accent"}
                  border="1px solid"
                  borderColor={"brand.accent"}
                  color="brand.text"
                >
                  Yes
                </Button>
              </HStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
