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

  /** Create tab bottom sheet (Figma Pod1 `2385:11793`). */
  create_sheet_title: string
  create_sheet_close_aria: string
  create_sheet_dismiss_aria: string
  create_sheet_greetings_title: string
  create_sheet_greetings_subtitle: string
  create_sheet_avatar_title: string
  create_sheet_avatar_subtitle: string

  /** AI Avatar home (Figma Pod1 `2385:10969`). */
  ai_avatar_home_back_aria: string
  ai_avatar_home_credits_aria: string
  ai_avatar_home_hero_headline: string
  ai_avatar_home_hero_subtitle: string
  ai_avatar_faceoff_kicker: string
  ai_avatar_faceoff_title: string
  ai_avatar_jerseys_kicker: string
  ai_avatar_jerseys_title: string
  /** Cricket Jerseys detail (`2385:10384`). */
  ai_avatar_jerseys_portal_hint_jersey: string
  ai_avatar_jerseys_portal_hint_cricket: string
  ai_avatar_jerseys_upload_cta: string
  ai_avatar_jerseys_whatsapp: string
  ai_avatar_bridal_kicker: string
  ai_avatar_bridal_title: string
  ai_avatar_corporate_kicker: string
  ai_avatar_corporate_title: string
  ai_avatar_royal_kicker: string
  ai_avatar_royal_title: string

  profile_light_mode: string
  profile_homepage_options: string
  profile_home_option1: string
  profile_home_option1_hint: string

  /** Family Hub rail — add-member CTA (Figma `1305:22278`). */
  family_hub_add_member: string
  /** Accessibility title for add-member control (longer than visible `family_hub_add_member` label). */
  family_hub_add_member_aria: string
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
    /** Onboarding card art: Figma `1590:20584` (jersey + “Your Name” mock). */
    {
      title: 'Make photos for any moment',
      subtitle: 'For birthdays, festivals, and more in seconds.',
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

  create_sheet_title: 'Choose what to create',
  create_sheet_close_aria: 'Close',
  create_sheet_dismiss_aria: 'Dismiss',
  create_sheet_greetings_title: 'Greetings',
  create_sheet_greetings_subtitle: 'Birthday, wishes & many more',
  create_sheet_avatar_title: 'AI Avatar',
  create_sheet_avatar_subtitle: 'Dressed into cricket avatar & more',

  ai_avatar_home_back_aria: 'Go back',
  ai_avatar_home_credits_aria: 'Credits balance',
  ai_avatar_home_hero_headline: 'Reimagine Yourself',
  ai_avatar_home_hero_subtitle: 'Try different styles, roles, and personalities with AI',
  ai_avatar_faceoff_kicker: 'Cricket Faceoff',
  ai_avatar_faceoff_title: 'Wear your team’s jersey with your friend',
  ai_avatar_jerseys_kicker: 'Cricket Jerseys',
  ai_avatar_jerseys_title: 'Wear your favourite team’s jersey',
  ai_avatar_jerseys_portal_hint_jersey:
    'Upload your photo to reveal your  cricket jersey AI avatars',
  ai_avatar_jerseys_portal_hint_cricket:
    'Upload your photo to reveal your  cricket AI avatars',
  ai_avatar_jerseys_upload_cta: 'Upload your photo',
  ai_avatar_jerseys_whatsapp: 'Whatsapp',
  ai_avatar_bridal_kicker: 'Bridal makeup',
  ai_avatar_bridal_title: 'Transform your look into brides/grooms',
  ai_avatar_corporate_kicker: 'Corporate look',
  ai_avatar_corporate_title: 'Get the Corporate look avatar',
  ai_avatar_royal_kicker: 'Royal look',
  ai_avatar_royal_title: 'Get the royal look avatar',

  profile_light_mode: 'Light mode',
  profile_homepage_options: 'Homepage options',
  profile_home_option1: 'Option 1',
  profile_home_option1_hint: 'New AI Avatars rail (Figma 1305:22351). Off restores the classic IPL hero.',

  family_hub_add_member: 'Add',
  family_hub_add_member_aria: 'Add family member',
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
    /** Onboarding card art: Figma `1590:20584` (jersey + “Your Name” mock). */
    {
      title: 'हर पल के लिए फ़ोटो बनाएं',
      subtitle: 'जन्मदिन, त्योहार और बहुत कुछ—सेकंडों में।',
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

  create_sheet_title: 'क्या बनाना है, चुनें',
  create_sheet_close_aria: 'बंद करें',
  create_sheet_dismiss_aria: 'रद्द करें',
  create_sheet_greetings_title: 'ग्रीटिंग्स',
  create_sheet_greetings_subtitle: 'जन्मदिन, शुभकामनाएँ और बहुत कुछ',
  create_sheet_avatar_title: 'AI अवतार',
  create_sheet_avatar_subtitle: 'क्रिकेट अवतार और बहुत कुछ',

  ai_avatar_home_back_aria: 'वापस जाएँ',
  ai_avatar_home_credits_aria: 'क्रेडिट बैलेंस',
  ai_avatar_home_hero_headline: 'खुद को नए रूप में देखें',
  ai_avatar_home_hero_subtitle: 'AI के साथ अलग-अलग स्टाइल, भूमिकाएँ और व्यक्तित्व आज़माएँ',
  ai_avatar_faceoff_kicker: 'क्रिकेट फेसऑफ़',
  ai_avatar_faceoff_title: 'दोस्त के साथ अपनी टीम की जर्सी पहनें',
  ai_avatar_jerseys_kicker: 'क्रिकेट जर्सी',
  ai_avatar_jerseys_title: 'अपनी पसंदीदा टीम की जर्सी पहनें',
  ai_avatar_jerseys_portal_hint_jersey:
    'अपनी क्रिकेट जर्सी AI अवतार देखने के लिए अपनी फ़ोटो अपलोड करें',
  ai_avatar_jerseys_portal_hint_cricket: 'अपने क्रिकेट AI अवतार देखने के लिए अपनी फ़ोटो अपलोड करें',
  ai_avatar_jerseys_upload_cta: 'अपनी फ़ोटो अपलोड करें',
  ai_avatar_jerseys_whatsapp: 'WhatsApp',
  ai_avatar_bridal_kicker: 'ब्राइडल मेकअप',
  ai_avatar_bridal_title: 'दुल्हन/दूल्हे जैसा लुक पाएँ',
  ai_avatar_corporate_kicker: 'कॉर्पोरेट लुक',
  ai_avatar_corporate_title: 'कॉर्पोरेट लुक अवतार पाएँ',
  ai_avatar_royal_kicker: 'रॉयल लुक',
  ai_avatar_royal_title: 'रॉयल लुक अवतार पाएँ',

  profile_light_mode: 'लाइट मोड',
  profile_homepage_options: 'होमपेज विकल्प',
  profile_home_option1: 'विकल्प 1',
  profile_home_option1_hint:
    'नया AI अवतार रेल (Figma 1305:22351)। बंद करने पर क्लासिक IPL हीरो वापस मिलेगा।',

  family_hub_add_member: 'जोड़ें',
  family_hub_add_member_aria: 'परिवार का सदस्य जोड़ें',
}

export const translations: Record<Locale, Translations> = { en, hi }
