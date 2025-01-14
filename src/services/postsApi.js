import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts?_limit='
const postsPerPage = 10

export async function getPosts(page) {
  const data = await axios.get(`${url}${postsPerPage * page.value}`)

  if (data.request.status !== 200) throw new Error('AAAAAAAAA!')

  return data.data
}
