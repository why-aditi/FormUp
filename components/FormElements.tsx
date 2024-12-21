import React from "react"
import { TextFieldFormElement } from "./TextField"

export type ElementsType = "TextField"
export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
    type: ElementsType

    construct: (id: string) => FormElementInstance

    designerBtnElement: {
        icon: React.ElementType
        label: string
    }
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>
    formComponent: React.FC<
        {
            elementInstance: FormElementInstance
            submitValue?: SubmitFunction
            isInvalid?: boolean
            defaultValue?: string
        }
        >
        propertiesComponent: React.FC<{
            elementInstance: FormElementInstance
        }>
        validate: (formElement: FormElementInstance, current: string) => boolean;
}

export type FormElementInstance = {
    id: string,
    type: ElementsType,
    extraAttributes?: {
        label?: string;
        helperText?: string;
        required?: boolean;
        placeHolder?: string;
    };
}

type FromElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements: FromElementsType = {
    TextField: TextFieldFormElement
}