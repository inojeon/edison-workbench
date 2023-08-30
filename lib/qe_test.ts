import * as z from "zod"

export const qeTestSchema = z.object({
  SETUP: z.object({
    job_type: z.string(),
    npoints: z.number().int(),
    path: z.string(),
  }),
  SYSTEM: z.object({
    ecutwfc: z.number().int(),
    ecutrho: z.number().int(),
    degauss: z.number(),
    input_dft: z.string(),
    nbnd: z.number().int(),
  }),
  ELECTRONS: z.object({
    conv_thr: z.number(),
    electron_maxstep: z.number().int(),
    mixing_beta: z.number(),
    mixing_mode: z.string(),
    scf_must_converge: z.string(),
    startingwfc: z.string(),
  }),
  K_POINTS_automatic: z.object({
    nk1: z.number().int(),
    nk2: z.number().int(),
    nk3: z.number().int(),
    sk1: z.number().int(),
    sk2: z.number().int(),
    sk3: z.number().int(),
  }),
})
