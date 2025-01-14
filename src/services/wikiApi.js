const url = 'https://en.wikipedia.org/w/api.php?format=json&origin=*'
const searchParams = '&list=search&prop=info&inprop=url&action=query&srlimit=80&srsearch='
const pageParams = '&action=parse&page='

export async function getSearchResults(query) {
  const res = await fetch(`${url}${searchParams}${query}`)

  if (!res.ok) throw new Error("Couldn't fetch search data.")

  const data = await res.json()

  if (data.query.search.length === 0) throw new Error(`${query} couldn't be found.`)

  return data.query.search
}

export async function getParsedPage(title) {
  const res = await fetch(`${url}${pageParams}${title}`)

  if (!res.ok) throw new Error("Couldn't get page code.")

  const data = await res.json()

  if (!data.parse) throw new Error(`Page '${title}' couldn't be found.`)

  return data.parse.text['*']
}
