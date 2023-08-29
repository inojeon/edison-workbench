export interface SciApp {
  id: string
  name: string
  type: string
}

export const sciApps: SciApp[] = [
  {
    id: "qe_test",
    name: "Quantum Espresso",
    type: "single",
  },
  {
    id: "qe_test_mpi",
    name: "Quantum Espresso - MPI",
    type: "parallel",
  },
  {
    id: "siesta",
    name: "SIESTA",
    type: "single",
  },
]
