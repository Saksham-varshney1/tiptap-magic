import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ColorHighlight } from '../extensions/ColorHighlight'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { Highlighter } from 'lucide-react'
import { useToast } from './ui/use-toast'

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#fef08a' },
  { name: 'Green', value: '#bbf7d0' },
  { name: 'Blue', value: '#bfdbfe' },
  { name: 'Pink', value: '#fbcfe8' },
]

export const TiptapEditor = () => {
  const { toast } = useToast()
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      ColorHighlight,
    ],
    content: '<p>Welcome to the editor! Try highlighting some text.</p>',
    onUpdate: ({ editor }) => {
      console.log('Content updated:', editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const applyHighlight = (color: string) => {
    editor.chain().focus().setHighlight(color).run()
    toast({
      title: "Highlight Applied",
      description: "Text has been highlighted with the selected color.",
      duration: 2000,
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="border-b pb-4 flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Highlighter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {HIGHLIGHT_COLORS.map((color) => (
              <DropdownMenuItem
                key={color.value}
                onClick={() => applyHighlight(color.value)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="prose prose-sm w-full max-w-none">
        <EditorContent editor={editor} className="min-h-[200px] border rounded-md p-4" />
      </div>
    </div>
  )
}