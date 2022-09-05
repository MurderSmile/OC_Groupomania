const token = sessionStorage.getItem('token');

function findAll(){
  return fetch('http://localhost:5500/api/posts/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())

  .catch((error) => {
    console.log(error)
  })
}

export default findAll