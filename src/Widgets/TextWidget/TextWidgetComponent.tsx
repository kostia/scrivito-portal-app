import { provideComponent, ContentTag } from 'scrivito'
import { TextWidget } from './TextWidgetClass'

provideComponent(TextWidget, ({ widget }) => (
  <ContentTag attribute="text" content={widget} tag="div" withStyle />
))
