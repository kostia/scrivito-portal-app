import { provideColumnWidgetComponents } from 'scrivito'
import './ColumnContainerWidget.scss'

provideColumnWidgetComponents({
  container: ({ mode, alignment, gutters, responsive, columns }) => {
    if (!columns.length) return null

    const isFlex = mode === 'flex'
    const classNames = [`align-items-${alignment}`]

    if (isFlex) {
      classNames.push(
        'column-container-widget--flex-wrapper',
        responsive ? 'd-md-flex' : 'd-flex',
      )
    } else {
      classNames.push('row')
      if (!gutters) classNames.push('g-0')
    }

    return (
      <div className={classNames.join(' ')}>
        {columns.map(({ size, grow, widgetsCount, renderContent }) => {
          const columnClassNames = []

          if (isFlex) {
            columnClassNames.push(
              ...(responsive ? ['my-md-0', 'my-2', 'mx-md-2'] : ['mx-2']),
            )
            if (grow) columnClassNames.push('flex-grow-1')
            if (alignment === 'stretch' && widgetsCount < 2) {
              columnClassNames.push(responsive ? 'd-md-flex' : 'd-flex')
            }
          } else {
            columnClassNames.push(responsive ? `col-md-${size}` : `col-${size}`)
          }

          return renderContent({ className: columnClassNames.join(' ') })
        })}
      </div>
    )
  },
})
