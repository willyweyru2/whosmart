export async function GET(req, { params }) {
  const id = params.id;
  const res = await fetch(`http://localhost:5000/levels/${id}`);
  const data = await res.json();

  return Response.json(data);
}
