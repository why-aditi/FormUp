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
    designerComponent: React.FC
    formComponent: React.FC
    propertiesComponent: React.FC
}

export type FormElementInstance = {
    id: string,
    type: ElementsType,
    extraAttributes?: {
        label?: string;
        helperText?: string;
        required?: boolean;
        placeholder?: string;
    };
}

type FromElementsType = {
    [key in ElementsType]: FormElement
}

export const FormElements: FromElementsType = {
    TextField: TextFieldFormElement
}