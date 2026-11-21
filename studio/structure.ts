import type {StructureResolver} from 'sanity/structure'

export const SINGLETONS = new Set(['profile'])

/** Profile opens as one fixed document; everything else lists normally. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Profile')
        .id('profile')
        .child(S.document().schemaType('profile').documentId('profile')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.has(item.getId() ?? '')),
    ])
