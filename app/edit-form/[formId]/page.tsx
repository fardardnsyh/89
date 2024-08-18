"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

interface Params {
  formId: string;
}

interface EditFormProps {
  params: Params;
}

function EditForm({ params }: EditFormProps) {
  const { user } = useUser();
  const [sonForm, setJsonForm] = useState([]);

  useEffect(() => {
    user && getFormData();
  }, [user]);

  const getFormData = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const formIdNumber = Number(params?.formId);

      if (isNaN(formIdNumber)) {
        console.error("Form ID is not a valid number");
        // Handle the error appropriately
        return;
      }

      const result = await db
        .select()
        .from(JsonForms)
        .where(and(eq(JsonForms.id, formIdNumber), eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)));

      console.log(JSON.parse(result[0].jsonform));
      setJsonForm(JSON.parse(result[0].jsonform));
    } else {
      console.error("User email address is undefined");
      // Handle the error appropriately, e.g., return an error response or throw an exception
    }
  };
  return <div className="p-10 h-screen">EditForm</div>;
}

export default EditForm;
