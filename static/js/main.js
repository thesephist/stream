// Hydrate date and timestamps next to each update to match timestamp to the
// visitor's current time zone.
for (const timestampEl of document.querySelectorAll('.update-t')) {
    const date = new Date(parseInt(timestampEl.getAttribute('data-timestamp')) * 1000);
    timestampEl.querySelector('.datestamp').textContent =
        `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    timestampEl.querySelector('.datestamp').setAttribute('href',
        `/on/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
    timestampEl.querySelector('.clockstamp').textContent =
        `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Dark mode with localStorage persistence
document.querySelector('nav').appendChild((() => {
    const b = document.createElement('button');
    b.textContent = 'light/dark';
    b.style.color = 'var(--secondary-text)';
    b.addEventListener('click', () => {
        window.localStorage.setItem(
            'colorscheme',
            currentlyPrefersDark() ? 'light' : 'dark',
        );
        updateScheme();
    });
    return b;
})());

// Tab key in textarea
for (const area of document.querySelectorAll('textarea')) {
    area.addEventListener('keydown', evt => {
        switch (evt.key) {
            case 'Tab': {
                const idx = evt.target.selectionStart;
                if (idx == null) return;
                evt.preventDefault();
                const val = evt.target.value;
                const front = val.substr(0, idx);
                const back = val.substr(idx);
                evt.target.value = front + '\t' + back;
                evt.target.setSelectionRange(idx + 1, idx + 1);
                break;
            }
            case 'Enter': {
                if (!evt.ctrlKey && !evt.metaKey) return;
                evt.preventDefault();
                evt.target.closest('form').submit();
                break;
            }
        }
    });
}

