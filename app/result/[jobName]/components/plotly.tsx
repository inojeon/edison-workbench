import React from "react"
import Plotly from "plotly.js"
import createPlotlyComponent from "react-plotly.js/factory"

const Plot = createPlotlyComponent(Plotly)

interface RowDataProps {
  rowData: string
}

function getDosPlotData(rowData: string) {
  const lines = rowData.split("\n")
  let x = []
  let y = []

  for (let index = 1; index < lines.length; index++) {
    const line = lines[index]
    x.push(parseFloat(line.trim().split(/\s+/g)[0]))
    y.push(parseFloat(line.trim().split(/\s+/g)[1]))
  }
  return [
    {
      name: "DoS",
      mode: "lines",
      line: {
        color: "rgb(55, 128, 191)",
      },
      x,
      y,
    },
  ]
}

export function DosPlot({ rowData }: RowDataProps) {
  const layout = {
    margin: { b: 40, l: 50, r: 20, t: 20 },
    paper_bgcolor: "rgb(255,255,255)",
    plot_bgcolor: "rgb(229,229,229)",
    // showlegend: false,
    xaxis: {
      gridcolor: "rgb(255,255,255)",
      showgrid: true,
      mirror: "ticks" as "ticks",
      showline: true,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      zeroline: false,
    },
    yaxis: {
      gridcolor: "rgb(255,255,255)",
      showgrid: true,
      showline: true,
      showticklabels: true,
      mirror: "ticks" as "ticks",
      tickcolor: "rgb(127,127,127)",
      title: "Energy(eV)",
      zeroline: false,
      gridwidth: 2,
    },
    showlegend: false,
  }
  const config = { responsive: true, displayModeBar: false }

  return (
    <Plot
      data={getDosPlotData(rowData)}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export function BandGapPlot({ rowData }: RowDataProps) {
  const lineData = JSON.parse(rowData).datas.map((data: any) => ({
    ...data,
    mode: "lines",
    line: {
      color: "rgb(55, 128, 191)",
    },
    hovertemplate: "%{y:.3f} eV<extra></extra>",
  }))

  const layout = {
    margin: { b: 40, l: 50, r: 20, t: 20 },
    paper_bgcolor: "rgb(255,255,255)",
    plot_bgcolor: "rgb(229,229,229)",
    xaxis: {
      tickmode: "array" as "array",
      tickvals: JSON.parse(rowData).special_xcoords,
      ticktext: JSON.parse(rowData).labels,
      gridcolor: "rgb(255,255,255)",
      showgrid: true,
      mirror: "ticks" as "ticks",
      showline: true,
      showticklabels: true,
      tickcolor: "rgb(127,127,127)",
      zeroline: false,
    },
    yaxis: {
      gridcolor: "rgb(255,255,255)",
      showgrid: true,
      showline: true,
      showticklabels: true,
      mirror: "ticks" as "ticks",
      tickcolor: "rgb(127,127,127)",
      title: "Energy(eV)",
      zeroline: false,
      gridwidth: 2,
    },
    showlegend: false,
  }
  const config = { responsive: true, displayModeBar: false }

  return (
    <Plot
      data={lineData}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
