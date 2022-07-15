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

    const ulElement = {
      type: "element",
      tagName: "ul",
      value: "",
      properties: {
        className: "toc-list"
      },
      children: []
    }

    const detailsElement = {
      type: "element",
      tagName: "details",
      value: "",
      properties: {
        id: "table-of-contents"
      },
      children: [
        {
          type: "element",
          tagName: "summary",
          value: "",
          children: [
            {
              type: "text",
              value: "Содержание"
            }
          ]
        },
        ulElement
      ]
    }

    for (const header of headers) {
      const level = parseFloat(header.tagName.replace("h", "")) - 2

      const liEl = {
        type: "element",
        tagName: "li",
        value: "",
        properties: {
          style: {
            marginLeft: `${ level * 20 }px`
          }
        },
        children: [
          {
            type: "element",
            tagName: "a",
            value: "",
            properties: {
              href: header.children.find(c => c.tagName === "a").properties.href
            },
            children: [
              {
                type: "text",
                value: header.children.find(c => c.type === "text").value
              }
            ]
          }
        ]
      }

      ulElement.children.push(liEl)
    }

    tree.children.unshift(detailsElement)
  }
}
