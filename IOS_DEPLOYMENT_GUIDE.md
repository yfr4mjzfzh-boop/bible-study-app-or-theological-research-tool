# iOS App Deployment Guide
## Bible Study App - iPhone 17 Pro Max

This guide will walk you through building and deploying your Bible Study app as a native iOS application on your iPhone 17 Pro Max.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Building the App](#building-the-app)
4. [Testing on Your iPhone](#testing-on-your-iphone)
5. [App Store Deployment (Optional)](#app-store-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Hardware
- ✅ **iPhone 17 Pro Max** (your device)
- 🖥️ **Mac computer** (MacBook, iMac, or Mac Mini)
  - Required for Xcode and iOS development
  - If you don't have a Mac, see [Alternative: Cloud Build](#alternative-cloud-build)

### Required Software
1. **Xcode** (latest version)
   - Download from Mac App Store (free)
   - Size: ~12-15 GB
   - Includes iOS SDK and Simulators

2. **Node.js** (already installed if you've synced the project)
   - Version 16 or higher

3. **CocoaPods** (iOS dependency manager)
   ```bash
   sudo gem install cocoapods
   ```

4. **Apple Developer Account**
   - Free account: Test on your own devices (up to 3)
   - Paid ($99/year): Deploy to App Store

---

## Initial Setup

### 1. Transfer Project to Mac

**Option A: Via Git**
```bash
# On your Mac, clone the repository
git clone <your-repo-url>
cd bible-study-app-or-theological-research-tool

# Pull the latest changes
git pull origin claude/ios-app-conversion-qHKxR
```

**Option B: Via USB/AirDrop**
- Compress the entire project folder
- Transfer to your Mac via AirDrop or USB

### 2. Install Dependencies on Mac
```bash
# Navigate to project directory
cd bible-study-app-or-theological-research-tool

# Install Node.js dependencies
npm install

# Install iOS native dependencies
cd ios/App
pod install
cd ../..
```

### 3. Open Project in Xcode
```bash
# This will open the iOS project in Xcode
npm run ios:open

# Or manually:
open ios/App/App.xcworkspace
```

**⚠️ Important:** Always open `App.xcworkspace`, NOT `App.xcodeproj` (when using CocoaPods)

---

## Building the App

### 1. Configure Signing in Xcode

1. In Xcode, select the **App** target in the project navigator
2. Go to **Signing & Capabilities** tab
3. Select your **Team** (your Apple ID)
4. Xcode will automatically manage signing certificates

**Bundle Identifier:** `com.biblestudy.app`
- You may need to change this to something unique if you get signing errors
- Example: `com.yourname.biblestudy`

### 2. Select Your iPhone as Target

1. Connect your iPhone 17 Pro Max to your Mac via USB-C
2. Trust the computer on your iPhone (pop-up will appear)
3. In Xcode toolbar, click the device dropdown
4. Select your "iPhone 17 Pro Max"

### 3. Build and Run

**Option 1: Quick Test Run**
1. Click the **Play** button (▶️) in Xcode toolbar
2. Xcode will build and install the app on your iPhone
3. First time: You'll need to trust the developer certificate on your iPhone
   - Go to **Settings > General > VPN & Device Management**
   - Tap your Apple ID
   - Tap **Trust**

**Option 2: Build for Testing**
1. In Xcode menu: **Product > Build** (⌘B)
2. If successful, you'll see "Build Succeeded"
3. Then: **Product > Run** (⌘R)

### 4. Verify Native Features

Once installed, test these iOS-specific features:
- ✅ **Haptic Feedback** - Buttons should vibrate when tapped
- ✅ **Status Bar** - Matches app theme (dark/light)
- ✅ **Native Share** - Use window.nativeShare() in console
- ✅ **Keyboard Handling** - Smooth keyboard appearance/dismissal
- ✅ **Dark Mode** - Status bar updates with theme changes

---

## Testing on Your iPhone

### Development vs. Production

**Development Build** (what you just created)
- ✅ Installs directly from Xcode
- ✅ Valid for 7 days (free account) or 1 year (paid account)
- ✅ Includes debugging capabilities
- ❌ Not optimized for size/performance
- ❌ Must reinstall after expiration

**Production Build** (via App Store or TestFlight)
- ✅ Optimized and signed for distribution
- ✅ No expiration
- ✅ Can be shared with others
- ❌ Requires paid developer account

### Keeping Your App Updated

Your development app will expire after 7 days (free account). To refresh:

```bash
# Make any updates to code
cd bible-study-app-or-theological-research-tool

# Sync changes to iOS
npm run ios:sync

# Rebuild in Xcode
# Click Play (▶️) button to reinstall
```

---

## App Store Deployment

### Requirements
- 💳 **Apple Developer Program** membership ($99/year)
- 📱 **App Store Connect** account
- 🎨 **App Store assets** (screenshots, description, icon)

### Quick Steps

1. **Create App Store Connect Record**
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Click **My Apps** > **+** > **New App**
   - Fill in app information

2. **Prepare App for Distribution**
   ```bash
   # Update version in Xcode
   # Change scheme to "Release"
   # Archive the app: Product > Archive
   ```

3. **Upload to App Store**
   - In Xcode: **Window > Organizer**
   - Select your archive
   - Click **Distribute App**
   - Follow the wizard (App Store Connect)

4. **Submit for Review**
   - In App Store Connect, fill in all metadata
   - Add screenshots (iPhone 17 Pro Max: 2796x1290)
   - Submit for review
   - Approval typically takes 1-2 days

### TestFlight (Recommended First)

Before App Store release, test with TestFlight:
1. Upload build to App Store Connect
2. Enable TestFlight testing
3. Install TestFlight app on iPhone
4. Install your app through TestFlight
5. Test thoroughly before public release

---

## Alternative: Cloud Build

If you don't have a Mac, you can use cloud services:

### Option 1: Codemagic (Recommended)
- Free tier available
- Supports Capacitor/iOS
- [codemagic.io](https://codemagic.io)

### Option 2: Microsoft App Center
- Free for open source
- [appcenter.ms](https://appcenter.ms)

### Option 3: GitHub Actions
- Free with GitHub
- Requires Mac runner (limited free minutes)

---

## Troubleshooting

### "No matching provisioning profile found"
**Solution:**
1. Xcode > Preferences > Accounts
2. Select your Apple ID
3. Click "Download Manual Profiles"
4. Try building again

### "Trust developer certificate"
**Solution:**
1. Settings > General > VPN & Device Management
2. Tap your developer name
3. Tap "Trust [Your Name]"

### "Unable to install app"
**Solution:**
1. Delete existing app from iPhone
2. Clean build: Product > Clean Build Folder (⌘⇧K)
3. Rebuild: Product > Build (⌘B)
4. Run again: Product > Run (⌘R)

### Capacitor plugins not working
**Solution:**
```bash
# Reinstall pods
cd ios/App
pod repo update
pod install --repo-update
cd ../..

# Sync again
npm run ios:sync
```

### App expires after 7 days
**Solution:**
- Free accounts: Reinstall every 7 days
- Paid account ($99/year): Valid for 1 year
- App Store: No expiration

---

## Development Workflow

### Making Changes to the App

1. **Edit web files** (HTML, CSS, JS)
   ```bash
   # Edit files in root directory or www/
   # Changes in root are the source of truth
   ```

2. **Copy changes to www/**
   ```bash
   # Copy updated files
   cp index.html app.js styles.css manifest.json icon.svg commentaries.json www/
   ```

3. **Sync to iOS**
   ```bash
   npm run ios:sync
   ```

4. **Rebuild in Xcode**
   - Click Play (▶️) to rebuild and run

### Automated Sync Script

Create a sync script for easier updates:

```bash
# sync-ios.sh
#!/bin/bash
cp index.html app.js styles.css manifest.json icon.svg commentaries.json capacitor-init.js www/
npm run ios:sync
echo "✅ iOS project synced! Open in Xcode to rebuild."
```

Make it executable:
```bash
chmod +x sync-ios.sh
./sync-ios.sh
```

---

## Native Features

Your app now includes these iOS-native capabilities:

### 1. Haptic Feedback
- All buttons provide tactile feedback
- Uses iOS Taptic Engine
- Automatic on all interactive elements

### 2. Status Bar Integration
- Matches dark/light theme
- Smooth transitions
- Proper safe area handling for iPhone 17 Pro Max notch

### 3. Native Sharing
- Use iOS share sheet
- JavaScript API: `window.nativeShare(title, text, url)`
- Example:
  ```javascript
  if (window.useNativeShare) {
      window.nativeShare(
          'Bible Verse',
          'John 3:16 - For God so loved the world...',
          ''
      );
  }
  ```

### 4. Keyboard Management
- Smooth keyboard appearance
- Automatic viewport adjustment
- Native accessory bar

### 5. App Lifecycle
- Proper background/foreground handling
- State restoration
- Memory management

---

## File Structure

```
bible-study-app-or-theological-research-tool/
├── ios/                          # Native iOS project (generated)
│   └── App/
│       ├── App.xcworkspace      # Open this in Xcode
│       ├── App/
│       │   └── public/          # Your web files (auto-copied)
│       └── Podfile              # iOS dependencies
├── www/                          # Web source for iOS (build output)
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── capacitor-init.js        # iOS native integration
│   └── ...
├── index.html                    # Original source files
├── app.js
├── styles.css
├── capacitor-init.js            # iOS integration script
├── capacitor.config.json        # Capacitor configuration
├── package.json                 # Node dependencies
└── IOS_DEPLOYMENT_GUIDE.md     # This file
```

---

## Performance Tips

1. **Optimize Assets**
   - Compress commentaries.json if too large
   - Use appropriate image sizes for iPhone 17 Pro Max

2. **Cache Strategies**
   - Bible verses are already cached in localStorage
   - Consider implementing service worker for offline support

3. **Battery Optimization**
   - App already minimizes network requests
   - Uses efficient localStorage over network calls

---

## Next Steps

1. ✅ Test app thoroughly on your iPhone 17 Pro Max
2. ✅ Verify all features work (Bible search, notes, commentary)
3. ✅ Test dark mode switching
4. ✅ Try native share functionality
5. ⏭️ Consider App Store deployment for permanent installation
6. ⏭️ Add app icon in Xcode (currently using default)
7. ⏭️ Customize splash screen (ios/App/App/Assets.xcassets)

---

## Support

### Capacitor Documentation
- [capacitorjs.com/docs](https://capacitorjs.com/docs)

### Apple Developer
- [developer.apple.com](https://developer.apple.com)

### App Store Review Guidelines
- [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines)

---

## Summary

🎉 **Your Bible Study app is now a full iOS app!**

**What you have:**
- ✅ Native iOS application
- ✅ Optimized for iPhone 17 Pro Max
- ✅ Haptic feedback on all buttons
- ✅ Native status bar integration
- ✅ iOS share sheet support
- ✅ Proper keyboard handling
- ✅ Dark mode with native integration

**To use it:**
1. Open project on Mac
2. Build in Xcode
3. Install on your iPhone
4. Enjoy your native Bible Study app!

**Remember:** Free developer accounts require reinstalling every 7 days. Consider upgrading to a paid account ($99/year) for permanent installation or App Store deployment.
