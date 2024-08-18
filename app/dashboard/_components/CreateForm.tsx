"use client";
import React, { useState } from "react";
import moment from "moment";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AiChatSession } from "@/configs/AiModal";
import { JsonForms } from "@/configs/schema";
import { db } from "@/configs";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const PROMPT = `
On the basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required field in JSON  format`;

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const route = useRouter();

  const onCreateForm = async () => {
    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
      const responseText = result.response.text();
      console.log(responseText);

      if (responseText) {
        const jsonformValue = responseText || ""; // Ensure jsonform is a string
        const createdByValue = user?.primaryEmailAddress?.emailAddress || ""; // Ensure createdBy is a string
        const createdAtValue = moment().format("DD/MM/YYYY"); // Ensure createdAt is a string

        const resp = await db
          .insert(JsonForms)
          .values({
            jsonform: jsonformValue,
            createdBy: createdByValue,
            createdAt: createdAtValue,
          })
          .returning({ id: JsonForms.id });
        console.log("New Form ID:", resp[0].id);
        if (resp[0].id) {
          route.push("/edit-form/" + resp[0].id);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                className="my-2"
                placeholder="Type your form description here."
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button variant="destructive" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button disabled={loading} onClick={onCreateForm}>
                  Create
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateForm;
