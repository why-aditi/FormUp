import React, { useTransition } from 'react'
import { Button } from './ui/button'
import {HiSaveAs} from 'react-icons/hi'
import {FaSpinner} from 'react-icons/fa'
import { UpdateFormContent } from '@/actions/form'
import useDesigner from './hooks/useDesigner'
import { useToast } from "@/components/hooks/use-toast"

export default function SaveFormBtn({id}: {id:number}) {
  const { toast } = useToast();
  const {elements} = useDesigner()
  const [loading, startTransition] = useTransition()
  const updateFormContent = async () => {
    try{
      const jsonElements = JSON.stringify(elements)
      await UpdateFormContent(id, jsonElements)
      toast({
        title: "Success",
        description: "Your form has been saved"
      })
    } catch (error) {
      toast({
        title: "Error", 
        description: "something went wrong",
        variant: "destructive"
      })
    }
  }
  return (
    <Button variant={'outline'} className='gap-2' disabled={loading} onClick={() =>{
      startTransition(updateFormContent)
    }}>
        <HiSaveAs className='h-4 w-4'/>
        Save
        {loading && <FaSpinner className='animate-spin'/>}
    </Button>
  )
}
