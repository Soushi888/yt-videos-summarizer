import {json} from "@sveltejs/kit";

export async function GET(req, res) {
	return new Response("Hello from the API");
}

export async function POST({ request }) {
	return json(await request.json());
}