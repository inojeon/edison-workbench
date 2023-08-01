export interface Preset {
  id: string
  name: string
  path: string
}

export const presets: Preset[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "caffein.mol",
    path: "data/mol/caffein.mol",
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "H.mol",
    path: "data/mol/H.mol",
  },
  {
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "H0_2.mol",
    path: "data/mol/HO_2.mol",
  },
]

export const samplePresets: Preset[] = [
  {
    id: "cc198b13-4933-43aa-977e-dcd95fa30770",
    name: "ho.mol",
    path: "data/mol/ho.mol",
  },
  {
    id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
    name: "TiO2.mol",
    path: "data/mol/TiO2.mol",
  },
]
