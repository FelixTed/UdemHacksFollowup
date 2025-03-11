async function fetch_demo()
{
	// Request the Reddit URL and save the response in "resp"
	const resp = await fetch('https://www.drugs.com/mtm/tylenol-with-codeine-3.html');

	// Use the .json() method to parse the response as JSON object
	console.log(await resp.json());
}

fetch_demo();