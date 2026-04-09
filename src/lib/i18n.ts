/**
 * i18n — English and Hindi translations for the entire auth journey.
 * Add new keys here; TypeScript will enforce usage consistency.
 */

export type Locale = 'en' | 'hi'

export interface Translations {
  // Language page
  language_headline: string
  language_subtitle: string
  language_choose:   string
  language_continue: string

  // Login page
  login_heading:     string
  login_subtitle:    string
  login_cta:         string
  login_placeholder: string
  login_error:       string

  /** Phone field (label + input placeholder; +91 stays numeric) */
  phone_label:        string
  phone_placeholder:  string

  // OTP page
  otp_heading:       string
  otp_sent_to:       string
  otp_change:        string
  otp_hint:          string
  otp_verifying:     string
  otp_field_label:   string
  /** Use `{count}` for seconds remaining */
  otp_resend_countdown: string
  otp_resend_cta:    string
  /** Use `{n}` for 1-based digit index */
  otp_digit_aria:    string

  // Legal (inline T&C — matches login/OTP footer)
  legal_text:        string
  legal_tos:         string
  legal_and:         string
  legal_privacy:     string

  // Onboarding
  onboarding_skip:   string
  onboarding_slides: { title: string; subtitle: string; cta: string }[]

  // Permissions
  gallery_perm_title:    string
  gallery_perm_subtitle: string
  gallery_perm_allow:    string
  gallery_perm_skip:     string

  notif_perm_title:    string
  notif_perm_subtitle: string
  notif_perm_allow:    string
  notif_perm_skip:     string

  // Main app bottom navigation
  nav_home:       string
  nav_photos:     string
  nav_ai_camera:  string
  nav_files:      string
  nav_create:     string
}

const en: Translations = {
  language_headline: 'Make your photos look new and better',
  language_subtitle: 'Try something new, improve your photos, and share them easily.',
  language_choose:   'Choose your language',
  language_continue: 'Continue',

  login_heading:     'Sign in',
  login_subtitle:    'Make new photos or improve your old ones.',
  login_cta:         'Get OTP',
  login_placeholder: 'Mobile number',
  login_error:       'Please enter a valid 10-digit number',

  phone_label:       'Enter your phone number',
  phone_placeholder: 'Enter 10-digit number',

  otp_heading:   'Verify your mobile number',
  otp_sent_to:   'Enter the OTP sent to',
  otp_change:    'Change my number',
  otp_hint:      'Enter all 4 digits to continue automatically',
  otp_verifying: 'Verifying…',
  otp_field_label:   'OTP number',
  otp_resend_countdown: 'Request OTP in {count} secs',
  otp_resend_cta:    'Resend OTP',
  otp_digit_aria:    'OTP digit {n}',

  legal_text:    'By continuing, you agree to our ',
  legal_tos:     'Terms & Conditions',
  legal_and:     ' and ',
  legal_privacy: 'Privacy Policy.',

  onboarding_skip: 'Skip',
  onboarding_slides: [
    { title: 'Make new photos and improve your old ones', subtitle: 'Do it in seconds with AI.', cta: 'Try Now' },
    { title: 'See your photos and videos as a slideshow', subtitle: 'They come together so you can watch and share anytime.', cta: 'Try Now' },
    { title: 'Make photos for any moment',               subtitle: 'For birthdays, festivals, and more in seconds.', cta: 'Try Now' },
  ],

  gallery_perm_title:    'Access your photos',
  gallery_perm_subtitle: 'Allow JioAI Photos to access your gallery to create a personalized experience.',
  gallery_perm_allow:    'Allow Access',
  gallery_perm_skip:     'Not now',

  notif_perm_title:    'Stay in the loop',
  notif_perm_subtitle: 'Allow notifications to get updates on your AI-enhanced photos, memories, and more.',
  notif_perm_allow:    'Enable Notifications',
  notif_perm_skip:     'Not now',

  nav_home:      'Home',
  nav_photos:    'Photos',
  nav_ai_camera: 'AI Camera',
  nav_files:     'Files',
  nav_create:    'Create',
}

const hi: Translations = {
  language_headline: 'अपनी फ़ोटो को नया और बेहतर बनाएं',
  language_subtitle: 'कुछ नया आज़माएं, अपनी फ़ोटो सुधारें और उन्हें आसानी से शेयर करें।',
  language_choose:   'अपनी भाषा चुनें',
  language_continue: 'जारी रखें',

  login_heading:     'साइन इन करें',
  login_subtitle:    'नई फ़ोटो बनाएं या पुरानी फ़ोटो को बेहतर करें।',
  login_cta:         'OTP पाएं',
  login_placeholder: 'मोबाइल नंबर',
  login_error:       'कृपया 10 अंकों का सही नंबर दर्ज करें',

  phone_label:       'अपना फ़ोन नंबर दर्ज करें',
  phone_placeholder: '10 अंकों का नंबर दर्ज करें',

  otp_heading:   'अपना मोबाइल नंबर सत्यापित करें',
  otp_sent_to:   'OTP भेजा गया',
  otp_change:    'नंबर बदलें',
  otp_hint:      'जारी रखने के लिए सभी 4 अंक दर्ज करें',
  otp_verifying: 'सत्यापित हो रहा है…',
  otp_field_label:   'OTP नंबर',
  otp_resend_countdown: '{count} सेकंड में OTP फिर से माँगें',
  otp_resend_cta:    'OTP फिर से भेजें',
  otp_digit_aria:    'OTP अंक {n}',

  legal_text:    'जारी रखकर, आप हमारे ',
  legal_tos:     'नियम व शर्तों',
  legal_and:     ' तथा ',
  legal_privacy: 'गोपनीयता नीति से सहमत होते हैं।',

  onboarding_skip: 'छोड़ें',
  onboarding_slides: [
    { title: 'नई फ़ोटो बनाएं और पुरानी सुधारें', subtitle: 'AI की मदद से सेकंडों में करें।', cta: 'अभी आज़माएं' },
    { title: 'अपनी फ़ोटो और वीडियो को स्लाइडशो में देखें', subtitle: 'वे एक साथ आते हैं ताकि आप कभी भी देख और शेयर कर सकें।', cta: 'अभी आज़माएं' },
    { title: 'हर पल के लिए फ़ोटो बनाएं', subtitle: 'जन्मदिन, त्योहारों और अन्य के लिए सेकंडों में।', cta: 'अभी आज़माएं' },
  ],

  gallery_perm_title:    'अपनी फ़ोटो एक्सेस करें',
  gallery_perm_subtitle: 'JioAI Photos को व्यक्तिगत अनुभव बनाने के लिए अपनी गैलरी एक्सेस करने दें।',
  gallery_perm_allow:    'एक्सेस दें',
  gallery_perm_skip:     'अभी नहीं',

  notif_perm_title:    'अपडेट पाते रहें',
  notif_perm_subtitle: 'AI-बेहतर फ़ोटो, यादें और अधिक के अपडेट के लिए नोटिफ़िकेशन की अनुमति दें।',
  notif_perm_allow:    'नोटिफ़िकेशन चालू करें',
  notif_perm_skip:     'अभी नहीं',

  nav_home:      'होम',
  nav_photos:    'फ़ोटो',
  nav_ai_camera: 'AI कैमरा',
  nav_files:     'फ़ाइलें',
  nav_create:    'बनाएं',
}

export const translations: Record<Locale, Translations> = { en, hi }
