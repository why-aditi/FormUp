import React from 'react'
import useDesigner from './hooks/useDesigner'
import { Button } from './ui/button'
import { AiOutlineClose } from "react-icons/ai"
import { FormElements } from './FormElements'

export default function PropertiesFromSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner()

    if (!selectedElement) return null

    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

    return (
        <div className='flex flex-col p-2'>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-foreground/70">Element Properties</p>
                <Button size={"icon"} variant={"ghost"} onClick={() => setSelectedElement(null)}>
                    <AiOutlineClose />
                </Button>
            </div>
            <PropertiesForm elementInstance={selectedElement}/>
        </div>
    )
}
