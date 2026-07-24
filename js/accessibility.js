(function () {
	var STORAGE_KEY = 'a11yPrefs';

	function loadPrefs() {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
		} catch (e) {
			return {};
		}
	}

	function savePrefs(prefs) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
		} catch (e) { /* ignore */ }
	}

	var prefs = loadPrefs();
	var fontStep = typeof prefs.fontStep === 'number' ? prefs.fontStep : 0;
	var dark = !!prefs.dark;
	var contrast = !!prefs.contrast;

	function applyFont() {
		document.documentElement.style.fontSize = fontStep === 0 ? '' : (100 + fontStep * 12.5) + '%';
	}

	function applyDark() {
		document.documentElement.classList.toggle('a11y-dark', dark);
	}

	function applyContrast() {
		document.documentElement.classList.toggle('a11y-contrast', contrast);
	}

	function persist() {
		savePrefs({ fontStep: fontStep, dark: dark, contrast: contrast });
	}

	// Apply saved prefs immediately (before widget exists) to avoid flash of unstyled content.
	applyFont();
	applyDark();
	applyContrast();

	var speaking = false;

	function stopReading() {
		if ('speechSynthesis' in window) {
			window.speechSynthesis.cancel();
		}
		speaking = false;
		var btn = document.getElementById('a11y-read-btn');
		if (btn) {
			btn.classList.remove('a11y-active');
			btn.querySelector('span').textContent = 'Ler página';
			btn.querySelector('i').className = 'fa-solid fa-volume-high';
		}
	}

	function toggleReading() {
		if (!('speechSynthesis' in window)) {
			alert('Seu navegador não tem suporte à leitura de texto em voz alta.');
			return;
		}
		if (speaking) {
			stopReading();
			return;
		}
		var main = document.querySelector('main') || document.body;
		var text = main.innerText.replace(/\s+/g, ' ').trim();
		if (!text) {
			return;
		}
		var utter = new SpeechSynthesisUtterance(text);
		utter.lang = 'pt-BR';
		utter.onend = stopReading;
		utter.onerror = stopReading;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(utter);
		speaking = true;
		var btn = document.getElementById('a11y-read-btn');
		if (btn) {
			btn.classList.add('a11y-active');
			btn.querySelector('span').textContent = 'Parar leitura';
			btn.querySelector('i').className = 'fa-solid fa-stop';
		}
	}

	function buildWidget() {
		var wrap = document.createElement('div');
		wrap.className = 'a11y-widget';
		wrap.innerHTML =
			'<button type="button" class="a11y-toggle" id="a11y-toggle-btn" aria-label="Abrir menu de acessibilidade" aria-expanded="false">' +
			'<i class="fa-solid fa-universal-access"></i>' +
			'</button>' +
			'<div class="a11y-panel" id="a11y-panel" hidden>' +
			'<span class="a11y-panel-title">Acessibilidade</span>' +
			'<div class="a11y-row">' +
			'<button type="button" class="a11y-btn" id="a11y-font-dec" aria-label="Diminuir fonte"><i class="fa-solid fa-minus"></i> Fonte</button>' +
			'<button type="button" class="a11y-btn" id="a11y-font-inc" aria-label="Aumentar fonte"><i class="fa-solid fa-plus"></i> Fonte</button>' +
			'</div>' +
			'<button type="button" class="a11y-btn a11y-btn-wide" id="a11y-dark-btn"><i class="fa-solid fa-moon"></i> <span>Modo escuro</span></button>' +
			'<button type="button" class="a11y-btn a11y-btn-wide" id="a11y-contrast-btn"><i class="fa-solid fa-circle-half-stroke"></i> <span>Alto contraste</span></button>' +
			'<button type="button" class="a11y-btn a11y-btn-wide" id="a11y-read-btn"><i class="fa-solid fa-volume-high"></i> <span>Ler página</span></button>' +
			'<button type="button" class="a11y-btn a11y-btn-wide a11y-reset" id="a11y-reset-btn"><i class="fa-solid fa-arrow-rotate-left"></i> <span>Redefinir</span></button>' +
			'</div>';
		document.body.appendChild(wrap);

		var toggleBtn = document.getElementById('a11y-toggle-btn');
		var panel = document.getElementById('a11y-panel');
		var darkBtn = document.getElementById('a11y-dark-btn');
		var contrastBtn = document.getElementById('a11y-contrast-btn');

		function syncToggleStates() {
			darkBtn.classList.toggle('a11y-active', dark);
			contrastBtn.classList.toggle('a11y-active', contrast);
		}
		syncToggleStates();

		function closePanel() {
			panel.setAttribute('hidden', '');
			toggleBtn.setAttribute('aria-expanded', 'false');
		}

		toggleBtn.addEventListener('click', function () {
			var open = panel.hasAttribute('hidden');
			if (open) {
				panel.removeAttribute('hidden');
			} else {
				panel.setAttribute('hidden', '');
			}
			toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
		});

		document.addEventListener('click', function (event) {
			if (!wrap.contains(event.target)) {
				closePanel();
			}
		});

		document.getElementById('a11y-font-inc').addEventListener('click', function () {
			fontStep = Math.min(fontStep + 1, 3);
			applyFont();
			persist();
			closePanel();
		});
		document.getElementById('a11y-font-dec').addEventListener('click', function () {
			fontStep = Math.max(fontStep - 1, -1);
			applyFont();
			persist();
			closePanel();
		});
		darkBtn.addEventListener('click', function () {
			dark = !dark;
			applyDark();
			syncToggleStates();
			persist();
			closePanel();
		});
		contrastBtn.addEventListener('click', function () {
			contrast = !contrast;
			applyContrast();
			syncToggleStates();
			persist();
			closePanel();
		});
		document.getElementById('a11y-read-btn').addEventListener('click', function () {
			toggleReading();
			closePanel();
		});
		document.getElementById('a11y-reset-btn').addEventListener('click', function () {
			fontStep = 0;
			dark = false;
			contrast = false;
			applyFont();
			applyDark();
			applyContrast();
			syncToggleStates();
			persist();
			stopReading();
			closePanel();
		});

		window.addEventListener('beforeunload', stopReading);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', buildWidget);
	} else {
		buildWidget();
	}
})();
