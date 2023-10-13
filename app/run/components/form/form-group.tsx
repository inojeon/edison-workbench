import { JSONSchema4 } from "json-schema"
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"

import { qeTestSchema } from "@/lib/qe_test"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface JsonObjectSchema {
  type: string
  properties: object
  required?: string[]
}

const getObjectProperties = (jsonSchema: JSONSchema4) => {
  let result = []
  if (jsonSchema.properties) {
    for (const [key, value] of Object.entries(jsonSchema.properties)) {
      result.push({
        name: key,
        info: value,
      })
    }
  }
  return result
}

const FormGroup = ({ ...props }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {props.properties &&
          getObjectProperties(props.properties).map((property, key) => (
            <FormField
              key={key}
              control={props.control}
              name={`${props.name}.${property.name}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{property.name}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={
                        property.info.type == "integer" ? "number" : "string"
                      }
                      // defaultValue={property.info.default as string | number}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
      </CardContent>
    </Card>
    // <FormFieldContext.Provider value={{ name: props.name }}>
    // <Controller {...props} />
    // </FormFieldContext.Provider>
  )
}

export default FormGroup
