export interface SearchResponse {
  start: number,
  num_found: number,
  docs: Doc[],
}

export interface Doc {
  cover_i: number,
  has_fulltext: boolean,
  edition_count: number,
  cover_edition_key: string,
  title: string,
  author_name: string[],
  first_publish_year: number,
  key: string,
  ia: string[],
  author_key: string[],
  public_scan_b: boolean
}

export interface AuthorLink {
  author: {
    key: string
  },
  type: {
    key: string
  }
}

export interface Book {
  title: string,
  key: string,
  authors: AuthorLink[],
  type: {
    key: string
  },
  description: string,
  covers: number[],
  subject_places: string[],
  subjects: string[],
  subject_people: string[],
  subject_times: string[],
  location: string,
  latest_revision: number,
  revision: number,
  created: {
    type: string,
    value: string
  },
  last_modified: {
    type: string,
    value: string
  }
}

export interface Link {
  title: string,
  url: string,
  type: {
    key: string
  }
}

export interface Author {
  birth_date: string,
  photos: number[],
  links: Link[],
  remote_ids: {
    viaf: string,
    wikidata: string,
    isni: string,
    amazon: string,
    goodreads: string,
    bookbrainz: string,
    musicbrainz: string,
    imdb: string,
    lc_naf: string,
    librarything: string,
    opac_sbn: string
  },
  type: {
    key: string
  },
  key: string,
  source_records: string[],
  death_date: string,
  personal_name: string,
  bio: {
    type: string,
    value: string
  },
  alternate_names: string[],
  name: string,
  latest_revision: 61,
  revision: 61,
  created: {
    type: string,
    value: string
  },
  last_modified: {
    type: string,
    value: string
  }
}


