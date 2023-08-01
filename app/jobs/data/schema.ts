import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})
export const jobSchema = z.object({
  jobId: z.string(),
  name: z.string(),
  status: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  appName: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type Job = z.infer<typeof jobSchema>
