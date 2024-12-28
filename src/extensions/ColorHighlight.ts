import { Mark } from '@tiptap/core'

export interface ColorHighlightOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    colorHighlight: {
      setHighlight: (color: string) => ReturnType
      unsetHighlight: () => ReturnType
    }
  }
}

export const ColorHighlight = Mark.create<ColorHighlightOptions>({
  name: 'colorHighlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      color: {
        default: '#fef08a', // Default yellow highlight
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark[data-color]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setHighlight:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { color })
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})