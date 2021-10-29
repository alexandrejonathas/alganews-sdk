import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function getEditorDescription (editorCreationdate: Date) {
    const distance = formatDistance(editorCreationdate, new Date(), {
        locale: ptBR
    })
    return `Editor há ${distance}`
}