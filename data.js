/* =========================================================
   Content + copy. Edit prices, dishes and text here only.
   L(hebrew, arabic, english)
   ========================================================= */
const L = (he, ar, en) => ({ he, ar, en });

const CONFIG = {
  phone: '+97246426033',
  deliveryFee: 15,
  currency: '₪',
  wazeRestaurant: 'https://waze.com/ul?q=%D7%9E%D7%A4%D7%92%D7%A9%20%D7%94%D7%9B%D7%A4%D7%A8',
  firstOrderNo: 4192,
};

const CATS = [
  { id: 'shawarma', name: L('שווארמה', 'شاورما', 'Shawarma') },
  { id: 'grill',    name: L('על האש', 'مشاوي', 'From the grill') },
  { id: 'falafel',  name: L('פלאפל וצמחוני', 'فلافل ونباتي', 'Falafel & veg') },
  { id: 'salad-boxes', name: L('סלטים', 'سلطات', 'Salad boxes') },
  { id: 'drinks',   name: L('שתייה', 'مشروبات', 'Drinks') }, // opens the drinks screen
];

/* photo: put a file in images/ and set it here, e.g. 'images/kabab.jpg' */
const ITEMS = [
  { id:'sh-lamb', cat:'shawarma', price:68, photo:'',
    name:L('שווארמה כבש','شاورما لحم غنم','Lamb shawarma'),
    desc:L('כבש טרי, נחתך לפי הזמנה','لحم غنم طازج يُقطع عند الطلب','Fresh lamb, carved to order') },
  { id:'kabab', cat:'grill', price:56, photo:'', tag:L('על הגחלים','على الفحم','Charcoal'),
    name:L('קבב','كباب','Kabab'),
    desc:L('בשר טחון עם פטרוזיליה, על גחלים','لحم مفروم مع بقدونس على الفحم','Minced meat with parsley, over coals') },
  { id:'shishlik', cat:'grill', price:64, photo:'',
    name:L('שישליק','شيش لحمة','Shishlik'),
    desc:L('נתחי כבש על שיפוד','قطع غنم على السيخ','Lamb chunks on a skewer') },
  { id:'falafel', cat:'falafel', price:34, photo:'',
    name:L('פלאפל','فلافل','Falafel'),
    desc:L('מטוגן במקום, שמונה כדורים','يُقلى في المكان، ثمان حبات','Fried to order, eight balls') },
  { id:'salad-box-s', cat:'salad-boxes', price:24, photo:'', tag:L('קטן','صغير','Small'), builder:false,
    name:L('קופסת סלט קטנה','علبة سلطة صغيرة','Small salad box'),
    desc:L('מבחר סלטים ביתיים','اختيار سلطات منزلية','House salads selection') },
  { id:'salad-box-l', cat:'salad-boxes', price:32, photo:'', tag:L('גדול','كبير','Large'), builder:false,
    name:L('קופסת סלט גדולה','علبة سلطة كبيرة','Large salad box'),
    desc:L('מנה מלאה עם מגוון סלטים','حصة كاملة مع مجموعة سلطات','Full box with a variety of salads') },
  { id:'salad-box-dahi', cat:'salad-boxes', price:30, photo:'', tag:L('קטן + דהין','صغير + دحين','Small + dahi'), builder:false,
    name:L('קופסת סלט קטנה עם דהין','علبة سلطة صغيرة مع دحين','Small salad box with dahi'),
    desc:L('קטן, עם דהין במרכז','صغير، مع دحين في الوسط','Small, with dahi in the middle') },
];

/* offered right after "add to order" */
const SIDES = [
  { id:'chips-s', price:12, photo:'', name:L('צ׳יפס קטן','بطاطا صغيرة','Small fries'),
    desc:L('מנה אישית','حصة فردية','Personal portion') },
  { id:'chips-l', price:18, photo:'', name:L('צ׳יפס גדול','بطاطا كبيرة','Large fries'),
    desc:L('לשניים, עם מלח גס','لشخصين مع ملح خشن','For two, coarse salt') },
  { id:'onion', price:16, photo:'', name:L('טבעות בצל','حلقات بصل','Onion rings'),
    desc:L('שמונה טבעות פריכות','ثمان حلقات مقرمشة','Eight crisp rings') },
  { id:'pita-tahina', price:8, photo:'', name:L('פיתה וטחינה','خبز وطحينة','Pita & tahina'),
    desc:L('פיתה חמה בצד','خبز ساخن على جنب','Hot pita on the side') },
];

const DRINKS = [
  { id:'cola', price:9, photo:'', name:L('קולה','كولا','Cola') },
  { id:'lemonana', price:14, photo:'', name:L('לימונענע','ليمون نعناع','Lemon-mint') },
  { id:'ayran', price:10, photo:'', name:L('איראן','عيران','Ayran') },
  { id:'water', price:7, photo:'', name:L('מים','ماء','Water') },
  { id:'tea', price:8, photo:'', name:L('תה נענע','شاي نعناع','Mint tea') },
  { id:'juice', price:15, photo:'', name:L('מיץ טבעי','عصير طبيعي','Fresh juice') },
];

const BREADS = [
  { id:'laffa', extra:0, name:L('לאפה','لافة','Laffa') },
  { id:'pita', extra:0, name:L('פיתה','خبز بيتا','Pita') },
  { id:'baguette', extra:3, name:L('באגט','باچيت','Baguette') },
  { id:'plate', extra:6, name:L('מגש','مقاش','In a container') },
];

const SALADS = [
  { id:'hummus', photo:'', name:L('חומוס','حمص','Hummus') },
  { id:'tahina', photo:'', name:L('טחינה','طحينة','Tahina') },
  { id:'turkish', photo:'', name:L('סלט טורקי','سلطة تركية','Turkish salad') },
  { id:'corn', photo:'', name:L('סלט תירס','سلطة ذرة','Corn salad') },
  { id:'white-cabbage', photo:'', name:L('כרוב לבן','ملفوف ابيض','White cabbage') },
  { id:'red-cabbage', photo:'', name:L('כרוב אדום','ملفوف احمر','Red cabbage') },
  { id:'onion', photo:'', name:L('בצל','بصل','Onion') },
  { id:'amba', photo:'', name:L('עמבה','عمبة','Amba') },
];

const EXTRAS = [
  { id:'schug', price:0, name:L('סחוג חריף','شطة حارة','Spicy schug') },
  { id:'meat', price:12, name:L('תוספת בשר','لحمة إضافية','Extra meat') },
];

const WHY = [
  { title:L('שיפוד אמיתי','سيخ حقيقي','A real spit'),
    body:L('שווארמה נצלית על גחלים, נחתכת רק כשמזמינים','شاورما على الفحم، تُقطع عند الطلب','Charcoal-roasted, carved only when you order') },
  { title:L('סלטים של הבית','سلطات البيت','House salads'),
    body:L('נחתכים כל בוקר, בלי קופסאות','تُقطع كل صباح، بدون علب','Chopped every morning, nothing from a tub') },
  { title:L('משלוח מהיר','توصيل سريع','Fast delivery'),
    body:L('35–45 דקות לניין והסביבה','35–45 دقيقة لنين والمنطقة','35–45 minutes around Nein') },
];

const REVIEWS = [
  { who:L('אחמד ע׳','أحمد ع.','Ahmad A.'),
    text:L('הלאפה הכי טובה באזור, והסלטים טריים באמת. מגיע חם.','أطيب لافة بالمنطقة والسلطات طازة فعلاً.','Best laffa around, and the salads are genuinely fresh.') },
  { who:L('נועה ל׳','نوعا ل.','Noa L.'),
    text:L('הזמנו לכל המשרד, הכול הגיע מסודר ומדויק.','طلبنا للمكتب كله وكل شي وصل مضبوط.','Ordered for the whole office, everything arrived exactly right.') },
  { who:L('סאמר ח׳','سامر ح.','Samer H.'),
    text:L('הקבב על הגחלים — טעם של בית. מחירים הוגנים.','الكباب على الفحم — طعم بيت. أسعار منيحة.','Charcoal kabab, tastes like home. Fair prices.') },
];

const T = {
  brand: L('מפגש הכפר','ملتقى القرية','Mifgash HaKfar'),
  brandSub: L('מסעדה מזרחית · ניין','مطعم شرقي · نين','Middle-eastern grill · Nein'),
  openNow: L('פתוח עד 23:00','مفتوح حتى 23:00','Open until 23:00'),
  heroTitle: L('שווארמה\nמהשיפוד','شاورما\nمن السيخ','Shawarma\noff the spit'),
  heroSub: L('משלוחים לניין, דאהי והסביבה. מזמינים כאן, מקבלים חם.','توصيل لنين والدحي والمنطقة. اطلب من هون ويوصلك ساخن.','Delivery to Nein, Dahi and around. Order here, get it hot.'),
  eta: L('משלוח 35–45 דק׳','توصيل 35–45 دقيقة','Delivery 35–45 min'),
  feeChip: L('דמי משלוח ₪15','رسوم التوصيل ₪15','Delivery fee ₪15'),
  rating: L('4.7 · 312 ביקורות','4.7 · 312 تقييم','4.7 · 312 reviews'),
  orderNow: L('להזמנה','اطلب الآن','Order now'),
  menuHint: L('לוחצים על מנה כדי לבחור לחם, סלטים וכמות','اضغط على الطبق لاختيار الخبز والسلطات والكمية','Tap a dish to pick bread, salads and quantity'),
  whyTitle: L('למה אצלנו','ليش عنا','Why us'),
  reviewsTitle: L('מה אומרים','شو بقولوا','What people say'),
  address: L('הכביש הראשי, ניין','الشارع الرئيسي، نين','Main road, Nein'),
  hours: L('א׳–ש׳ 11:00–23:00 · 04-000-0000','الأحد–السبت 11:00–23:00 · 04-000-0000','Sun–Sat 11:00–23:00 · 04-000-0000'),
  call: L('חייגו','اتصل','Call'),
  breadQ: L('באיזה לחם?','بأي خبز؟','Which bread?'),
  required: L('חובה','إلزامي','Required'),
  noCharge: L('ללא תוספת','بدون زيادة','No charge'),
  free: L('חינם','مجاناً','Free'),
  saladsQ: L('סלטים','سلطات','Salads'),
  saladsFree: L('עד 5 ללא תשלום','حتى 5 مجاناً','Up to 5, no charge'),
  extrasQ: L('תוספות','إضافات','Extras'),
  noteQ: L('הערה למטבח','ملاحظة للمطبخ','Note for the kitchen'),
  notePlaceholder: L('בלי בצל, חריף בצד…','بدون بصل، الحار على جنب…','No onion, spicy on the side…'),
  addToCart: L('הוספה להזמנה','أضف للطلب','Add to order'),
  stepSides: L('שלב 2 מתוך 3','خطوة 2 من 3','Step 2 of 3'),
  stepDrinks: L('שלב 3 מתוך 3','خطوة 3 من 3','Step 3 of 3'),
  sidesTitle: L('רוצים תוספת?','بدك إضافة؟','Anything on the side?'),
  sidesSub: L('מטוגן טרי, מגיע חם עם המנה','يُقلى طازج ويوصل ساخن مع الطلب','Fried fresh, arrives hot with your dish'),
  noThanks: L('לא תודה','لا شكراً','No thanks'),
  addSides: L('הוספה','أضف','Add'),
  back: L('חזרה','رجوع','Back'),
  keepOrdering: L('חזרה לתפריט','رجوع للقائمة','Back to menu'),
  cartTitle: L('ההזמנה שלי','طلبي','My order'),
  emptyCart: L('ההזמנה ריקה','الطلب فاضي','Your order is empty'),
  addDrinks: L('להוסיף שתייה','أضف مشروب','Add drinks'),
  addMore: L('להוסיף מנה','أضف طبق','Add a dish'),
  drinksTitle: L('שתייה','مشروبات','Drinks'),
  drinksSub: L('קר מהמקרר, מגיע עם ההזמנה','بارد من الثلاجة، يوصل مع الطلب','Cold from the fridge, arrives with your order'),
  doneDrinks: L('סיימתי','خلصت','Done'),
  side: L('תוספת','إضافة','Side'),
  drink: L('שתייה','مشروب','Drink'),
  subtotal: L('סה״כ מנות','مجموع الأطباق','Subtotal'),
  delivery: L('משלוח','توصيل','Delivery'),
  total: L('לתשלום','للدفع','Total'),
  toCheckout: L('לתשלום ומשלוח','للدفع والتوصيل','Delivery & payment'),
  viewCart: L('להזמנה שלי','طلبي','View order'),
  checkoutTitle: L('משלוח ותשלום','توصيل ودفع','Delivery & payment'),
  addressQ: L('לאן שולחים?','وين نوصّل؟','Where to?'),
  addressPlaceholder: L('רח׳ הזית 12, ניין','شارع الزيتون 12، نين','12 HaZayit St, Nein'),
  customerNameQ: L('שם','الاسم','Name'),
  customerNamePlaceholder: L('גלעד כהן','غالب محمد','Gad Cohen'),
  customerPhoneQ: L('מספר טלפון','رقم الهاتف','Phone number'),
  customerPhonePlaceholder: L('050-1234567','050-1234567','050-1234567'),
  cardHolderQ: L('שם בעל הכרטיס','اسم حامل البطاقة','Cardholder name'),
  cardHolderPlaceholder: L('שם על הכרטיס','اسم على البطاقة','Name on card'),
  cardNumberQ: L('מספר כרטיס','رقم البطاقة','Card number'),
  cardNumberPlaceholder: L('1234 5678 9012 3456','1234 5678 9012 3456','1234 5678 9012 3456'),
  expiryQ: L('תוקף','تاريخ الانتهاء','Expiry'),
  expiryPlaceholder: L('MM/YY','MM/YY','MM/YY'),
  cvvQ: L('CVV','CVV','CVV'),
  cvvPlaceholder: L('123','123','123'),
  wazeIdle: L('לשלוח מיקום מדויק ב-Waze','أرسل الموقع الدقيق عبر Waze','Send exact location via Waze'),
  wazeIdleSub: L('השליח יקבל ניווט ישיר לדלת','السائق يوصل مباشرة للباب','The driver gets navigation to your door'),
  wazeSent: L('המיקום נשלח למסעדה','تم إرسال الموقع للمطعم','Location sent to the restaurant'),
  wazeDenied: L('אין גישה למיקום — הקלידו כתובת','ما في إذن للموقع — اكتب العنوان','No location access — type the address'),
  payQ: L('אמצעי תשלום','طريقة الدفع','Payment'),
  payCard: L('כרטיס אשראי','بطاقة ائتمان','Credit card'),
  payCardSub: L('תשלום מאובטח באפליקציה','دفع آمن في التطبيق','Secure payment in the app'),
  payCash: L('מזומן לשליח','كاش للسائق','Cash on delivery'),
  payCashSub: L('משלמים כשמגיע','تدفع لما يوصل','Pay when it arrives'),
  place: L('שליחת ההזמנה','أرسل الطلب','Place order'),
  placeNeedsPay: L('בחרו אמצעי תשלום','اختر طريقة الدفع','Choose a payment method'),
  doneTitle: L('ההזמנה התקבלה','تم استلام الطلب','Order received'),
  doneBody: L('המטבח התחיל להכין. נעדכן בוואטסאפ כשהשליח יוצא — בערך 40 דקות.','المطبخ بلّش يحضّر. منحدّثك بالواتساب لما يطلع السائق — حوالي 40 دقيقة.','The kitchen started. We will WhatsApp you when the driver leaves — about 40 minutes.'),
  orderNo: L('מספר הזמנה','رقم الطلب','Order number'),
  wazeSentNote: L('המיקום שלך נשלח לשליח','موقعك انبعت للسائق','Your pin was sent to the driver'),
  newOrder: L('הזמנה חדשה','طلب جديد','New order'),
};
