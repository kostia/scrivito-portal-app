import { registerIconFont } from 'scrivito'
import fontUrl from 'bootstrap-icons/font/fonts/bootstrap-icons.woff2'

export function configureIconFont() {
  registerIconFont({
    name: 'bootstrap-icons',
    prefix: 'bi-',
    fontUrl,
    codepoints: () => import('bootstrap-icons/font/bootstrap-icons.json'),
  })
}
