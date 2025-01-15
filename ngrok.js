import ngrok from '@ngrok/ngrok'


(async function () {
	const listener = await ngrok.forward({
		addr: 3000,
		authtoken_from_env: true,
        domain: "weerapongworasitteamza999.ngrok.app",
	});

	console.log(`Ingress established at: ${listener.url()}`);
})();