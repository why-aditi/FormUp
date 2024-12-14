"use client"

import { Form } from '@prisma/client'
import React from 'react'
import PreviewDialogBtn from '@/components/PreviewDialogBtn';
import PublishFormBtn from '@/components/PublishFormBtn';
import SaveFormBtn from '@/components/SaveFormBtn';
import Designer from '@/components/Designer';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';


export default function FormBuilder({form}:{
    form: Form
}) {
  return (
    <DndContext>
        <main className="flex flex-col w-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
              <h2 className='truncate form-medium'>
                  <span className='text-muted-foreground mr-2'>
                      Form:
                  </span>
                  {form.name}
              </h2>
              <div className="flex items-center gap-2">
                  <PreviewDialogBtn />
                  {!form.published && (
                      <>
                          <SaveFormBtn/>
                          <PublishFormBtn/>
                      </>
                  )}
              </div>
          </nav>
          <div className="flex flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper.svg)]">
              <Designer />
          </div>
      </main>
      <DragOverlayWrapper/>
    </DndContext>
  )
}
