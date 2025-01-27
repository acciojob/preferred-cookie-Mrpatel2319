document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('preferencesForm');
    const fontSizeInput = document.getElementById('fontsize');
    const fontColorInput = document.getElementById('fontcolor');

    // Load preferences from cookies
    const loadPreferences = () => {
        const fontSize = getCookie('fontsize') || '16';
        const fontColor = getCookie('fontcolor') || '#000000';

        document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
        document.documentElement.style.setProperty('--fontcolor', fontColor);

        fontSizeInput.value = fontSize;
        fontColorInput.value = fontColor;
    };

    // Save preferences to cookies
    const savePreferences = (event) => {
        event.preventDefault();

        const fontSize = fontSizeInput.value;
        const fontColor = fontColorInput.value;

        setCookie('fontsize', fontSize, 365);
        setCookie('fontcolor', fontColor, 365);

        loadPreferences();
    };

    // Set a cookie
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    // Get a cookie
    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    form.addEventListener('submit', savePreferences);

    loadPreferences();
});