import React from "react"
import { TextFieldFormElement } from "./TextField"

export type ElementsType = "TextField"

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
        }
    >
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance
    }>
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