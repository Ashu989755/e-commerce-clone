import React, { useEffect, useState } from 'react';
import "../index.css";

const GoogleTranslate = () => {
    const [languageInitialized, setLanguageInitialized] = useState(false);

    useEffect(() => {
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi,es,de,zh-CN',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    'google_translate_element'
                );

                // Wait for the dropdown to load
                setTimeout(() => {
                    updateDropdownSelection();
                    setLanguageInitialized(true);
                }, 500);
            };
        };

        const updateDropdownSelection = () => {
            const selectElement = document.querySelector('.goog-te-combo');
            if (selectElement) {
                selectElement.value = 'en'; // Default language
                selectElement.addEventListener('change', () => {
                    console.log(`Language changed to: ${selectElement.value}`);
                });
            }
        };

        addGoogleTranslateScript();
    }, []);

    return (
        <div>
            <div id="google_translate_element"></div>
            {!languageInitialized && <p>Loading translator...</p>}
        </div>
    );
};

export default GoogleTranslate;
