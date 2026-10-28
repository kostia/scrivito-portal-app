import { LinkTag, provideComponent, WidgetTag } from 'scrivito'
import { LinkWidget } from './LinkWidgetClass'

provideComponent(LinkWidget, ({ widget }) => {
  return (
    <WidgetTag tag="li">
      <LinkTag content={widget} attribute="link" />
    </WidgetTag>
  )
})
