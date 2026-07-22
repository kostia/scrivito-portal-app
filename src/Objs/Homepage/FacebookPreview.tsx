import { Obj } from 'scrivito'

export function FacebookPreview({ page }: { page: Obj }) {
  const title = page.get('contentTitle') as string
  const facebookAppId = page.get('siteFacebookAppId') as string

  return (
    <div
      style={{
        border: '1px solid #dddfe2',
        borderRadius: 8,
        overflow: 'hidden',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          height: 120,
          background: '#e9ebee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8a8d91',
          fontSize: 13,
        }}
      >
        og:image preview
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 12, color: '#606770' }}>
          {facebookAppId || 'facebook.com'}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1d2129' }}>
          {title || 'Untitled page'}
        </div>
      </div>
    </div>
  )
}
