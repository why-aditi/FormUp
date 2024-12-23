"use client"

import { ElementsType, FormElement} from "../FormElements"
import { Label } from "../ui/label"
import { RiSeparator } from "react-icons/ri"
import { Separator } from "../ui/separator"

const type: ElementsType = "SeperatorField"

export const SeparatorFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    
    validate: () => true
}

function PropertiesComponent(){
    return <p>No Properties for this element</p>
}

function DesignerComponent() {
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="text-muted-foreground"> Separator Field</Label>
        <Separator/>
      </div>
    );
  }

function FormComponent() {
    return <Separator/>
  }