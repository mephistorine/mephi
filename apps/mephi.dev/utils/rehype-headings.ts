import slug from "slug"
import { visit } from "unist-util-visit"

export function rehypeHeadings() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (![ "h1", "h2", "h3", "h4", "h5", "h6" ].some((name) => name === node.tagName)) {
        return
      }

      const hasUserId = Reflect.has(node.properties, "id")

      if (!hasUserId) {
        node.properties.id = slug(node.children[ 0 ].value)
      }

      const anchorElement = {
        type: "element",
        tagName: "a",
        value: "",
        properties: {
          href: `#${ node.properties.id }`,
          className: "header-anchor"
        },
        children: [
          {
            type: "text",
            value: " ⌗"
          }
        ]
      }
      node.children.push(anchorElement)
    })
  }
}
