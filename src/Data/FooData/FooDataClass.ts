import { provideDataClass } from 'scrivito'

export const FooData = provideDataClass('FooData', {
  attributes: {
    _id: ['string', { title: 'ID' }],
    bar: ['string', { title: 'Bar' }],
  },
  connection: {
    get: async (id) => ({ _id: id, bar: 'Bar' }),
    index: async () => ({
      results: [{ _id: '12345678', bar: 'Bar' }],
    }),
  },
})
