export interface SciApp {
  id: string
  name: string
  type: string
}

export const sciApps: SciApp[] = [
  {
    id: "qe_test",
    name: "Quantum Espresso - bandgap",
    type: "single",
  },
  {
    id: "qe_dos",
    name: "Quantum Espresso - dos",
    type: "single",
  },
  {
    id: "siesta",
    name: "SIESTA(not yet)",
    type: "single",
  },
]
