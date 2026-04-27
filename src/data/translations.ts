import { Language } from "@/types";

type TranslationKeys =
  | "appTitle"
  | "appSubtitle"
  | "searchPlaceholder"
  | "allCategories"
  | "exercise"
  | "social"
  | "health"
  | "learning"
  | "arts"
  | "food"
  | "allRegions"
  | "north"
  | "south"
  | "east"
  | "west"
  | "central"
  | "freeOnly"
  | "free"
  | "accessible"
  | "noEvents"
  | "clearFilters"
  | "contact"
  | "organizedBy"
  | "eventsFound"
  | "viewOnWebsite"
  | "verifyDisclaimer"
  | "registered"
  | "spotsLeft"
  | "almostFull"
  | "howToGetThere"
  | "byMrt"
  | "byBus"
  | "walkTime"
  | "nearestStop"
  | "close"
  | "takeLine"
  | "getOff"
  | "thenWalk"
  | "register"
  | "registerFor"
  | "yourName"
  | "yourPhone"
  | "confirmRegister"
  | "registrationSuccess"
  | "registrationFull"
  | "cancel"
  | "pendingApproval"
  | "pendingApprovalMsg"
  | "registrationRef"
  | "detectingLocation"
  | "yourLocation"
  | "routeFrom"
  | "estimatedTravel"
  | "transferAt"
  | "option"
  | "favourite"
  | "unfavourite"
  | "favouritesOnly"
  | "shareWithFamily"
  | "shareCopied"
  | "textSize"
  | "noFavourites";

export const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    appTitle: "KampungConnect",
    appSubtitle: "Connecting seniors to community events near you",
    searchPlaceholder: "Search events...",
    allCategories: "All Categories",
    exercise: "Exercise",
    social: "Social",
    health: "Health",
    learning: "Learning",
    arts: "Arts & Culture",
    food: "Food & Cooking",
    allRegions: "All Regions",
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    central: "Central",
    freeOnly: "Free events only",
    free: "Free",
    accessible: "Wheelchair Accessible",
    noEvents: "No events found. Try changing your filters.",
    clearFilters: "Clear all filters",
    contact: "Contact",
    organizedBy: "Organised by",
    eventsFound: "events found",
    viewOnWebsite: "Find similar events on onePA →",
    verifyDisclaimer: "Check onePA or call the CC to confirm event details",
    registered: "registered",
    spotsLeft: "spots left",
    almostFull: "Almost full!",
    howToGetThere: "How to get there",
    byMrt: "By MRT",
    byBus: "By Bus",
    walkTime: "walk",
    nearestStop: "Nearest stop",
    close: "Close",
    takeLine: "Take",
    getOff: "Get off at",
    thenWalk: "Then walk",
    register: "Register Now",
    registerFor: "Register for",
    yourName: "Your name",
    yourPhone: "Phone number",
    confirmRegister: "Confirm Registration",
    registrationSuccess: "You're registered! See you there 🎉",
    registrationFull: "Sorry, this event is full.",
    cancel: "Cancel",
    pendingApproval: "⏳ Pending Approval",
    pendingApprovalMsg: "Your registration is being reviewed by the organiser. You will receive an SMS confirmation within 1-2 working days.",
    registrationRef: "Reference",
    detectingLocation: "Detecting your location...",
    yourLocation: "Your location",
    routeFrom: "Route from",
    estimatedTravel: "Estimated travel",
    transferAt: "Transfer at",
    option: "Option",
    favourite: "Save",
    unfavourite: "Saved ♥",
    favouritesOnly: "Saved only",
    shareWithFamily: "Share with family",
    shareCopied: "Copied! Paste in WhatsApp 📱",
    textSize: "Text size",
    noFavourites: "No saved events yet. Tap ♡ on any event to save it.",
  },
  zh: {
    appTitle: "甘榜连线 KampungConnect",
    appSubtitle: "为乐龄人士连接附近的社区活动",
    searchPlaceholder: "搜索活动...",
    allCategories: "所有类别",
    exercise: "运动",
    social: "社交",
    health: "健康",
    learning: "学习",
    arts: "艺术与文化",
    food: "美食与烹饪",
    allRegions: "所有地区",
    north: "北部",
    south: "南部",
    east: "东部",
    west: "西部",
    central: "中部",
    freeOnly: "仅免费活动",
    free: "免费",
    accessible: "轮椅无障碍",
    noEvents: "未找到活动。请尝试更改筛选条件。",
    clearFilters: "清除所有筛选",
    contact: "联系方式",
    organizedBy: "主办方",
    eventsFound: "个活动",
    viewOnWebsite: "在onePA查找类似活动 →",
    verifyDisclaimer: "请查看onePA或致电民众俱乐部确认活动详情",
    registered: "人已报名",
    spotsLeft: "个名额剩余",
    almostFull: "即将满额！",
    howToGetThere: "如何前往",
    byMrt: "乘地铁",
    byBus: "乘巴士",
    walkTime: "步行",
    nearestStop: "最近站点",
    close: "关闭",
    takeLine: "搭乘",
    getOff: "在此下车",
    thenWalk: "然后步行",
    register: "立即报名",
    registerFor: "报名参加",
    yourName: "您的姓名",
    yourPhone: "电话号码",
    confirmRegister: "确认报名",
    registrationSuccess: "报名成功！到时见 🎉",
    registrationFull: "抱歉，此活动已满额。",
    cancel: "取消",
    pendingApproval: "⏳ 等待审批",
    pendingApprovalMsg: "您的报名正在由主办方审核中。您将在1-2个工作日内收到短信确认。",
    registrationRef: "参考编号",
    detectingLocation: "正在检测您的位置...",
    yourLocation: "您的位置",
    routeFrom: "从此出发",
    estimatedTravel: "预计行程",
    transferAt: "在此转线",
    option: "方案",
    favourite: "收藏",
    unfavourite: "已收藏 ♥",
    favouritesOnly: "仅显示收藏",
    shareWithFamily: "分享给家人",
    shareCopied: "已复制！粘贴到WhatsApp 📱",
    textSize: "字体大小",
    noFavourites: "还没有收藏的活动。点击 ♡ 收藏活动。",
  },
  ms: {
    appTitle: "KampungConnect",
    appSubtitle: "Menghubungkan warga emas dengan acara komuniti berdekatan",
    searchPlaceholder: "Cari acara...",
    allCategories: "Semua Kategori",
    exercise: "Senaman",
    social: "Sosial",
    health: "Kesihatan",
    learning: "Pembelajaran",
    arts: "Seni & Budaya",
    food: "Makanan & Masakan",
    allRegions: "Semua Kawasan",
    north: "Utara",
    south: "Selatan",
    east: "Timur",
    west: "Barat",
    central: "Tengah",
    freeOnly: "Acara percuma sahaja",
    free: "Percuma",
    accessible: "Mesra Kerusi Roda",
    noEvents: "Tiada acara dijumpai. Cuba tukar penapis anda.",
    clearFilters: "Padam semua penapis",
    contact: "Hubungi",
    organizedBy: "Dianjurkan oleh",
    eventsFound: "acara dijumpai",
    viewOnWebsite: "Cari acara serupa di onePA →",
    verifyDisclaimer: "Semak onePA atau hubungi CC untuk mengesahkan butiran acara",
    registered: "telah mendaftar",
    spotsLeft: "tempat lagi",
    almostFull: "Hampir penuh!",
    howToGetThere: "Cara ke sana",
    byMrt: "Naik MRT",
    byBus: "Naik Bas",
    walkTime: "berjalan kaki",
    nearestStop: "Perhentian terdekat",
    close: "Tutup",
    takeLine: "Naik",
    getOff: "Turun di",
    thenWalk: "Kemudian jalan",
    register: "Daftar Sekarang",
    registerFor: "Daftar untuk",
    yourName: "Nama anda",
    yourPhone: "Nombor telefon",
    confirmRegister: "Sahkan Pendaftaran",
    registrationSuccess: "Anda telah berdaftar! Jumpa di sana 🎉",
    registrationFull: "Maaf, acara ini sudah penuh.",
    cancel: "Batal",
    pendingApproval: "⏳ Menunggu Kelulusan",
    pendingApprovalMsg: "Pendaftaran anda sedang disemak oleh penganjur. Anda akan menerima pengesahan SMS dalam 1-2 hari bekerja.",
    registrationRef: "Rujukan",
    detectingLocation: "Mengesan lokasi anda...",
    yourLocation: "Lokasi anda",
    routeFrom: "Laluan dari",
    estimatedTravel: "Anggaran perjalanan",
    transferAt: "Tukar di",
    option: "Pilihan",
    favourite: "Simpan",
    unfavourite: "Disimpan ♥",
    favouritesOnly: "Simpanan sahaja",
    shareWithFamily: "Kongsi dengan keluarga",
    shareCopied: "Disalin! Tampal di WhatsApp 📱",
    textSize: "Saiz teks",
    noFavourites: "Tiada acara disimpan lagi. Ketik ♡ untuk menyimpan acara.",
  },
  ta: {
    appTitle: "KampungConnect",
    appSubtitle: "மூத்தவர்களை அருகிலுள்ள சமூக நிகழ்வுகளுடன் இணைக்கிறது",
    searchPlaceholder: "நிகழ்வுகளைத் தேடு...",
    allCategories: "அனைத்து வகைகள்",
    exercise: "உடற்பயிற்சி",
    social: "சமூக",
    health: "சுகாதாரம்",
    learning: "கற்றல்",
    arts: "கலை & கலாச்சாரம்",
    food: "உணவு & சமையல்",
    allRegions: "அனைத்து பகுதிகள்",
    north: "வடக்கு",
    south: "தெற்கு",
    east: "கிழக்கு",
    west: "மேற்கு",
    central: "மத்திய",
    freeOnly: "இலவச நிகழ்வுகள் மட்டும்",
    free: "இலவசம்",
    accessible: "சக்கர நாற்காலி அணுகக்கூடியது",
    noEvents: "நிகழ்வுகள் எதுவும் கிடைக்கவில்லை. வடிகட்டிகளை மாற்றி முயற்சிக்கவும்.",
    clearFilters: "அனைத்து வடிகட்டிகளையும் அழி",
    contact: "தொடர்பு",
    organizedBy: "ஏற்பாடு செய்தவர்",
    eventsFound: "நிகழ்வுகள் கண்டறியப்பட்டன",
    viewOnWebsite: "onePA இல் இதே போன்ற நிகழ்வுகளைக் கண்டறியவும் →",
    verifyDisclaimer: "நிகழ்வு விவரங்களை உறுதிப்படுத்த onePA ஐ பார்க்கவும் அல்லது CC ஐ அழைக்கவும்",
    registered: "பதிவு செய்துள்ளனர்",
    spotsLeft: "இடங்கள் உள்ளன",
    almostFull: "கிட்டத்தட்ட நிரம்பிவிட்டது!",
    howToGetThere: "எப்படி செல்வது",
    byMrt: "MRT மூலம்",
    byBus: "பேருந்து மூலம்",
    walkTime: "நடைபயணம்",
    nearestStop: "அருகிலுள்ள நிறுத்தம்",
    close: "மூடு",
    takeLine: "ஏறுங்கள்",
    getOff: "இறங்குங்கள்",
    thenWalk: "பின்னர் நடக்கவும்",
    register: "இப்போது பதிவு செய்யுங்கள்",
    registerFor: "பதிவு செய்யுங்கள்",
    yourName: "உங்கள் பெயர்",
    yourPhone: "தொலைபேசி எண்",
    confirmRegister: "பதிவை உறுதிப்படுத்து",
    registrationSuccess: "நீங்கள் பதிவு செய்துவிட்டீர்கள்! அங்கு சந்திப்போம் 🎉",
    registrationFull: "மன்னிக்கவும், இந்த நிகழ்வு நிரம்பிவிட்டது.",
    cancel: "ரத்து செய்",
    pendingApproval: "⏳ ஒப்புதலுக்காக காத்திருக்கிறது",
    pendingApprovalMsg: "உங்கள் பதிவு ஏற்பாட்டாளரால் மதிப்பாய்வு செய்யப்படுகிறது. 1-2 வேலை நாட்களில் SMS உறுதிப்படுத்தல் பெறுவீர்கள்.",
    registrationRef: "குறிப்பு",
    detectingLocation: "உங்கள் இருப்பிடத்தைக் கண்டறிகிறது...",
    yourLocation: "உங்கள் இருப்பிடம்",
    routeFrom: "இங்கிருந்து பாதை",
    estimatedTravel: "மதிப்பிடப்பட்ட பயணம்",
    transferAt: "இங்கே மாறவும்",
    option: "விருப்பம்",
    favourite: "சேமி",
    unfavourite: "சேமிக்கப்பட்டது ♥",
    favouritesOnly: "சேமித்தவை மட்டும்",
    shareWithFamily: "குடும்பத்துடன் பகிரவும்",
    shareCopied: "நகலெடுக்கப்பட்டது! WhatsApp இல் ஒட்டவும் 📱",
    textSize: "எழுத்து அளவு",
    noFavourites: "இன்னும் சேமிக்கப்பட்ட நிகழ்வுகள் இல்லை. ♡ தட்டி சேமிக்கவும்.",
  },
};
