"use client"

import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import useDesigner from "../hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { Button } from "../ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { PopoverContent } from "@radix-ui/react-popover"
import { Calendar } from "../ui/calendar"

const type: ElementsType = "DateField"
const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
})

export const DateFieldFormElement:FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsFillCalendarDateFill,
        label: "Date Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    
    validate: (formElement: FormElementInstance, currentValue: string): boolean =>{
        const element = formElement as CustomInstance
        if(element.extraAttributes.required){
            return currentValue.length > 0
        }
        return true
    },
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({elementInstance}:{elementInstance: FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {updateElement} = useDesigner()
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        }
    })
    
    useEffect(() =>{
        form.reset(element.extraAttributes)
    }, [element, form])

    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, required} = values
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
            }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={e =>{
            e.preventDefault()
        }}>
            <FormField control={form.control} name="label" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Label
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormDescription>
                        The label for the field <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField control={form.control} name="helperText" render={({field}) => (
                <FormItem>
                    <FormLabel>
                        HelperText
                    </FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={e =>{
                            if(e.key === "Enter") e.currentTarget.blur()
                        }}/> 
                    </FormControl>
                    <FormDescription>
                        The helper text of the field <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField control={form.control} name="required" render={({field}) => (
                <FormItem className="flex items-center justify-between border rounded-lg p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>
                            Required
                        </FormLabel>
                        <FormDescription>
                            The helper text of the field <br/> It will be displayed above the field
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />


        </form>
    </Form>
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
  
    return (
      <div className="flex flex-col gap-0.5 w-full"> 
        <Label className="mb-1.5"> 
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4"/>
            <span>Pick a date</span>
        </Button>
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem] mt-1"> 
            {helperText}
          </p>
        )}
      </div>
    );
  }

function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: { elementInstance: FormElementInstance; submitValue?: SubmitFunction; isInvalid?:boolean; defaultValue?: string }) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    },[isInvalid])
  
    return (
      <div className="flex flex-col gap-1 w-full"> 
        <Label className={cn(error && "text-red-500")}> 
          {label}
          {required && " *"}
        </Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", error && "border-red-500")}>
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (!submitValue) return;
                    const value = selectedDate ? selectedDate.toUTCString() : ""; // Ensure value is always a string
                    const valid = DateFieldFormElement.validate(element, value); // Validate with a consistent string
                    setError(!valid);
                    submitValue(element.id, value);
                }}
                initialFocus
            />

            </PopoverContent>
        </Popover>
        {helperText && (
          <p className={cn("text-muted-foreground text-[0.8rem] mt-1", error && "text-color-500")}> 
            {helperText}
          </p>
        )}
      </div>
    );
  }
  