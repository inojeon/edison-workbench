export function loadMolFile(content: string) {
  const frm: any = document.getElementById("cristalEditor")
  if (frm) {
    frm.contentWindow.crystalEditor.LoadMolFile(content)
  }
}
