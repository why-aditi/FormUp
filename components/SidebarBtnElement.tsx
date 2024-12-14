import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/core'
import {cn} from "@/lib/utils"

export default function SidebarBtnElement({formElement}: {formElement: FormElement}) {
    const {label, icon: Icon} = formElement.designerBtnElement
    const draggable = useDraggable({
        id: `designer-btn=${formElement.type}`, 
        data:{
            type: formElement.type,
            isDesignerBtnElement: true
        }
    })


  return (
    <Button
        variant={'outline'}
        className={cn('flex flex-col gap-2cursor-grab h-[120px] w-[120px]',
            draggable.isDragging && "ring-2 ring-primary"
        )}
        {...draggable.listeners}        
        {...draggable.attributes}        
    >
      <Icon className="h-8 w-8 text-primary cursor-grab"/>
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export function SidebarBtnElementDragOverlay({formElement}: {formElement: FormElement}) {
    const {label, icon: Icon} = formElement.designerBtnElement
  return (
    <Button
        variant={'outline'}
        className='flex flex-col gap-2cursor-grab h-[120px] w-[120px]'    
    >
      <Icon className="h-8 w-8 text-primary cursor-grab"/>
      <p className="text-xs">{label}</p>
    </Button>
  )
}
