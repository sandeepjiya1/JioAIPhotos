/**
 * i18n — English and Hindi (same keys as web `src/lib/i18n.ts`).
 * Keep in sync when adding keys on either platform.
 */

export type Locale = 'en' | 'hi'

export interface Translations {
  language_headline: string
  language_subtitle: string
  language_choose: string
  language_continue: string

  login_heading: string
  login_subtitle: string
  login_cta: string
  login_placeholder: string
  login_error: string

  phone_label: string
  phone_placeholder: string

  otp_heading: string
  otp_sent_to: string
  otp_change: string
  otp_hint: string
  otp_verifying: string
  otp_field_label: string
  otp_resend_countdown: string
  otp_resend_cta: string
  otp_digit_aria: string

  legal_text: string
  legal_tos: string
  legal_and: string
  legal_privacy: string

  onboarding_skip: string
  onboarding_next: string
  onboarding_next_slide_aria: string
  onboarding_finish_aria: string
  onboarding_slides: { title: string; subtitle: string }[]

  gallery_perm_title: string
  gallery_perm_subtitle: string
  gallery_perm_allow: string
  gallery_perm_skip: string

  notif_perm_title: string
  notif_perm_subtitle: string
  notif_perm_allow: string
  notif_perm_skip: string

  /** Combined pre-permission screen (Figma 698:16838) before OS dialogs. */
  perm_intro_headline: string
  perm_intro_gallery_title: string
  perm_intro_gallery_body: string
  perm_intro_notif_title: string
  perm_intro_notif_body: string
  perm_intro_allow: string
  perm_intro_later: string

  nav_home: string
  nav_photos: string
  nav_ai_camera: string
  nav_files: string
  nav_create: string

  profile_light_mode: string
}

const en: Translations = {
  language_headline: 'Your everyday photo app',
  language_subtitle: 'Create AI photos, relive memories, and share easily with 50 GB free storage.',
  language_choose: 'Choose your language',
  language_continue: 'Continue',

  login_heading: 'Log in',
  login_subtitle: 'Welcome to the JioPix.',
  login_cta: 'Get OTP',
  login_placeholder: 'Mobile number',
  login_error: 'Please enter a valid 10-digit number',

  phone_label: 'Enter your phone number',
  phone_placeholder: 'Enter 10-digit number',

  otp_heading: 'Verify your mobile number',
  otp_sent_to: 'Enter the OTP sent to',
  otp_change: 'Change my number',
  otp_hint: 'Enter all 6 digits to continue automatically',
  otp_verifying: 'Verifying…',
  otp_field_label: 'OTP number',
  otp_resend_countdown: 'Request OTP in {count} secs',
  otp_resend_cta: 'Resend OTP',
  otp_digit_aria: 'OTP digit {n}',

  legal_text: 'By continuing, you agree to our ',
  legal_tos: 'Terms & Conditions',
  legal_and: ' and ',
  legal_privacy: 'Privacy Policy.',

  onboarding_skip: 'Skip',
  onboarding_next: 'Next',
  onboarding_next_slide_aria: 'Next slide',
  onboarding_finish_aria: 'Finish and open app',
  onboarding_slides: [
    { title: 'Try new looks for your photos', subtitle: 'Do it in seconds with AI.' },
    {
      title: 'Watch your photos as a slideshow',
      subtitle: 'They come together so you can watch and share anytime.',
    },
    /** Onboarding card art: Figma `683:15397` (jersey + “Your Name” mock). */
    {
      title: 'Your name. Your kit.',
      subtitle: 'AI turns your photos into jersey moments for every celebration—in seconds.',
    },
    {
      title: 'Get more storage\nwith family',
      subtitle: 'Invite your family and get more than 5GB storage.',
    },
  ],

  gallery_perm_title: 'Access your photos',
  gallery_perm_subtitle:
    'Allow JioAI Photos to access your gallery to create a personalized experience.',
  gallery_perm_allow: 'Allow Access',
  gallery_perm_skip: 'Not now',

  notif_perm_title: 'Stay in the loop',
  notif_perm_subtitle:
    'Allow notifications to get updates on your AI-enhanced photos, memories, and more.',
  notif_perm_allow: 'Enable Notifications',
  notif_perm_skip: 'Not now',

  perm_intro_headline: 'Allow access to use all features in the app',
  perm_intro_gallery_title: 'Photos and videos access',
  perm_intro_gallery_body: 'Save all your photos and videos and edit them easily.',
  perm_intro_notif_title: 'Notifications',
  perm_intro_notif_body: 'Get updates on your photos and new features.',
  perm_intro_allow: 'Allow access',
  perm_intro_later: 'Maybe Later',

  nav_home: 'Home',
  nav_photos: 'Photos',
  nav_ai_camera: 'AI Camera',
  nav_files: 'Files',
  nav_create: 'Create',

  profile_light_mode: 'Light mode',
}

const hi: Translations = {
  language_headline: 'आपकी रोज़मर्रा की फोटो ऐप',
  language_subtitle:
    'AI फ़ोटो बनाएं, यादें दोबारा जिएं, और 50 GB मुफ्त स्टोरेज के साथ आसानी से शेयर करें।',
  language_choose: 'अपनी भाषा चुनें',
  language_continue: 'जारी रखें',

  login_heading: 'लॉग इन',
  login_subtitle: 'JioPix में आपका स्वागत है।',
  login_cta: 'OTP पाएं',
  login_placeholder: 'मोबाइल नंबर',
  login_error: 'कृपया 10 अंकों का सही नंबर दर्ज करें',

  phone_label: 'अपना फ़ोन नंबर दर्ज करें',
  phone_placeholder: '10 अंकों का नंबर दर्ज करें',

  otp_heading: 'अपना मोबाइल नंबर सत्यापित करें',
  otp_sent_to: 'OTP भेजा गया',
  otp_change: 'नंबर बदलें',
  otp_hint: 'जारी रखने के लिए सभी 6 अंक दर्ज करें',
  otp_verifying: 'सत्यापित हो रहा है…',
  otp_field_label: 'OTP नंबर',
  otp_resend_countdown: '{count} सेकंड में OTP फिर से माँगें',
  otp_resend_cta: 'OTP फिर से भेजें',
  otp_digit_aria: 'OTP अंक {n}',

  legal_text: 'जारी रखकर, आप हमारे ',
  legal_tos: 'नियम व शर्तों',
  legal_and: ' तथा ',
  legal_privacy: 'गोपनीयता नीति से सहमत होते हैं।',

  onboarding_skip: 'छोड़ें',
  onboarding_next: 'अगला',
  onboarding_next_slide_aria: 'अगली स्लाइड',
  onboarding_finish_aria: 'समाप्त करें और ऐप खोलें',
  onboarding_slides: [
    { title: 'अपनी फ़ोटो पर नए लुक आज़माएं', subtitle: 'AI की मदद से सेकंडों में करें।' },
    {
      title: 'अपनी फ़ोटो को स्लाइडशो में देखें',
      subtitle: 'वे एक साथ आते हैं ताकि आप कभी भी देख और शेयर कर सकें।',
    },
    /** Onboarding card art: Figma `683:15397` (jersey + “Your Name” mock). */
    {
      title: 'आपका नाम, आपकी जर्सी',
      subtitle: 'AI आपकी फ़ोटो से हर जश्न के लिए सेकंडों में जर्सी लुक बनाता है।',
    },
    {
      title: 'परिवार के साथ\nज्यादा स्टोरेज पाएं',
      subtitle: 'अपने परिवार को आमंत्रित करें और 5GB से अधिक स्टोरेज पाएं।',
    },
  ],

  gallery_perm_title: 'अपनी फ़ोटो एक्सेस करें',
  gallery_perm_subtitle:
    'JioAI Photos को व्यक्तिगत अनुभव बनाने के लिए अपनी गैलरी एक्सेस करने दें।',
  gallery_perm_allow: 'एक्सेस दें',
  gallery_perm_skip: 'अभी नहीं',

  notif_perm_title: 'अपडेट पाते रहें',
  notif_perm_subtitle:
    'AI-बेहतर फ़ोटो, यादें और अधिक के अपडेट के लिए नोटिफ़िकेशन की अनुमति दें।',
  notif_perm_allow: 'नोटिफ़िकेशन चालू करें',
  notif_perm_skip: 'अभी नहीं',

  perm_intro_headline: 'ऐप की सभी सुविधाओं के लिए एक्सेस की अनुमति दें',
  perm_intro_gallery_title: 'फ़ोटो और वीडियो एक्सेस',
  perm_intro_gallery_body: 'अपनी सभी फ़ोटो और वीडियो सहेजें और आसानी से एडिट करें।',
  perm_intro_notif_title: 'नोटिफ़िकेशन',
  perm_intro_notif_body: 'अपनी फ़ोटो और नई सुविधाओं पर अपडेट पाएं।',
  perm_intro_allow: 'एक्सेस दें',
  perm_intro_later: 'बाद में',

  nav_home: 'होम',
  nav_photos: 'फ़ोटो',
  nav_ai_camera: 'AI कैमरा',
  nav_files: 'फ़ाइलें',
  nav_create: 'बनाएं',

  profile_light_mode: 'लाइट मोड',
}

export const translations: Record<Locale, Translations> = { en, hi }
