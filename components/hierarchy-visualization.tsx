"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface HierarchyNode {
  id: string
  name: string
  type: "qernex" | "qluster" | "qernium"
  color?: string
  children?: HierarchyNode[]
}

interface HierarchyVisualizationProps {
  data: HierarchyNode
  onNodeClick?: (node: HierarchyNode) => void
  width?: number
  height?: number
  fullscreen?: boolean
}

export function HierarchyVisualization({
  data,
  onNodeClick,
  width = 800,
  height = 600,
  fullscreen = false,
}: HierarchyVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width, height })

  useEffect(() => {
    if (!svgRef.current) return

    // Actualizar dimensiones basadas en el contenedor
    const container = svgRef.current.parentElement
    if (container) {
      const { width, height } = container.getBoundingClientRect()
      setDimensions({ width, height })
    }

    // Limpiar SVG
    d3.select(svgRef.current).selectAll("*").remove()

    // Crear el árbol jerárquico
    const root = d3.hierarchy(data)

    // Calcular posiciones
    const treeLayout = d3.tree<HierarchyNode>().size([dimensions.height * 0.9, dimensions.width * 0.9])
    treeLayout(root)

    // Crear el SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .call(
        d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.1, 3])
          .on("zoom", (event) => {
            g.attr("transform", event.transform)
          }),
      )

    // Grupo principal con transformación inicial
    const g = svg.append("g").attr("transform", `translate(${dimensions.width * 0.05}, ${dimensions.height * 0.05})`)

    // Crear enlaces
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal<d3.HierarchyPointLink<HierarchyNode>, d3.HierarchyPointNode<HierarchyNode>>()
          .x((d) => d.y)
          .y((d) => d.x),
      )
      .attr("fill", "none")
      .attr("stroke", "#4B5563")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)

    // Crear nodos
    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y}, ${d.x})`)
      .on("click", (event, d) => {
        event.stopPropagation()
        if (onNodeClick && d.data) {
          onNodeClick(d.data)
        }
      })

    // Añadir círculos a los nodos
    nodes
      .append("circle")
      .attr("r", (d) => (d.data.type === "qernex" ? 12 : d.data.type === "qluster" ? 10 : 8))
      .attr("fill", (d) => {
        if (d.data.type === "qernex") return "#22d3ee"
        if (d.data.type === "qluster") return "#a78bfa"
        return "#ec4899"
      })
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", (d) => (d.data.type === "qernex" ? 14 : d.data.type === "qluster" ? 12 : 10))
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", (d) => (d.data.type === "qernex" ? 12 : d.data.type === "qluster" ? 10 : 8))
      })

    // Añadir etiquetas a los nodos
    nodes
      .append("text")
      .attr("dy", (d) => (d.children ? -18 : 4))
      .attr("dx", (d) => (d.children ? 0 : 14))
      .attr("text-anchor", (d) => (d.children ? "middle" : "start"))
      .attr("font-size", (d) => (d.data.type === "qernex" ? "14px" : d.data.type === "qluster" ? "12px" : "11px"))
      .attr("fill", (d) => {
        if (d.data.type === "qernex") return "#22d3ee"
        if (d.data.type === "qluster") return "#a78bfa"
        return "#ec4899"
      })
      .text((d) => d.data.name)
      .attr("pointer-events", "none")

    // Añadir botón de reset zoom
    if (fullscreen) {
      svg
        .append("g")
        .attr("transform", `translate(${dimensions.width - 40}, 40)`)
        .append("circle")
        .attr("r", 16)
        .attr("fill", "#0f172a")
        .attr("stroke", "#22d3ee")
        .attr("stroke-width", 1.5)
        .attr("cursor", "pointer")
        .on("click", () => {
          svg
            .transition()
            .duration(750)
            .call(d3.zoom<SVGSVGElement, unknown>().transform as any, d3.zoomIdentity)
        })

      svg
        .select("g:last-of-type")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .attr("fill", "#22d3ee")
        .attr("font-size", "18px")
        .attr("pointer-events", "none")
        .text("⟲")
    }

    // Función para manejar el resize
    const handleResize = () => {
      if (!svgRef.current || !svgRef.current.parentElement) return

      const container = svgRef.current.parentElement
      const { width, height } = container.getBoundingClientRect()
      setDimensions({ width, height })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [data, dimensions.width, dimensions.height, onNodeClick, fullscreen])

  return <svg ref={svgRef} className="w-full h-full" />
}
