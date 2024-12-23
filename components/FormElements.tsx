import React from "react"
import { TextFieldFormElement } from "./fields/TextField"
import { TitleFieldFormElement } from "./fields/TitleField"
import { SubtitleFieldFormElement } from "./fields/SubtitleField"
import { ParagraphFieldFormElement } from "./fields/ParagraphField"
import { SeparatorFieldFormElement } from "./fields/SeperatorField"
import { SpacerFieldFormElement } from "./fields/SpacerField"
import { NumberFieldFormElement } from "./fields/NumberField"
import { TextAreaFieldFormElement } from "./fields/TextAreaField"
import { DateFieldFormElement } from "./fields/DateField"
import { SelectFieldFormElement } from "./fields/SelectField"

export type ElementsType = "TextField" | "TitleField" | "SubtitleField" | "ParagraphField" | "SeperatorField" | "SpacerField" | "NumberField" | "TextAreaField" | "DateField" | "SelectField"
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
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubtitleField: SubtitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeperatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement
}