"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

function FormSubmitComponent({
    content,
    formUrl
}: {
    content: FormElementInstance[];
    formUrl: string
}) {
    const formValues = useRef<{[key: string]: string}>({});
    const formErrors = useRef<{[key: string]: boolean}>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime())
    const [submitted, setSubmitted] = useState(false)
    const [pending, startTransition] = useTransition()
    const validateForm:() =>boolean = useCallback(() => {
        for(const field of content){
            const actualValue = formValues.current[field.id] || ""
            const valid = FormElements[field.type].validate(field, actualValue)
            if(!valid) formErrors.current[field.id] = true
        }
        if(Object.keys(formErrors.current).length>0) return false
        return true
    }, [content])
    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value
    }, [])
    const submitForm = async () => {
        formErrors.current = {}
        const validForm = validateForm()
        if (!validForm){
            setRenderKey(new Date().getTime())
            toast({
                title: "Error",
                description: "Please check the form for errors",
                variant: "destructive"
            })
            return
        }
        try {
            const jsonContent = JSON.stringify(formValues.current)
            await SubmitForm(formUrl, jsonContent)
            setSubmitted(true)
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
            
        }
        console.log("FORM VALUES", formValues.current) 
    };

    if(submitted){
        return(
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="flex flex-col gap-4 max-w-[620px] flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                    <h1 className="text-2xl font-bold">
                        Form Submitted
                    </h1>
                    <p className="text-muted-foreground">Thank you for submitting the form, you can close the page now</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                {content.map((element) => {
                    const FormElement = FormElements[element.type]?.formComponent;
                    if (!FormElement) {
                        return <div key={element.id}>Component not found for type {element.type}</div>;
                    }
                    return <FormElement 
                        key={element.id} 
                        elementInstance={element} 
                        submitValue={submitValue}
                        isInvalid={formErrors.current[element.id]}
                        defaultValue={formValues.current[element.id]}
                    />;
                })}
                {!pending && <>
                    <Button 
                        className="mt-8" 
                        onClick={() => {startTransition(submitForm)}} 
                        disabled={pending}
                    >
                        <HiCursorClick className="mr-2"/> Submit
                    </Button>
                </>}
                {pending && <ImSpinner2 className="animate-spin"/>}
            </div>
        </div>
    );
}

export default FormSubmitComponent;
