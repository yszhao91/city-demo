

export async function fetchURL(url, opts = {}) {
  console.log(url)
  opts.method = opts.method || "POST"
  const res = await fetch(url, opts)
  return res;
}

export async function post(url, opts = {}) {
  opts.method = "POST"
  const res = await fetch(url, opts)
  return res;
}

export async function get(url, opts = {}) {
  opts.method = "GET"
  const res = await fetch(url, opts)
  return res;
}
