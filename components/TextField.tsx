"use client"

import { MdTextFields } from "react-icons/md"
import { ElementsType, FormElement, FormElementInstance } from "./FormElements"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

const type: ElementsType = "TextField"
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeholder: "Value here..."
}

export const TextFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div className="">Form Component</div>,
    propertiesComponent: () => <div className="">Properties Component</div>
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="mb-1.5"> 
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input readOnly disabled placeholder={placeholder} className="mb-1" /> 
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem] mt-1"> 
            {helperText}
          </p>
        )}
      </div>
    );
  }
  