import { configureContentBrowser, Obj } from 'scrivito'

export function configureScrivitoContentBrowser() {
  configureContentBrowser({
    filters: ({ _validObjClasses }) => {
      if (_validObjClasses?.[1]) return filtersForObjClasses(_validObjClasses)
      if (_validObjClasses?.[0]) return filterForObjClass(_validObjClasses[0])
      return defaultFilters()
    },
  })
}

interface FilterOption {
  field: string
  icon: string
  title: string
  value: string
}

function filterForObjClass(objClass: string) {
  return {
    _objClass: {
      options: {
        [objClass]: {
          ...filterOptionForObjClass(objClass),
          selected: true,
        },
      },
    },
    ...moreFilters(),
  }
}

function filtersForObjClasses(objClasses: string[]) {
  return {
    _objClass: {
      options: {
        All: {
          title: 'All',
          icon: 'folder',
          field: '_objClass',
          value: objClasses,
          selected: true,
        },
        ...objClasses.reduce(
          (result, value) => {
            result[value] = filterOptionForObjClass(value)
            return result
          },
          {} as { [key: string]: FilterOption },
        ),
      },
    },
    ...moreFilters(),
  }
}

function defaultFilters() {
  return {
    _objClass: {
      options: {
        All: {
          title: 'All',
          icon: 'folder',
          query: Obj.all(),
          selected: true,
        },
        Image: filterOptionForObjClass('Image'),
        Pages: {
          title: 'Pages',
          icon: 'sheet',
          field: '_objClass',
          value: PAGES,
          options: PAGES.reduce(
            (result, value) => {
              result[value] = filterOptionForObjClass(value)
              return result
            },
            {} as { [key: string]: FilterOption },
          ),
        },
        Download: filterOptionForObjClass('Download'),
        Video: filterOptionForObjClass('Video'),
        Font: filterOptionForObjClass('Font'),
      },
    },
    ...moreFilters(),
  }
}

function moreFilters() {
  return {
    _modification: {
      title: 'Changed',
      type: 'checkbox' as const,
      expanded: true,
      field: '_modification',
      options: {
        New: {
          value: 'new',
        },
        Edited: {
          value: 'edited',
        },
      },
    },
    _language: {
      title: 'Language',
      type: 'radioButton' as const,
      field: '_language',
      options: {
        en: { title: 'English', value: 'en' },
        de: { title: 'German', value: 'de' },
        fr: { title: 'French', value: 'fr' },
        it: { title: 'Italian', value: 'it' },
      },
    },
    layoutMainBackgroundColor: {
      title: 'Main background color',
      type: 'radioButton' as const,
      field: 'layoutMainBackgroundColor',
      options: BACKGROUND_COLORS.reduce(
        (result, value) => {
          result[value] = { title: titleize(value), value }
          return result
        },
        {} as { [key: string]: { title: string; value: string } },
      ),
    },
    tags: {
      title: 'Keywords',
      type: 'checkbox' as const,
      field: 'tags',
      options: TAGS.reduce(
        (result, value) => {
          result[value] = { title: titleize(value), value }
          return result
        },
        {} as { [key: string]: { title: string; value: string } },
      ),
    },
    robotsIndex: {
      title: 'Indexed by search engines',
      type: 'radioButton' as const,
      options: {
        indexed: {
          title: 'Indexed',
          query: Obj.where('robotsIndex', 'equals', true),
        },
        notIndexed: {
          title: 'Not indexed',
          query: Obj.where('robotsIndex', 'equals', false),
        },
      },
    },
    layoutShowLeftSidebar: {
      title: 'Sidebar',
      type: 'radioButton' as const,
      options: {
        withLeftSidebar: {
          title: 'With left sidebar',
          query: Obj.where('layoutShowLeftSidebar', 'equals', true),
        },
      },
    },
  }
}

function titleize(value: string) {
  const withSpaces = value.replace(/-/g, ' ')
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

function filterOptionForObjClass(
  objClass: keyof typeof FILTER_PRESENTATIONS | string,
): FilterOption {
  const filterPresentation = isFilterPresentationsKey(objClass)
    ? FILTER_PRESENTATIONS[objClass]
    : {
        title: objClass,
        icon: 'question',
      }

  return { field: '_objClass', value: objClass, ...filterPresentation }
}

function isFilterPresentationsKey(
  objClass: string,
): objClass is keyof typeof FILTER_PRESENTATIONS {
  return Object.keys(FILTER_PRESENTATIONS).includes(objClass)
}

// Icons are listed at https://www.scrivito.com/js-sdk/configureContentBrowser#filter-definition
const FILTER_PRESENTATIONS = {
  Download: { title: 'Downloads', icon: 'pdf' },
  Font: { title: 'Fonts', icon: 'pen' },
  Homepage: { title: 'Homepage', icon: 'inbox' },
  Image: { title: 'Images', icon: 'image' },
  Page: { title: 'Standard pages', icon: 'sheet' },
  Product: { title: 'Products', icon: 'suitcase' },
  ProductCategory: { title: 'Product categories', icon: 'relation' },
  ProductsOverview: { title: 'Products overviews', icon: 'relation' },
  Redirect: { title: 'Redirects', icon: 'link' },
  Video: { title: 'Videos', icon: 'video' },
}

const BACKGROUND_COLORS = [
  'white',
  'primary',
  'secondary',
  'light-grey',
  'middle-grey',
  'dark-grey',
  'transparent',
  'success',
  'info',
  'warning',
  'danger',
]

const TAGS = ['background', 'icon', 'logo', 'people', 'portrait', 'product']

const PAGES = [
  'Page',
  'Homepage',
  'Product',
  'ProductCategory',
  'ProductsOverview',
  'Redirect',
]
