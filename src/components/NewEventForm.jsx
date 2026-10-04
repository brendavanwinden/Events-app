import {
  Button,
  Field,
  Fieldset,
  Input,
  Textarea,
  VStack,
  Dialog,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toaster } from "./ui/toaster";
import { useContext } from "react";
import { EventContext } from "../context/EventsContext";

export default function AddEventForm({ event, categories, cancel, finish }) {
  const { fetchData } = useContext(EventContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: data.image,
          categoryIds: data.categoryIds.map((id) => Number(id)),
          location: data.location,
          startTime: data.startTime,
          endTime: data.endTime,
        }),
      });
      if (!response.ok) {
        toaster.create({
          title: "Error",
          description: "Event is not created",
          type: "error",
        });
        return;
      }
      toaster.create({
        title: "Successfull!",
        description: "Event was successfully created",
        type: "success",
      });

      reset();

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
    <Dialog.Root open={event} onOpenChange={cancel}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content bg="brand.bg">
          <Dialog.Header color="brand.text">Add event</Dialog.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Body color="brand.text">
              <Field.Root invalid={errors.title} mt={4}>
                <Field.Label>Title event</Field.Label>
                <Input
                  border="brand.accent"
                  focusRingColor="brand.accent"
                  type="text"
                  {...register("title", {
                    required: "Please enter the title of your event",
                  })}
                />
                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.description} mt={4}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  focusRingColor="brand.accent"
                  placeholder="Write the description..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.image} mt={4}>
                <Field.Label>Image</Field.Label>
                <Textarea
                  focusRingColor="brand.accent"
                  placeholder="Paste the URL of your image..."
                  {...register("image", { required: "Image is required" })}
                />
                <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.location} mt={4}>
                <Field.Label>Location</Field.Label>
                <Input
                  focusRingColor="brand.accent"
                  type="text"
                  {...register("location", {
                    required: "Please enter the location of your event",
                  })}
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={errors.starttime} mt={4}>
                <Field.Label>Start time</Field.Label>
                <Input
                  focusRingColor="brand.accent"
                  type="datetime-local"
                  placeholder="Specify the start time..."
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                />
                <Field.ErrorText>{errors.starttime?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.endtime} mt={4}>
                <Field.Label>End time</Field.Label>
                <Input
                  focusRingColor="brand.accent"
                  type="datetime-local"
                  placeholder="Specify your end time..."
                  {...register("endTime", { required: "End time is required" })}
                />
                <Field.ErrorText>{errors.endtime?.message}</Field.ErrorText>
              </Field.Root>

              <Fieldset.Root invalid={errors.categoryIds} mt={4}>
                <Fieldset.Legend color="brand.text">Category</Fieldset.Legend>
                {categories.map((category) => (
                  <Checkbox.Root key={category.id} value={category.id}>
                    <Checkbox.HiddenInput
                      {...register("categoryIds", {
                        required: "Categories are required",
                      })}
                    />
                    <Checkbox.Control
                      _checked={{ bg: "brand.bg", borderColor: "brand.text" }}
                    >
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label>{category.name}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
                <Fieldset.ErrorText>
                  {errors.categoryIds?.message}
                </Fieldset.ErrorText>
              </Fieldset.Root>
            </Dialog.Body>

            <Dialog.Footer>
              <VStack mt={6} spacing={3}>
                <Button
                  onClick={cancel}
                  variant="outline"
                  width="full"
                  bg={"brand.accent"}
                  border="1px solid"
                  borderColor={"brand.accent"}
                  color="brand.text"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  width="full"
                  bg={"brand.accent"}
                  border="1px solid"
                  borderColor={"brand.accent"}
                  color="brand.text"
                >
                  Submit Event
                </Button>
              </VStack>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
