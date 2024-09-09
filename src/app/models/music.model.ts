export interface Music {
  id: string,
  title: string,
  link: string
}

export interface NewMusic {
  title: string,
  link: string
}

export interface UpdateMusic {
  id: string;
  title?: string,
  link?: string,
}
