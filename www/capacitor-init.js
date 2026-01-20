/**
 * Capacitor iOS Integration
 * This file initializes Capacitor plugins for native iOS functionality
 * Uses global Capacitor object (no build step required)
 */

(function() {
    'use strict';

    // Wait for both DOM and Capacitor to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCapacitor);
    } else {
        initializeCapacitor();
    }

    async function initializeCapacitor() {
        // Check if Capacitor is available and if we're running natively
        if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
            console.log('Running as web app - Capacitor native features disabled');
            return;
        }

        console.log('Initializing iOS native features...');

        try {
            // Get plugin references
            const { StatusBar } = window.Capacitor.Plugins;
            const { SplashScreen } = window.Capacitor.Plugins;
            const { Share } = window.Capacitor.Plugins;
            const { Haptics } = window.Capacitor.Plugins;
            const { Keyboard } = window.Capacitor.Plugins;
            const { App } = window.Capacitor.Plugins;

            // Configure Status Bar for dark theme
            if (StatusBar) {
                await StatusBar.setStyle({ style: 'DARK' });
                await StatusBar.setBackgroundColor({ color: '#1a1a2e' });
            }

            // Hide splash screen after app loads
            if (SplashScreen) {
                await SplashScreen.hide();
            }

            // Listen for app state changes
            if (App) {
                App.addListener('appStateChange', ({ isActive }) => {
                    console.log('App state changed. Is active:', isActive);
                });

                App.addListener('appUrlOpen', (data) => {
                    console.log('App opened with URL:', data);
                });
            }

            // Add haptic feedback to buttons
            if (Haptics) {
                addHapticFeedback(Haptics);
            }

            // Handle keyboard events
            if (Keyboard) {
                setupKeyboardHandling(Keyboard);
            }

            // Add native share functionality
            if (Share) {
                setupNativeShare(Share);
            }

            // Update dark mode to also update status bar
            if (StatusBar) {
                setupDarkModeIntegration(StatusBar);
            }

            console.log('iOS native features initialized successfully');

        } catch (error) {
            console.error('Error initializing iOS features:', error);
        }
    }

    /**
     * Add haptic feedback to all buttons and interactive elements
     */
    function addHapticFeedback(Haptics) {
        document.addEventListener('click', async (e) => {
            const target = e.target.closest('button, .btn, .tab-btn, .icon-btn');
            if (target) {
                try {
                    await Haptics.impact({ style: 'LIGHT' });
                } catch (error) {
                    // Haptics may not be available
                }
            }
        }, true);
    }

    /**
     * Setup keyboard handling for better iOS keyboard experience
     */
    function setupKeyboardHandling(Keyboard) {
        Keyboard.addListener('keyboardWillShow', (info) => {
            document.body.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
        });

        Keyboard.addListener('keyboardWillHide', () => {
            document.body.style.setProperty('--keyboard-height', '0px');
        });

        // Configure keyboard accessory bar
        Keyboard.setAccessoryBarVisible({ isVisible: true }).catch(() => {});
    }

    /**
     * Add native iOS share functionality
     */
    function setupNativeShare(Share) {
        // Create a global share function for use in the app
        window.nativeShare = async (title, text, url) => {
            try {
                await Share.share({
                    title: title || 'Share',
                    text: text || '',
                    url: url || '',
                    dialogTitle: 'Share via'
                });
                return true;
            } catch (error) {
                console.log('Share cancelled or error:', error);
                return false;
            }
        };

        // Enhance existing export functionality to use native share
        window.useNativeShare = true;
    }

    /**
     * Integrate dark mode with native status bar
     */
    function setupDarkModeIntegration(StatusBar) {
        // Watch for dark mode changes
        const darkModeObserver = new MutationObserver(async (mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark-mode');
                    try {
                        await StatusBar.setStyle({
                            style: isDark ? 'DARK' : 'LIGHT'
                        });
                        await StatusBar.setBackgroundColor({
                            color: isDark ? '#1a1a2e' : '#f5f5f5'
                        });
                    } catch (error) {
                        // Status bar update may fail
                    }
                }
            }
        });

        darkModeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Also handle initial dark mode state
        if (document.documentElement.classList.contains('dark-mode')) {
            StatusBar.setStyle({ style: 'DARK' }).catch(() => {});
            StatusBar.setBackgroundColor({ color: '#1a1a2e' }).catch(() => {});
        }
    }

})();
