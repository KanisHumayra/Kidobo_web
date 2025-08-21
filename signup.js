(function(){
	function $(id){ return document.getElementById(id); }

	async function sha256Hex(text){
		const enc = new TextEncoder();
		const data = enc.encode(text);
		const buf = await crypto.subtle.digest('SHA-256', data);
		return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
	}

	$('signupForm').addEventListener('submit', async (e)=>{
		e.preventDefault();
		const name = $('parentName').value.trim();
		const email = $('parentEmail').value.trim().toLowerCase();
		const pass = $('parentPassword').value;
		const conf = $('confirmPassword').value;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailRegex.test(email)){ alert('Enter a valid email'); return; }
		if(pass.length < 8 || !/[0-9]/.test(pass) || !/[!@#$%^&*]/.test(pass)){ alert('Password must be 8+ chars with a number and symbol'); return; }
		if(pass !== conf){ alert('Passwords do not match'); return; }

		let parents = [];
		try { parents = JSON.parse(localStorage.getItem('kidoboParents')) || []; } catch(e) {}
		if (parents.find(p => p.email === email)) { alert('Email already registered'); return; }

		const salt = Math.random().toString(36).slice(2) + Date.now();
		const passwordHash = await sha256Hex(pass + ':' + salt);
		const parent = { id: Date.now(), name, email, salt, passwordHash, createdAt: new Date().toISOString() };
		parents.push(parent);
		localStorage.setItem('kidoboParents', JSON.stringify(parents));

		localStorage.setItem('kidoboCurrentUser', JSON.stringify({ id: parent.id, type: 'parent', name, email, createdAt: parent.createdAt }));
		window.location.href = 'parent.html';
	});
})(); 