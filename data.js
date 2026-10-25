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
  { id: 'meat',    name: L('שווארמה ובשר', 'شاورما ولحوم', 'Shawarma & meat') },
  { id: 'chicken', name: L('עוף', 'دجاج', 'Chicken') },
  { id: 'sides',   name: L('פלאפל, סלטים וצ׳יפס', 'فلافل وسلطات وشيبس', 'Falafel, salads & fries') },
  { id: 'drinks',  name: L('שתייה', 'مشروبات', 'Drinks') }, // opens the drinks screen
];

const TAKEAWAY = L('לקחת', 'سفري', 'Take-away');
const DESC_TAKEAWAY = L('לקחת', 'سفري', 'To go');
const DESC_FORMATS = L('בפיתה, באגט, לאפה או מגש', 'بخبز بيتا أو باچيت أو لافة أو طبق', 'In pita, baguette, laffa or on a plate');

/* photo: put a file in images/ and set it here, e.g. 'images/kabab.jpg' */
const ITEMS = [
  /* prices: per serving format, from the menu board. Omit a key to hide that option. */
  { id:'shawarma', cat:'meat', photo:'',
    prices:{ pita:50, baguette:52, laffa:54, plate:100 },
    name:L('שווארמה','شاورما','Shawarma'), desc:DESC_FORMATS },
  { id:'sh-personal', cat:'meat', photo:'', tag:L('לקחת','سفري','Take-away'),
    prices:{ plate:65 },
    name:L('מגש שווארמה אישית','طبق شاورما شخصي','Personal shawarma tray'),
    desc:L('מגש אישי לקחת','طبق شخصي سفري','Personal tray, to go') },
  { id:'schnitzel', cat:'chicken', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:60 },
    name:L('שניצל','شنيتسل','Schnitzel'), desc:DESC_FORMATS },
  { id:'chicken-breast', cat:'chicken', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:60 },
    name:L('חזה עוף','صدر دجاج','Chicken breast'), desc:DESC_FORMATS },
  { id:'peragiot', cat:'chicken', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:60 },
    name:L('פרגיות','فراخ','Peragiot'), desc:DESC_FORMATS },
  { id:'hearts', cat:'chicken', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:58 },
    name:L('לבבות','قلوب','Hearts'), desc:DESC_FORMATS },
  { id:'liver', cat:'chicken', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:60 },
    name:L('כבד','كبدة','Liver'), desc:DESC_FORMATS },
  { id:'kabab', cat:'meat', photo:'',
    prices:{ pita:40, baguette:42, laffa:44, plate:60 },
    name:L('קבב','كباب','Kabab'), desc:DESC_FORMATS },
  { id:'lamb', cat:'meat', photo:'',
    prices:{ pita:45, baguette:48, laffa:50, plate:73 },
    name:L('כבש','لحم غنم','Lamb'), desc:DESC_FORMATS },
  { id:'falafel', cat:'sides', photo:'',
    prices:{ pita:25, baguette:28, laffa:30, plate:33 },
    name:L('פלאפל','فلافل','Falafel'), desc:DESC_FORMATS },

  /* take-away salads & fries, from the menu board ("סלטים לקחת").
     direct:true = added straight to the cart, no bread/salad builder. */
  { id:'salad-quarter', cat:'sides', direct:true, price:12, photo:'', tag:TAKEAWAY,
    name:L('רבע קופסת סלטים','ربع علبة سلطات','Quarter box of salads'), desc:DESC_TAKEAWAY },
  { id:'salad-half', cat:'sides', direct:true, price:22, photo:'', tag:TAKEAWAY,
    name:L('חצי קופסת סלטים','نصف علبة سلطات','Half box of salads'), desc:DESC_TAKEAWAY },
  { id:'salad-tray-s', cat:'sides', direct:true, price:25, photo:'', tag:TAKEAWAY,
    name:L('מגש סלטים קטן','طبق سلطات صغير','Small salad tray'), desc:DESC_TAKEAWAY },
  { id:'salad-tray-l', cat:'sides', direct:true, price:35, photo:'', tag:TAKEAWAY,
    name:L('מגש סלטים גדול','طبق سلطات كبير','Large salad tray'), desc:DESC_TAKEAWAY },
  { id:'salad-tray-split', cat:'sides', direct:true, price:35, photo:'', tag:TAKEAWAY,
    name:L('מגש סלטים מחולק','طبق سلطات مقسّم','Divided salad tray'), desc:DESC_TAKEAWAY },
  { id:'fries-tray-s', cat:'sides', direct:true, price:22, photo:'', tag:TAKEAWAY,
    name:L('מגש צ׳יפס קטן','طبق شيبس صغير','Small fries tray'), desc:DESC_TAKEAWAY },
  { id:'fries-tray-l', cat:'sides', direct:true, price:35, photo:'', tag:TAKEAWAY,
    name:L('מגש צ׳יפס גדול','طبق شيبس كبير','Large fries tray'), desc:DESC_TAKEAWAY },
];

const DRINKS = [
  /* from the menu board ("שתיה") */
  { id:'tapuzina', price:10, photo:'', name:L('תפוזינה 330 מ״ל','تفوزينا 330 مل','Tapuzina 330 ml') },
  { id:'spring-tea', price:12, photo:'', name:L('ספרינג tea 0.5 ל׳','سبرينج تي 0.5 لتر','Spring Tea 0.5 L') },
  { id:'spring-can', price:10, photo:'', name:L('פחית ספרינג 330 מ״ל','علبة سبرينج 330 مل','Spring can 330 ml') },
  { id:'flavored-water', price:10, photo:'', name:L('מים בטעמים 0.5 ל׳','مياه بنكهات 0.5 لتر','Flavored water 0.5 L') },
  { id:'schweppes-fruit', price:10, photo:'', name:L('שופס פירות 330 מ״ל','شويبس فواكه 330 مل','Schweppes fruit 330 ml') },
  { id:'schweppes-sparkling', price:10, photo:'', name:L('שופס מוגז עדן 330 מ״ל','شويبس غازي عدن 330 مل','Schweppes sparkling Eden 330 ml') },
  { id:'schweppes-soda', price:8, photo:'', name:L('שופס סודה 250 מ״ל','شويبس صودا 250 مل','Schweppes soda 250 ml') },
  { id:'eden-water', price:8, photo:'', name:L('מי עדן 0.5 ל׳','مياه عدن 0.5 لتر','Eden water 0.5 L') },
  { id:'soft-can', price:10, photo:'', name:L('פחית שתייה','علبة مشروب','Soft drink can') },
  { id:'soft-large', price:18, photo:'', name:L('בקבוק שתייה גדול','زجاجة مشروب كبيرة','Large drink bottle') },
];

const BREADS = [
  { id:'pita', name:L('פיתה','خبز بيتا','Pita') },
  { id:'baguette', name:L('באגט','باچيت','Baguette') },
  { id:'laffa', name:L('לאפה','لافة','Laffa') },
  { id:'plate', name:L('מגש','طبق','Plate') },
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
  from: L('מ־','من ','From '),
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
