import { ContentTag, provideComponent, useData } from 'scrivito'
import { DataColumnListWidget } from './DataColumnListWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataColumnListWidget, ({ widget }) => {
  const dataScope = useData()

  if (dataScope.isEmpty()) {
    return <EditorNote>The data column list is empty.</EditorNote>
  }

  const columnsCount = widget.get('columnsCount') || '2'

  return (
    <div className={`row row-cols-1 row-cols-md-${columnsCount}`}>
      {dataScope.take().map((dataItem) => (
        <ContentTag
          content={widget}
          attribute="content"
          className="col"
          dataContext={dataItem}
          key={dataItem.id()}
        />
      ))}
    </div>
  )
})
