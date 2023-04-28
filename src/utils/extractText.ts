const extractText = (html: string) => html.replace(/<[^>]+>/g, '')

export default extractText