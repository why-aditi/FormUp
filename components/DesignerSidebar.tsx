import React from 'react'
import useDesigner from './hooks/useDesigner'
import FormElementSidebar from './FormElementsSidebar'
import PropertiesFromSidebar from './PropertiesFromSidebar'

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner()

  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedElement ? (
        <FormElementSidebar />
      ) : (
        <PropertiesFromSidebar />
      )}
    </aside>
  )
}
