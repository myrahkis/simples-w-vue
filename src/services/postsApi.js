import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/posts'
const postsPerPage = 12

export async function getPosts(page) {
  const res = await axios.get(`${url}?_limit=${postsPerPage}&_page=${page.value}`)

  console.log(res.data);

  if (res.request.status !== 200) throw new Error("Couldn't fetch posts.")

  return res.data
}

export async function addPost(post) {
  const res = await axios.post(url, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  // console.log(res);
  if (res.status !== 201) throw new Error("Couldn't add new post.")

  return res.data.body
}
