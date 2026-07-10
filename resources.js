// ─── TECHPALS RESOURCES ───────────────────────────────────────────────────────
// Real blog posts from techpals.org/blog
// To add more: copy one object, fill in all fields, save the file.

const TECHPALS_RESOURCES = [
  {
    title: "How to Share Photos Between Your Phone and Computer",
    description: "Learn the easiest ways to transfer photos between your phone and computer, including USB cables, iCloud Photos, Google Photos, AirDrop, and email.",
    steps: [
      "Connect your phone to your computer with a USB cable, or open iCloud/Google Photos on both devices.",
      "Select the photos you want to share and choose 'Download' or 'Import' on your computer.",
      "For wireless sharing on iPhone, use AirDrop — just turn it on in Settings and tap Share on any photo."
    ],
    url: "https://www.techpals.org/blog/how-to-share-photos-between-your-phone-and-computer",
    tags: ["photos", "photo", "pictures", "transfer", "icloud", "google photos", "airdrop", "computer", "backup", "share photos", "move photos"]
  },
  {
    title: "Why Scammers Want You to Pay With Gift Cards",
    description: "Learn why scammers ask for Apple, Google Play, Amazon, and prepaid gift cards, and how to recognize the warning signs. Find out what to do if someone demands gift cards.",
    steps: [
      "Know the rule: no real company, government agency, or utility will ever ask you to pay with gift cards.",
      "If someone pressures you to buy gift cards urgently, hang up or stop responding — it is always a scam.",
      "If you already shared card numbers, call the gift card company immediately and report it to the FTC at reportfraud.ftc.gov."
    ],
    url: "https://www.techpals.org/blog/why-scammers-want-you-to-pay-with-gift-cards",
    tags: ["scam", "scams", "gift card", "gift cards", "fraud", "payment scam", "apple card", "google play", "amazon card", "scammer"]
  },
  {
    title: "How to Find a Lost iPhone or Android Phone",
    description: "Learn how to find a lost iPhone or Android phone using Find My iPhone, Find My Device, remote locking, sound alerts, and last known location.",
    steps: [
      "On iPhone: go to icloud.com/find on any device and sign in — you can see your phone's location on a map.",
      "On Android: go to android.com/find and sign in with your Google account to locate, ring, or lock your phone.",
      "If your phone is stolen, use the remote lock feature to protect your personal information right away."
    ],
    url: "https://www.techpals.org/blog/how-to-find-a-lost-iphone-or-android-phone",
    tags: ["lost phone", "find my phone", "find my iphone", "lost iphone", "lost android", "stolen phone", "find my device", "locate phone", "missing phone"]
  },
  {
    title: "iPhone Accessibility Features Everyone Should Know About",
    description: "Learn how to use iPhone Accessibility features to make your device easier to read, hear, and navigate. Covers Larger Text, AssistiveTouch, Magnifier, and voice-to-text.",
    steps: [
      "Go to Settings → Accessibility to find all features. Turn on Larger Text to make everything on screen easier to read.",
      "Use the Magnifier (Settings → Accessibility → Magnifier) to zoom in on small print like menus or labels.",
      "Enable AssistiveTouch if pressing buttons is difficult — it adds a floating on-screen button for common actions."
    ],
    url: "https://www.techpals.org/blog/iphone-accessibility-features-everyone-should-know-about",
    tags: ["accessibility", "iphone accessibility", "larger text", "font size", "assistivetouch", "magnifier", "voice to text", "iphone settings", "easier to use", "big text"]
  },
  {
    title: "How to Use Zoom with Family: A Simple Step-by-Step Guide",
    description: "Learn how to use Zoom with family in this simple step-by-step guide. Covers downloading Zoom, joining a call, turning on audio and video, and common troubleshooting.",
    steps: [
      "Download the free Zoom app from the App Store (iPhone) or Google Play Store (Android), then open it and tap 'Join a Meeting.'",
      "Enter the Meeting ID your family member sent you, then tap 'Join' — make sure to allow Zoom to use your camera and microphone.",
      "During the call, tap the screen to see the buttons. Use 'Mute/Unmute' for audio and 'Start/Stop Video' for your camera."
    ],
    url: "https://www.techpals.org/blog/how-to-use-zoom-with-family-a-simple-step-by-step-guide",
    tags: ["zoom", "video call", "video calling", "zoom call", "video chat", "video meeting", "family call", "zoom guide", "zoom meeting", "video"]
  },
  {
    title: "Don't Reply 'STOP' to Spam Texts — Here's a Smarter Way",
    description: "Replying 'STOP' to spam texts can actually confirm your number to scammers. Learn why you shouldn't reply, what to do instead, and how to block spam texts safely.",
    steps: [
      "Never reply 'STOP' or anything else to a suspicious text — even responding confirms your number is active to scammers.",
      "On iPhone: open the message, tap the sender's number, scroll down and tap 'Block this Caller.' On Android: press and hold the message and tap 'Block.'",
      "Report spam texts by forwarding them to 7726 (SPAM) — this is free and works on both iPhone and Android."
    ],
    url: "https://www.techpals.org/blog/dont-reply-stop-to-spam-text-messagesheres-a-smarter-way-to-handle-them",
    tags: ["spam text", "spam texts", "text scam", "stop text", "block texts", "unwanted texts", "scam text", "sms spam", "block number", "junk text"]
  },
  {
    title: "How to Make Your iPhone Feel Normal After the iOS 26 Update",
    description: "Updated to iOS 26 and confused by the new look? Learn 5 simple ways to make your iPhone feel familiar again — fix Safari, Music, icons, and more.",
    steps: [
      "If Safari looks different, open Settings → Apps → Safari and adjust the Tab Bar and layout settings to match what you're used to.",
      "If the home screen icons look different, go to Settings → Wallpaper and toggle off 'Tint Icons' to restore the original look.",
      "If anything still feels off, TechPals can walk you through it — the changes are small once you know where to look."
    ],
    url: "https://www.techpals.org/blog/how-to-make-your-iphone-feel-normal-again-after-the-ios-26-update",
    tags: ["ios 26", "ios update", "iphone update", "ios 26 update", "safari", "iphone looks different", "update", "iphone changed", "new update confused"]
  },
  {
    title: "Cybersecurity Basics Everyone Should Know",
    description: "Learn simple, practical steps to protect your devices, avoid scams, and use technology with confidence. Covers passwords, software updates, and safe browsing.",
    steps: [
      "Use a strong, unique password for each account — a password manager app can remember them all for you.",
      "Always install software and phone updates when they're available — they fix security holes that scammers try to exploit.",
      "If something online feels wrong or too good to be true, trust your instincts and don't click — call a trusted person first."
    ],
    url: "https://www.techpals.org/blog/cybersecurity-basics-january-2026",
    tags: ["cybersecurity", "online safety", "security", "password", "safe online", "protect device", "digital safety", "scam prevention", "online security", "cyber"]
  },
  {
    title: "What to Do When Your Apps Keep Freezing or Crashing",
    description: "If your apps keep freezing or crashing, this guide explains the most common causes and walks you through simple fixes anyone can do.",
    steps: [
      "Close the frozen app completely: on iPhone, swipe up from the bottom and swipe the app away. On Android, tap the square button and swipe it off.",
      "Check if your phone needs an update: go to Settings → General → Software Update (iPhone) or Settings → System → System Update (Android).",
      "If the problem keeps happening, check your storage — go to Settings and look for 'Storage.' If it's nearly full, delete unused apps or old photos."
    ],
    url: "https://www.techpals.org/blog/what-to-do-when-your-apps-keep-freezing-or-crashing-a-simple-guide-for-everyday-phone-users",
    tags: ["app freezing", "app crashing", "apps not working", "phone freezing", "frozen app", "app won't open", "phone slow", "apps crash", "app problem"]
  },
  {
    title: "How to Keep Your Email Inbox Under Control",
    description: "Simple habits that make email easier to manage. Learn how to unsubscribe safely, organize messages, archive important emails, and reduce spam.",
    steps: [
      "Unsubscribe from newsletters you don't read by scrolling to the bottom of the email and tapping 'Unsubscribe' — only do this for emails from companies you recognize.",
      "Create a simple folder: keep an 'Important' folder for things you need to save, and delete everything else once you've read it.",
      "Never click links in emails asking for your password or payment info — go directly to the website by typing the address yourself."
    ],
    url: "https://www.techpals.org/blog/how-to-clean-up-your-text-messages-without-losing-important-info-ywmnj",
    tags: ["email", "inbox", "email inbox", "email organization", "spam email", "unsubscribe", "gmail", "email management", "email safety", "clean email"]
  },
  {
    title: "The Most Common Scams Targeting Older Adults",
    description: "From fake Medicare calls to romance scams and tech support fraud, learn the red flags and how to protect yourself from the most common scams.",
    steps: [
      "Common warning signs: urgency ('act now!'), requests for gift cards or wire transfers, threats from 'government agencies,' and prizes you didn't enter to win.",
      "Medicare, Social Security, and the IRS will never call you unexpectedly to demand payment — hang up and call the agency directly.",
      "If you think you've been scammed, call a trusted family member first, then report it to the FTC at reportfraud.ftc.gov or 1-877-382-4357."
    ],
    url: "https://www.techpals.org/blog/the-most-common-scams-targeting-older-adults-and-how-to-avoid-them",
    tags: ["scam", "scams", "elder scam", "medicare scam", "romance scam", "tech support scam", "phone scam", "fraud", "older adults scam", "avoiding scams", "irs scam"]
  },
  {
    title: "How to Clean Up Your Text Messages Without Losing Important Info",
    description: "Text messages pile up fast. Learn how to safely clean up your texts, remove clutter, save important photos, and stay protected from scam texts.",
    steps: [
      "Before deleting, save any important photos from your texts: press and hold the photo, then tap 'Save to Photos.'",
      "On iPhone: go to Settings → Apps → Messages → Keep Messages and set it to '1 Year' to auto-delete old messages.",
      "Delete entire conversations you no longer need by swiping left on them in your Messages list and tapping 'Delete.'"
    ],
    url: "https://www.techpals.org/blog/how-to-clean-up-your-text-messages-without-losing-important-info",
    tags: ["text messages", "texts", "messages", "clean up texts", "delete messages", "sms", "storage", "phone storage", "text clutter", "clean messages"]
  },
  {
    title: "How to Keep Your Phone Running Smoothly",
    description: "Learn the most common reasons phones slow down and the simple steps to keep your device fast, secure, and reliable.",
    steps: [
      "Restart your phone at least once a week — it clears temporary files and fixes small glitches that slow things down.",
      "Delete apps you haven't used in months: press and hold an app icon, tap 'Remove App' (iPhone) or 'Uninstall' (Android).",
      "Keep your phone updated and charged between 20–80% when possible to extend battery life over the long term."
    ],
    url: "https://www.techpals.org/blog/how-to-keep-your-phone-running-smoothly-a-practical-guide-for-everyday-users",
    tags: ["phone slow", "slow phone", "speed up phone", "phone performance", "phone tips", "battery", "phone maintenance", "android slow", "iphone slow", "phone running slow"]
  },
  {
    title: "What to Do When Your Phone Gets Hot",
    description: "Learn why phones overheat, how to cool them down quickly, and the simple steps anyone can take to prevent overheating in the future.",
    steps: [
      "Stop using the phone and remove it from its case — set it on a flat, hard surface (not a bed or couch) to let heat escape.",
      "Close all apps, turn off Bluetooth and Wi-Fi temporarily, and lower the screen brightness while it cools down.",
      "If it overheats often, go to Settings → Battery to see which apps are using the most power and delete the worst offenders."
    ],
    url: "https://www.techpals.org/blog/what-to-do-when-your-phone-gets-hot-causes-fixes-and-prevention",
    tags: ["phone hot", "phone overheating", "overheating", "phone warm", "phone too hot", "hot phone", "phone heating up", "battery heat", "phone temperature"]
  },
  {
    title: "TechPals Answers Your Most-Asked Phone Questions",
    description: "The most common smartphone questions TechPals hears — answered clearly and simply. Perfect if you've been afraid to ask.",
    steps: [
      "Covers questions like: how do I make text bigger, why is my battery draining fast, and how do I connect to WiFi.",
      "Each answer is written in plain English with no jargon — no technical experience needed.",
      "Read through at your own pace and focus on the answers most useful to you."
    ],
    url: "https://www.techpals.org/blog/techpals-answers-your-most-asked-phone-questions",
    tags: ["phone questions", "smartphone help", "phone help", "iphone questions", "android questions", "phone basics", "beginner phone", "how to phone", "phone faq"]
  },
  {
    title: "10 Everyday Phone Habits That Make Life Easier",
    description: "Build better smartphone habits with these 10 easy tips. Learn how to stay organized, save battery, and feel more in control of your iPhone or Android every day.",
    steps: [
      "Turn on Do Not Disturb at night so calls and notifications don't wake you — you can still allow calls from family.",
      "Use your phone's voice assistant (Siri or Google) to set reminders, send texts, or make calls hands-free.",
      "Take a screenshot when you see something important: press the side button + volume up (iPhone) or power + volume down (Android)."
    ],
    url: "https://www.techpals.org/blog/10-everyday-phone-habits-that-make-life-easier",
    tags: ["phone habits", "phone tips", "smartphone tips", "daily phone", "phone tricks", "iphone tips", "android tips", "easier phone", "phone skills", "phone habits"]
  }
];

// ─── EXTERNAL RESOURCES ───────────────────────────────────────────────────────
// Handpicked trusted resources from AARP, GCFGlobal, SeniorNet, etc.
// All free, beginner-friendly, and vetted for older adults.

const EXTERNAL_RESOURCES = [
  // SMARTPHONES & BASICS
  {
    title: "Smartphone Basics for Beginners (GCFGlobal)",
    description: "A complete beginner's guide to using a smartphone. Covers touchscreens, making calls, sending texts, downloading apps, and adjusting basic settings — all in plain English.",
    steps: [
      "Learn the basic gestures: tap to select, swipe to scroll, pinch to zoom in and out.",
      "Find out how to make calls, send texts, and download apps from the App Store or Google Play.",
      "Explore settings for adjusting volume, brightness, and notifications to make your phone more comfortable."
    ],
    url: "https://edu.gcfglobal.org/en/smartphone-basics/",
    source: "GCFGlobal",
    tags: ["smartphone", "phone basics", "beginner phone", "smartphone basics", "how to use phone", "iphone basics", "android basics", "touchscreen"]
  },
  {
    title: "AARP: How to Use Your Smartphone",
    description: "AARP's beginner-friendly smartphone guide written specifically for older adults. Covers the most common tasks and questions in simple, clear steps.",
    steps: [
      "Learn how to navigate your phone's home screen, find apps, and use the camera.",
      "Discover how to adjust text size, volume, and other settings to make your phone easier to use.",
      "Get tips on saving battery, connecting to Wi-Fi, and keeping your phone secure."
    ],
    url: "https://www.aarp.org/home-family/personal-technology/info-2021/smartphone-tips-for-older-adults.html",
    source: "AARP",
    tags: ["smartphone", "phone basics", "aarp phone", "older adults phone", "senior phone tips", "iphone", "android"]
  },

  // VIDEO CALLING
  {
    title: "How to Use FaceTime (Apple Support)",
    description: "Apple's official guide to making and receiving FaceTime video calls on iPhone and iPad. Step-by-step with pictures.",
    steps: [
      "Open the FaceTime app and tap the + button, then type the name, phone number, or email of the person you want to call.",
      "Tap the video camera icon to start a video call, or the phone icon for an audio-only call.",
      "During the call, tap the screen to see options like muting yourself or switching cameras."
    ],
    url: "https://support.apple.com/en-us/111893",
    source: "Apple Support",
    tags: ["facetime", "video call", "iphone video call", "apple video call", "video chat", "video calling", "family video call"]
  },
  {
    title: "Google Meet: How to Join a Video Call",
    description: "A simple guide to joining a Google Meet video call — no technical experience needed. Works on phones, tablets, and computers.",
    steps: [
      "Click or tap the meeting link someone sent you — it usually starts with 'meet.google.com'.",
      "Allow Google Meet to use your camera and microphone when asked, then click 'Join Now.'",
      "Use the microphone button to mute/unmute yourself and the camera button to turn your video on or off."
    ],
    url: "https://support.google.com/meet/answer/9303069",
    source: "Google Support",
    tags: ["google meet", "video call", "video meeting", "video chat", "google video", "meet", "video calling"]
  },

  // EMAIL
  {
    title: "Gmail Basics for Beginners (GCFGlobal)",
    description: "Learn how to use Gmail to send and receive emails, organize your inbox, and stay safe from spam — all explained simply.",
    steps: [
      "Open Gmail and tap 'Compose' to write a new email. Type the recipient's address in the 'To' field.",
      "To reply to an email, open it and tap 'Reply' at the bottom. Type your message and tap Send.",
      "Move unwanted emails to Trash by swiping left on them, or mark them as Spam if they look suspicious."
    ],
    url: "https://edu.gcfglobal.org/en/gmail/",
    source: "GCFGlobal",
    tags: ["email", "gmail", "email basics", "how to email", "send email", "inbox", "email beginner", "gmail basics"]
  },
  {
    title: "AARP: How to Spot Email Scams",
    description: "Learn how to recognize scam emails before you click anything. AARP explains the most common tricks scammers use and what to do if you receive one.",
    steps: [
      "Look for urgency ('Your account will be closed!'), spelling errors, or a sender email address that looks odd.",
      "Never click links in suspicious emails — go directly to the website by typing the address into your browser.",
      "If you're unsure whether an email is real, call the company directly using a phone number from their official website."
    ],
    url: "https://www.aarp.org/money/scams-fraud/info-2019/email-phishing.html",
    source: "AARP",
    tags: ["email scam", "phishing", "spam email", "email fraud", "scam email", "suspicious email", "email safety", "email security"]
  },

  // PASSWORDS & SECURITY
  {
    title: "How to Create a Strong Password (GCFGlobal)",
    description: "A simple guide to creating passwords that are hard to guess but easy for you to remember. Includes tips on password managers.",
    steps: [
      "Use at least 12 characters and mix uppercase, lowercase, numbers, and symbols — avoid using your name or birthday.",
      "Don't use the same password for multiple accounts — if one gets hacked, all your accounts become vulnerable.",
      "Consider a password manager app like LastPass or 1Password — it remembers all your passwords so you only need one master password."
    ],
    url: "https://edu.gcfglobal.org/en/internetsafety/creating-strong-passwords/1/",
    source: "GCFGlobal",
    tags: ["password", "passwords", "strong password", "password security", "password manager", "account security", "login", "secure password"]
  },
  {
    title: "AARP: Protect Your Online Accounts",
    description: "Step-by-step advice on keeping your online accounts safe — from passwords to two-factor authentication — written for everyday users.",
    steps: [
      "Turn on two-factor authentication (2FA) on important accounts like email and banking — it adds a second step to verify it's really you.",
      "Review the accounts you have and delete any you no longer use — fewer accounts means fewer chances for hackers.",
      "Check haveibeenpwned.com to see if your email has appeared in any known data breaches."
    ],
    url: "https://www.aarp.org/money/scams-fraud/info-2020/protect-online-accounts.html",
    source: "AARP",
    tags: ["password", "account security", "two factor", "2fa", "online security", "account protection", "hacked", "security"]
  },

  // WI-FI & INTERNET
  {
    title: "Wi-Fi Basics: How to Connect (GCFGlobal)",
    description: "Learn how to connect your phone, tablet, or computer to Wi-Fi at home, and what to do when the connection isn't working.",
    steps: [
      "On iPhone: go to Settings → Wi-Fi, turn it on, and tap your home network name. Enter your password when asked.",
      "On Android: go to Settings → Network & Internet → Wi-Fi, turn it on, and tap your network name.",
      "If it won't connect, try turning Wi-Fi off and back on, or restart your router by unplugging it for 30 seconds."
    ],
    url: "https://edu.gcfglobal.org/en/basic-skills/connecting-to-wifi/1/",
    source: "GCFGlobal",
    tags: ["wifi", "wi-fi", "internet", "connect wifi", "wifi password", "wireless", "network", "wifi connection", "home internet"]
  },
  {
    title: "What Is the Internet? A Beginner's Guide (GCFGlobal)",
    description: "A plain-English explanation of what the internet is, how it works, and how to use it safely for everyday things like email, shopping, and staying in touch.",
    steps: [
      "The internet is a giant network that connects computers and phones around the world so people can share information.",
      "You access it through a browser (like Safari or Chrome) by typing a website address or searching for something.",
      "Stay safe by only visiting websites that start with 'https://' and being careful about what personal information you share."
    ],
    url: "https://edu.gcfglobal.org/en/internetbasics/",
    source: "GCFGlobal",
    tags: ["internet", "internet basics", "what is internet", "browsing", "web", "online", "beginner internet", "how internet works"]
  },

  // ONLINE BANKING
  {
    title: "AARP: Online Banking Safety Tips",
    description: "How to use online banking safely — from setting up your account to spotting bank-related scams. Written for people new to banking online.",
    steps: [
      "Always access your bank by typing your bank's web address directly into the browser — never click a link in an email.",
      "Check your account regularly (even once a week) to spot any charges you don't recognize.",
      "Set up account alerts — most banks let you get a text or email whenever money moves in or out of your account."
    ],
    url: "https://www.aarp.org/money/banking/info-2020/online-banking-safety.html",
    source: "AARP",
    tags: ["online banking", "banking", "bank online", "bank safety", "banking security", "bank account", "money online", "digital banking"]
  },

  // CLOUD & STORAGE
  {
    title: "What Is Cloud Storage? (GCFGlobal)",
    description: "A clear, simple explanation of what 'the cloud' means, how services like iCloud and Google Photos work, and why they're useful for backing up your photos and files.",
    steps: [
      "Cloud storage means saving your files on the internet instead of just on your device — so you can access them anywhere.",
      "iCloud (for iPhone) and Google Drive (for Android) back up your photos and files automatically when connected to Wi-Fi.",
      "If your phone is lost or broken, your photos and contacts are safe in the cloud and can be restored to a new phone."
    ],
    url: "https://edu.gcfglobal.org/en/computerbasics/understanding-the-cloud/1/",
    source: "GCFGlobal",
    tags: ["cloud", "the cloud", "cloud storage", "icloud", "google drive", "google photos", "backup", "storage", "files", "photo backup"]
  },

  // SCAMS & SAFETY
  {
    title: "FTC: How to Recognize and Report Scams",
    description: "The official U.S. government guide on recognizing scams, protecting yourself, and reporting fraud to the Federal Trade Commission.",
    steps: [
      "Scammers pretend to be someone you trust — a government agency, family member, or company you know.",
      "They create urgency ('act now or lose your account') and ask for unusual payment like gift cards or wire transfers.",
      "Report any scam at reportfraud.ftc.gov — your report helps the government stop scammers."
    ],
    url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams",
    source: "FTC.gov",
    tags: ["scam", "scams", "fraud", "phishing", "avoid scams", "report scam", "ftc", "government scam", "scam warning", "scam protection"]
  },
  {
    title: "AARP Fraud Watch Network",
    description: "AARP's dedicated scam-fighting resource. Get alerts about the latest scams targeting older adults, plus tools to protect yourself and your family.",
    steps: [
      "Sign up for free scam alerts at aarp.org/fraudwatchnetwork to get notified about new scams in your area.",
      "Use the Scam-Tracking Map to see what scams others are reporting near you.",
      "Call the AARP Fraud Watch Helpline at 1-877-908-3360 to talk to someone if you think you've been targeted."
    ],
    url: "https://www.aarp.org/money/scams-fraud/",
    source: "AARP",
    tags: ["scam", "scams", "fraud", "aarp fraud", "scam alert", "older adults scam", "scam protection", "fraud watch", "avoiding scams"]
  },

  // PHOTOS
  {
    title: "How to Use Google Photos (GCFGlobal)",
    description: "Learn how to back up, organize, and share your photos using Google Photos — a free app available on both iPhone and Android.",
    steps: [
      "Download the free Google Photos app, sign in with your Google account, and turn on Backup to save your photos automatically.",
      "Use the search bar to find photos by typing what's in them — like 'birthday' or 'beach' — Google finds them for you.",
      "Share a photo by tapping it, then the Share button, and choosing to send it by text, email, or a shareable link."
    ],
    url: "https://edu.gcfglobal.org/en/google-photos-basics/",
    source: "GCFGlobal",
    tags: ["google photos", "photos", "photo backup", "pictures", "photo sharing", "organize photos", "photo storage", "backup photos"]
  },
  {
    title: "How to Use iCloud Photos (Apple Support)",
    description: "Apple's guide to using iCloud Photos to automatically back up and sync your photos across all your Apple devices.",
    steps: [
      "Go to Settings → [your name] → iCloud → Photos and turn on 'Sync this iPhone' to start backing up automatically.",
      "Your photos will upload whenever you're connected to Wi-Fi and your phone is charging.",
      "Access your photos on any Apple device signed in to the same Apple ID, or at icloud.com on a computer."
    ],
    url: "https://support.apple.com/en-us/108314",
    source: "Apple Support",
    tags: ["icloud", "icloud photos", "photo backup", "apple photos", "iphone photos", "sync photos", "photos backup", "icloud storage"]
  },

  // TEXTING
  {
    title: "How to Send a Text Message (GCFGlobal)",
    description: "A beginner's guide to sending, receiving, and managing text messages on your smartphone — including how to add photos and emoji.",
    steps: [
      "Open the Messages app on your phone, tap the compose button (pencil icon), and type the name or number of who you want to text.",
      "Type your message in the text box at the bottom and tap the Send button (arrow icon).",
      "To add a photo, tap the photo icon next to the text box, choose a photo from your gallery, then tap Send."
    ],
    url: "https://edu.gcfglobal.org/en/basic-skills/sending-a-text-message/1/",
    source: "GCFGlobal",
    tags: ["texting", "text message", "sms", "how to text", "send text", "messaging", "messages", "text", "iphone text", "android text"]
  },

  // BATTERY
  {
    title: "How to Extend Your Phone's Battery Life (AARP)",
    description: "Simple, practical tips to make your phone battery last longer throughout the day — no technical knowledge required.",
    steps: [
      "Lower your screen brightness — it's one of the biggest battery drains. On iPhone go to Settings → Display & Brightness.",
      "Turn off Wi-Fi, Bluetooth, and Location Services when you're not using them to save significant battery.",
      "Enable Low Power Mode (iPhone: Settings → Battery) or Battery Saver (Android: Settings → Battery) when your battery is getting low."
    ],
    url: "https://www.aarp.org/home-family/personal-technology/info-2021/how-to-extend-battery-life.html",
    source: "AARP",
    tags: ["battery", "battery life", "phone battery", "extend battery", "save battery", "battery drain", "low battery", "battery tips", "charging"]
  },

  // APPS
  {
    title: "How to Download Apps on iPhone or Android (GCFGlobal)",
    description: "Learn how to find, download, and manage apps on your smartphone — including free apps for video calling, weather, and more.",
    steps: [
      "On iPhone: open the App Store (blue icon). On Android: open the Google Play Store (colorful triangle icon).",
      "Tap the Search tab and type the name of the app you want. Tap 'Get' (iPhone) or 'Install' (Android) to download it for free.",
      "The app will appear on your home screen once it's downloaded — tap it to open it."
    ],
    url: "https://edu.gcfglobal.org/en/smartphone-basics/downloading-and-using-apps/1/",
    source: "GCFGlobal",
    tags: ["apps", "download apps", "app store", "google play", "install app", "free apps", "smartphone apps", "how to download app"]
  },

  // GENERAL TECH HELP
  {
    title: "GCFGlobal: Free Technology Lessons",
    description: "Hundreds of free, beginner-friendly lessons on computers, smartphones, the internet, email, and more — all written in plain English with pictures and videos.",
    steps: [
      "Browse topics at edu.gcfglobal.org — choose anything from 'Smartphone Basics' to 'Staying Safe Online.'",
      "Each lesson has short sections you can read at your own pace, plus quizzes to check your understanding.",
      "It's completely free with no account needed — just click and start learning."
    ],
    url: "https://edu.gcfglobal.org/en/",
    source: "GCFGlobal",
    tags: ["learn technology", "tech lessons", "technology basics", "computer basics", "free lessons", "beginner tech", "technology help", "online learning"]
  },
  {
    title: "AARP Technology Resource Center",
    description: "AARP's full collection of technology guides, tips, and advice written specifically for older adults — covering everything from smartphones to smart home devices.",
    steps: [
      "Browse hundreds of free articles on smartphones, computers, internet safety, and more at aarp.org/technology.",
      "Watch free video tutorials that walk you through common tech tasks step by step.",
      "Call AARP's helpline if you need one-on-one help: many questions can be answered over the phone."
    ],
    url: "https://www.aarp.org/home-family/personal-technology/",
    source: "AARP",
    tags: ["technology help", "tech help", "aarp technology", "older adults tech", "senior technology", "computer help", "phone help", "internet help"]
  }
];
