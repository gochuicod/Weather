const HandleFetchData = async (query) => {
    const res = await fetch(query)
    const data = await res.json()

    return data
}

export default HandleFetchData