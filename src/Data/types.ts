import { provideDataClass } from 'scrivito'

export interface RawItem {
  _id: string
  [key: string]: unknown
}

export interface DataIndexResponse {
  results: RawItem[]
  count?: number
  continuation?: string
}

export type DataClassAttributes = Parameters<
  typeof provideDataClass
>[1]['attributes']
