import { provideEditingConfig } from 'scrivito'
import { IconWidget } from './IconWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(IconWidget, {
  title: 'Icon',
  thumbnail: Thumbnail,
  attributes: {
    icon: {
      title: 'Icon',
      editor: 'iconPicker',
      options: { iconFont: 'bootstrap-icons', defaultValue: 'box' },
    },
    alignment: {
      title: 'Alignment',
      description: 'A icon list widget ignores this setting. Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    link: {
      title: 'Link (optional)',
      description: 'The link where this icon should lead.',
    },
    size: {
      title: 'Size',
      description: 'Default: 150%',
      values: [
        { value: 'bi-1x', title: '100%' },
        { value: 'bi-2x', title: '150%' },
        { value: 'bi-3x', title: '200%' },
        { value: 'bi-4x', title: '250%' },
        { value: 'bi-5x', title: '300%' },
      ],
    },
  },
  properties: ['icon', 'size', 'alignment', 'link'],
  initialContent: {
    icon: 'bi-box',
    size: 'bi-2x',
    alignment: 'left',
  },
})
