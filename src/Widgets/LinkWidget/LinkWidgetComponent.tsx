import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { LinkWidget } from './LinkWidgetClass'

provideComponent(LinkWidget, ({ widget }) => {
  return (
    <WidgetTag tag="li">
      <ContentTag content={widget} attribute="link" tag="a" />
    </WidgetTag>
  )
})
