export function loadCifFile(content: string) {
  const frm: any = document.getElementById("cristalEditor")
  if (frm) {
    frm.contentWindow.crystalEditor.LoadCifFile(content)
  }
}
