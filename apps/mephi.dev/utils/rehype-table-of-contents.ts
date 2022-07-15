import { visit } from "unist-util-visit"

export function rehypeTableOfContents() {
  return (tree) => {
    const headers = []

    visit(tree, "element", (node) => {
      if (node.type !== "element") {
        return
      }

      if (![ "h1", "h2", "h3", "h4", "h5", "h6" ].some((name) => name === node.tagName)) {
        return
      }

      headers.push(node)
    })
  }
}
