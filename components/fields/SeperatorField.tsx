"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator"

const type: ElementsType = "SeparatorField"

export const SeparatorFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type,     }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    
    validate: ()=> true,
}


function PropertiesComponent({elementInstance}:{elementInstance: FormElementInstance}){
    return <p className="">No properties from this element</p>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="text-muted-foreground"> 
          Separator Field
        </Label>
        <Separator />
      </div>
    );
  }

function FormComponent({ elementInstance,}: { elementInstance: FormElementInstance;  }) {
    return (
      <Separator />
    );
  }