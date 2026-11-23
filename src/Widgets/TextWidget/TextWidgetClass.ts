import { provideWidgetClass } from 'scrivito'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    style: 'style',
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
