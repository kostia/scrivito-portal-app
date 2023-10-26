import { provideEditingConfig } from 'scrivito'
import { UpdateBug } from './UpdateBugDataClass'

provideEditingConfig(UpdateBug, {
  title: 'Update Bug123',
  attributes: {
    updateCounter: { title: 'updateCounter' },
  },
})
