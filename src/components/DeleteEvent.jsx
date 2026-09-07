import { Button, HStack, Dialog } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function DeleteEvent({ isOpen, event, cancel, finish }) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    navigate("/");
    finish();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={cancel}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header justifyContent={"center"}>
            Are you sure you would like to delete this event?
          </Dialog.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Footer>
              <HStack justifyContent={"center"} width={"full"}>
                <Button onClick={cancel} variant="outline">
                  No
                </Button>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
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
