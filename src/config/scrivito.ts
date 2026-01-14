import { configurePreviewSizes, configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { getJrPlatformConfig } from '../privateJrPlatform/getJrPlatformConfig'
import { getJrPlatformInstanceId } from '../privateJrPlatform/multiTenancy'

export function configureScrivito(options?: { priority?: 'background' }) {
  const instanceId = scrivitoInstanceId()
  if (!instanceId) throw new Error('No Scrivito instance ID found!')

  configure({
    responsiveBreakpoints: {
      mobileMaxWidth: 767,
      tabletMaxWidth: 1023,
    },
    activateDataIntegration: true,
    adoptUi: 'http://localhost:8090',
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?instanceId=${instanceId}`,
    instanceId,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    ...(import.meta.env.PRIVATE_JR_PLATFORM
      ? getJrPlatformConfig({ assetUrlBase: 'http://localhost:8091' })
      : {
          unstable: {
            assetUrlBase: 'http://localhost:8091',
            trustedUiOrigins: ['http://localhost:8090'],
          },
        }),
    ...options,
  })
}

configurePreviewSizes([
  { title: 'iPhone 11', width: 414 }, // → Mobile group
  { title: 'iPad Mini', width: 768 }, // → Tablet group
  { title: 'iPad Pro', width: 834 }, // → Tablet group
  { title: 'DDDesktop', width: null }, // → Desktop group
])

function scrivitoInstanceId(): string | null {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformInstanceId()

  return import.meta.env.SCRIVITO_INSTANCE_ID
}
