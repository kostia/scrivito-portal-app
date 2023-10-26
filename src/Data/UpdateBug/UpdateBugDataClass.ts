import { provideDataClass } from 'scrivito'

const localStorageKey = 'foobarUpdateCounter'

export const UpdateBug = provideDataClass('UpdateBug', {
  connection: {
    async get(id) {
      const updateCounter = readUpdateCounter()
      return { _id: '123', updateCounter }
    },
    async index() {
      return { results: ['123'] }
    },
    async update(id, data) {
      const updateCounter = readUpdateCounter()
      const newCounter = updateCounter + '1'
      localStorage.setItem(localStorageKey, newCounter)

      return { _id: '123', updateCounter: newCounter }
    },
  },
})

function readUpdateCounter() {
  return localStorage.getItem(localStorageKey) || '1'
}
