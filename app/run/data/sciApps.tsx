export interface SciApp {
  id: string
  name: string
  type: string
}

export const sciApps: SciApp[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Quantum Espresso",
    type: "single",
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Quantum Espresso - MPI",
    type: "parallel",
  },
  {
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "SIESTA",
    type: "single",
  },
]
