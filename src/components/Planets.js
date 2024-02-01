import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async ({ queryKey: [ key, page ] }) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
  return res.json()
}
const Planets = () => {
  const [page, setPage] = useState(1)
  const {
    data,
    status,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData } = useQuery(['planets', page], fetchPlanets, {
    keepPreviousData: true,
  })

  return (
    <>
    <h2>Planets</h2>
    {status === "loading" && (
      <div>Loading data...</div>
    )}
    {status === "error" && (
      <div>Error fetching data</div>
    )}
    {status === "success" && (
      <>
      <button
        onClick={() => setPage(old => Math.max(old -1, 1))}
        disabled={page === 1}
      >Previous</button>
      <span>{page}</span>
      <button
        onClick={() => {
          if (!isPreviousData && data.next) {
            setPage(old => old + 1)
          }
        }}
        disabled={isPreviousData || !data?.next}
      >Next</button>
      <div>
        {data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
      </div>
      </>
    )}
    </>
  )
}

export default Planets